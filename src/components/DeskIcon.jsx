import { useRef, useCallback, useState } from 'react';

export default function DeskIcon({ id, label, imgSrc, glyphText, style, onClick, canvasRef, imgSize = 80 }) {
  const ref        = useRef(null);
  const dragging   = useRef(false);
  const moved      = useRef(false);
  const offset     = useRef({ x: 0, y: 0 });
  const startPoint = useRef({ x: 0, y: 0 });
  const [pos, setPos] = useState({ left: style?.left || 0, top: style?.top || 0 });

  const DRAG_THRESHOLD_PX = 6;

  const handleMouseDown = useCallback((e) => {
    dragging.current = true;
    moved.current    = false;
    startPoint.current = { x: e.clientX, y: e.clientY };
    const r  = ref.current.getBoundingClientRect();
    const cr = canvasRef.current.getBoundingClientRect();
    offset.current = { x: e.clientX - (r.left - cr.left), y: e.clientY - (r.top - cr.top) };
    e.preventDefault();

    const onMove = (ev) => {
      const dx = ev.clientX - startPoint.current.x;
      const dy = ev.clientY - startPoint.current.y;
      if (!moved.current && Math.hypot(dx, dy) < DRAG_THRESHOLD_PX) return;
      moved.current = true;

      const cr2 = canvasRef.current.getBoundingClientRect();
      let nx = ev.clientX - cr2.left - offset.current.x;
      let ny = ev.clientY - cr2.top  - offset.current.y;
      nx = Math.max(0, Math.min(nx, cr2.width  - ref.current.offsetWidth));
      ny = Math.max(0, Math.min(ny, cr2.height - ref.current.offsetHeight));
      setPos({ left: nx, top: ny });
    };

    const onUp = () => {
      dragging.current = false;
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup',   onUp);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup',   onUp);
  }, [canvasRef]);

  const handleClick = useCallback(() => {
    if (!moved.current) onClick?.();
  }, [onClick]);

  return (
    <div
      ref={ref}
      id={id}
      className="absolute flex flex-col items-center gap-1.5 p-2 rounded cursor-pointer select-none z-10 group"
      style={{ left: pos.left, top: pos.top }}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      <div className="rounded group-hover:bg-pink/10 transition-colors p-1">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={label}
            className="object-contain mix-blend-screen"
            style={{ width: imgSize, height: imgSize }}
            draggable={false}
          />
        ) : (
          <div className="w-12 h-12 border border-border bg-[#f0e8e4] flex items-center justify-center text-sm text-pink font-mono">
            {glyphText}
          </div>
        )}
      </div>
      <span className="text-[10px] text-dim text-center leading-tight font-mono" style={{ maxWidth: Math.max(86, imgSize + 6) }}>
        {label}
      </span>
    </div>
  );
}
