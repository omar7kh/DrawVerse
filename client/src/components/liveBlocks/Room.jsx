import { useRef } from 'react';
import {
  useBroadcastEvent,
  useEventListener,
  useMyPresence,
  useOthers,
} from '../../../liveblocks.config';
import Cursor from './Cursor';

const Room = () => {
  const [myPresence, updateMyPresence] = useMyPresence();
  const roomRef = useRef();

  const others = useOthers();
  const broadcast = useBroadcastEvent();

  const userCount = others.length;

  const handlePointerMove = (e) => {
    const cursor = {
      x: Math.floor(e.clientX) - 2,
      y: Math.floor(e.clientY) - 2,
    };
    updateMyPresence({ cursor });
  };

  const handlePointerLeave = (e) => {
    updateMyPresence({ cursor: null });
  };

  useEventListener(({ event }) => {
    console.log('Received event:', event);
    if (event.message) {
      alert(event.message);
    }
  });

  return (
    <div
      ref={roomRef}
      className='w-full h-screen bg-slate-100 text-black'
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {others
        .filter((other) => other.presence.cursor !== null)
        .map(({ connectionId, presence }) => (
          <Cursor
            key={connectionId}
            x={presence.cursor.x}
            y={presence.cursor.y}
          />
        ))}
    </div>
  );
};

export default Room;
