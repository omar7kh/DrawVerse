import { useCallback, useEffect, useRef, useState } from 'react';
import {
  useBroadcastEvent,
  useEventListener,
  useMutation,
  useMyPresence,
  useOthers,
  useStorage,
} from '../../../liveblocks.config';
import Cursor from './cursor/Cursor';
import randomColors from './cursor/CursorRandomColors';
import CursorChat from './cursor/CursorChat';
import ReactionSelector from './reaction/ReactionsButtons';
import FlyingReaction from './reaction/FlyingReaction';
import useInterval from '../../hooks/useInterval';
import {
  handleCanvasMouseDown,
  handleCanvasMouseMove,
  handleCanvasMouseUp,
  handleCanvasObjectModified,
  handleCanvasObjectMoving,
  handleCanvasObjectScaling,
  handleCanvasSelectionCreated,
  handleCanvasZoom,
  handlePathCreated,
  handleResize,
  initializeFabric,
  renderCanvas,
} from '../../lib/canvas';
import ToolBar from './ToolBar';
import LeftSideBar from './LeftSideBar';
import RightSideBar from './RightSideBar';

const Room = ({
  selectedShapeRef,
  setActiveElement,
  activeElement,
  imageInputRef,
}) => {
  const [{ cursor }, updateMyPresence] = useMyPresence();
  const [cursorState, setCursorState] = useState({ type: '' });
  const [reactions, setReactions] = useState([]);
  const [elementAttributes, setElementAttributes] = useState({
    width: '',
    height: '',
    fontSize: '',
    fontFamily: '',
    fontWeight: '',
    fill: '#2d2e2d',
    stroke: '#2d2e2d',
  });

  const canvasObjects = useStorage((root) => root.canvasObjects);

  const roomRef = useRef();
  const others = useOthers();
  const isDrawing = useRef(false);
  const shapeRef = useRef(null);
  const broadcast = useBroadcastEvent();
  const activeObjectRef = useRef(null);
  const isEditingRef = useRef(false);
  const fabricRef = useRef(null);
  const canvasRef = useRef(null);

  const handlePointerMove = useCallback((e) => {
    e.preventDefault();

    if (cursor == null || cursorState.type !== 'reactionSelector') {
      const cursor = {
        x: Math.floor(e.clientX) - 2,
        y: Math.floor(e.clientY) - 67,
      };
      updateMyPresence({ cursor });
    }
  }, []);

  const syncShapeInStorage = useMutation(({ storage }, object) => {
    if (!object) return;
    const { objectId } = object;
    const shapeData = object.toJSON();
    shapeData.objectId = objectId;
    const canvasObjects = storage.get('canvasObjects');
    canvasObjects.set(objectId, shapeData);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setCursorState({
      type: 'hidden',
    });
    updateMyPresence({ cursor: null });
  }, []);

  const handlePointerDown = useCallback(
    (e) => {
      const cursor = {
        x: Math.floor(e.clientX) - 2,
        y: Math.floor(e.clientY) - 67,
      };
      updateMyPresence({ cursor });

      setCursorState((state) =>
        cursorState.type === 'reaction' ? { ...state, isPressed: true } : state
      );
    },
    [cursorState.type, setCursorState]
  );

  useEventListener(({ event }) => {
    console.log('Received event:', event);
    if (event.message) {
      alert(event.message);
    }
  });

  const handlePointerUp = useCallback(() => {
    setCursorState((state) =>
      cursorState.type === 'reaction' ? { ...state, isPressed: true } : state
    );
  }, [cursorState.type, setCursorState]);

  const setReaction = useCallback((reaction) => {
    setCursorState({ type: 'reaction', reaction, isPressed: false });
  }, []);

  useInterval(() => {
    setReactions((reactions) =>
      reactions.filter((reaction) => reaction.timestamp > Date.now() - 4000)
    );
  }, 1000);

  useInterval(() => {
    if (cursorState.type === 'reaction' && cursorState.isPressed && cursor) {
      setReactions((reactions) =>
        reactions.concat([
          {
            point: { x: cursor.x, y: cursor.y },
            value: cursorState.reaction,
            timestamp: Date.now(),
          },
        ])
      );

      broadcast({
        x: cursor.x,
        y: cursor.y,
        value: cursorState.reaction,
      });
    }
  }, 100);

  useEventListener((eventData) => {
    const event = eventData.event;
    setReactions((reactions) =>
      reactions.concat([
        {
          point: { x: event.x, y: event.y },
          value: event.value,
          timestamp: Date.now(),
        },
      ])
    );
  });

  useEffect(() => {
    const onKeyUp = (e) => {
      if (e.key === '/') {
        setCursorState({
          type: 'chat',
          previousMessage: null,
          message: '',
        });
      } else if (e.key === 'Escape') {
        updateMyPresence({ message: '' });
        setCursorState({ type: 'hidden' });
      } else if (e.key === 'e') {
        setCursorState({ type: 'reactionSelector' });
      }
    };

    const onKeyDown = (e) => {
      if (e.key === '/') {
        e.preventDefault();
      }
    };

    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [updateMyPresence]);

  useEffect(() => {
    const canvas = initializeFabric({ canvasRef, fabricRef });

    canvas.on('mouse:down', (options) => {
      handleCanvasMouseDown({
        options,
        canvas,
        isDrawing,
        selectedShapeRef,
        shapeRef,
      });
    });

    canvas.on('mouse:move', (options) => {
      handleCanvasMouseMove({
        options,
        canvas,
        isDrawing,
        selectedShapeRef,
        shapeRef,
        syncShapeInStorage,
      });
    });

    canvas.on('mouse:up', () => {
      handleCanvasMouseUp({
        canvas,
        isDrawing,
        selectedShapeRef,
        shapeRef,
        syncShapeInStorage,
        setActiveElement,
        activeObjectRef,
      });
    });

    canvas.on('object:modified', (options) => {
      handleCanvasObjectModified({
        options,
        syncShapeInStorage,
      });
    });

    canvas?.on('object:moving', (options) => {
      handleCanvasObjectMoving({
        options,
      });
    });

    canvas.on('selection:created', (options) => {
      handleCanvasSelectionCreated({
        options,
        isEditingRef,
        setElementAttributes,
      });
    });

    canvas.on('object:scaling', (options) => {
      handleCanvasObjectScaling({
        options,
        setElementAttributes,
      });
    });

    canvas.on('path:created', (options) => {
      handlePathCreated({
        options,
        syncShapeInStorage,
      });
    });

    canvas.on('mouse:wheel', (options) => {
      handleCanvasZoom({
        options,
        canvas,
      });
    });

    window.addEventListener('resize', () => {
      handleResize({
        canvas: fabricRef.current,
      });
    });

    return () => {
      canvas.dispose();
    };
  }, [canvasRef]);

  useEffect(() => {
    renderCanvas({ fabricRef, canvasObjects, activeObjectRef });
  }, [canvasObjects]);

  return (
    <div className='w-full h-full flex overflow-hidden'>
      <LeftSideBar allShapes={Array.from(canvasObjects)} />
      <div
        id='canvas'
        ref={roomRef}
        className='w-full h-full bg-slate-100 text-black'
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <canvas ref={canvasRef} />

        <ToolBar
          fabricRef={fabricRef}
          setActiveElement={setActiveElement}
          activeElement={activeElement}
          imageInputRef={imageInputRef}
          selectedShapeRef={selectedShapeRef}
        />

        {reactions.map((reaction) => (
          <FlyingReaction
            key={reaction.timestamp.toString()}
            x={reaction.point.x}
            y={reaction.point.y}
            timestamp={reaction.timestamp}
            value={reaction.value}
          />
        ))}

        {cursor && (
          <CursorChat
            cursor={cursor}
            cursorState={cursorState}
            setCursorState={setCursorState}
            updateMyPresence={updateMyPresence}
          />
        )}

        {cursorState.type === 'reactionSelector' && (
          <ReactionSelector
            setReaction={(reaction) => {
              setReaction(reaction);
            }}
          />
        )}

        {others
          .filter((other) => other.presence.cursor !== null)
          .map(({ connectionId, presence }) => (
            <Cursor
              key={connectionId}
              x={presence.cursor.x}
              y={presence.cursor.y}
              message={presence.message}
              cursorColor={
                randomColors[Number(connectionId) % randomColors.length]
              }
            />
          ))}
      </div>
      <RightSideBar
        elementAttributes={elementAttributes}
        setElementAttributes={setElementAttributes}
        fabricRef={fabricRef}
        isEditingRef={isEditingRef}
        activeObjectRef={activeObjectRef}
        syncShapeInStorage={syncShapeInStorage}
      />
    </div>
  );
};

export default Room;
