import {
  useBroadcastEvent,
  useEventListener,
  useMyPresence,
  useOthers,
} from '../../../liveblocks.config';
import Cursor from './Cursor';

const Room = () => {
  const [myPresence, updateMyPresence] = useMyPresence();

  const others = useOthers();
  const broadcast = useBroadcastEvent();

  const userCount = others.length;

  const handlePointerMove = (e) => {
    const cursor = { x: Math.floor(e.clientX), y: Math.floor(e.clientY) };
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
      className='w-[calc(100vw-560px)] h-screen bg-slate-100 text-black'
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div>There are {userCount} other user(s) online</div> Cursor:{' '}
      {JSON.stringify(myPresence.cursor)}
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
