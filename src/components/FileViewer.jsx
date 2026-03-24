import { fileContents } from '../data';

export default function FileViewer({ fileKey }) {
  const data = fileContents[fileKey];
  if (!data) return null;

  const handleClick = (e) => {
    const link = e.target.closest('a[href]');
    if (link) {
      e.stopPropagation();
      window.open(link.getAttribute('href'), '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className="p-4 font-mono text-[11px] text-ttext"
      dangerouslySetInnerHTML={{ __html: data.html }}
      onClick={handleClick}
    />
  );
}
