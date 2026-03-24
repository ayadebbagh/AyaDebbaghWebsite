import { memo } from 'react';
import { fileContents } from '../data';

export default memo(function FileViewer({ fileKey }) {
  const data = fileContents[fileKey];
  if (!data) return null;
  return (
    <div
      className="p-4 font-mono text-[11px] text-ttext"
      dangerouslySetInnerHTML={{ __html: data.html }}
    />
  );
});
