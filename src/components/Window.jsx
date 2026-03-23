import { useRef, useCallback, useState, useEffect } from 'react';

export default function Window({ id, title, visible, onClose, onFocus, children, initialPos, zIndex, width, height }) {
  const ref = useRef(null);
  const [pos, setPos] = useState(initialPos || { left: 90, top: 18 });

  useEffect(() => {
    if (initialPos) setPos(initialPos);
  }, []); // only on mount

  const handleTitleBarDown = useCallback((e) => {
    if (e.target.closest('button')) return;
    onFocus?.();
    const r  = ref.current.getBoundingClientRect();
    const ox = e.clientX - r.left;
    const oy = e.clientY - r.top;

    const onMove = (ev) => {
      let nx = ev.clientX - ox;
      let ny = ev.clientY - oy;
      nx = Math.max(0, Math.min(nx, window.innerWidth  - ref.current.offsetWidth));
      ny = Math.max(0, Math.min(ny, window.innerHeight - ref.current.offsetHeight));
      setPos({ left: nx, top: ny });
    };
    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup',   onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup',   onUp);
    e.preventDefault();
  }, [onFocus]);

  if (!visible) return null;

  return (
    <div
      ref={ref} id={id}
      className="absolute bg-winbg border border-border rounded-sm overflow-hidden"
      style={{ left: pos.left, top: pos.top, width, height, zIndex }}
      onMouseDown={onFocus}
    >
      <div
        className="flex items-center justify-between px-2 py-1 bg-tbar border-b border-border cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleTitleBarDown}
      >
        <span className="text-[10px] text-pink font-mono">{title}</span>
        <button
          onClick={onClose}
          className="w-3.5 h-3.5 rounded-full border-[1.5px] border-[#a04040] bg-closebtn text-white text-[9px] flex items-center justify-center leading-none hover:bg-[#a03030] transition-colors"
        >
          ✕
        </button>
      </div>
      <div className="overflow-y-auto term-scroll" style={{ height: `calc(${height}px - 28px)` }}>
        {children}
      </div>
    </div>
  );
}