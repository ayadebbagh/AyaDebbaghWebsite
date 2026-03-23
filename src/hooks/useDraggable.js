import { useRef, useCallback } from 'react';

export function useDraggable(canvasRef) {
  const dragging = useRef(false);
  const offset   = useRef({ x: 0, y: 0 });
  const elRef    = useRef(null);

  const onMouseDown = useCallback((e, el) => {
    dragging.current = true;
    elRef.current = el;
    const r  = el.getBoundingClientRect();
    const cr = canvasRef.current.getBoundingClientRect();
    offset.current = {
      x: e.clientX - (r.left - cr.left),
      y: e.clientY - (r.top  - cr.top),
    };
    e.preventDefault();
  }, [canvasRef]);

  const onMouseMove = useCallback((e) => {
    if (!dragging.current || !elRef.current) return;
    const cr = canvasRef.current.getBoundingClientRect();
    const el = elRef.current;
    let nx = e.clientX - cr.left - offset.current.x;
    let ny = e.clientY - cr.top  - offset.current.y;
    nx = Math.max(0, Math.min(nx, cr.width  - el.offsetWidth));
    ny = Math.max(0, Math.min(ny, cr.height - el.offsetHeight));
    el.style.left = nx + 'px';
    el.style.top  = ny + 'px';
  }, [canvasRef]);

  const onMouseUp = useCallback(() => {
    dragging.current = false;
    elRef.current = null;
  }, []);

  return { onMouseDown, onMouseMove, onMouseUp };
}
