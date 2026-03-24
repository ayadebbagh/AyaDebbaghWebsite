import { useRef, useEffect } from 'react';
import { fileContents } from '../data';

export default function FileViewer({ fileKey }) {
  const ref = useRef(null);
  const data = fileContents[fileKey];

  useEffect(() => {
    if (!ref.current) return;
    const anchors = ref.current.querySelectorAll('a[href]');
    anchors.forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.open(a.getAttribute('href'), '_blank', 'noopener,noreferrer');
      }, { capture: true });
    });
  }, [fileKey]);

  if (!data) return null;
  return (
    <div
      ref={ref}
      className="p-4 font-mono text-[11px] text-ttext"
      dangerouslySetInnerHTML={{ __html: data.html }}
    />
  );
}
