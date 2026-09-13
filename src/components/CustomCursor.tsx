import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [cursor, setCursor] = useState({ x: -100, y: -100, visible: false });

  useEffect(() => {
    // Only track if mouse is used
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') {
        setCursor({ x: e.clientX, y: e.clientY, visible: true });
      }
    };
    const onPointerLeave = () => {
      setCursor((prev) => ({ ...prev, visible: false }));
    };

    window.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerleave', onPointerLeave);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  if (!cursor.visible) return null;

  return (
    <div
      className="custom-cursor"
      style={{
        transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)`,
      }}
      aria-hidden="true"
    >
      <span>·</span>
    </div>
  );
}
