import projectsImg from '../assets/projects.png';

const DEFAULT_PROJECTS = [
  { key: 'homelab-ir',           name: 'homelab-ir',           desc: 'enterprise homelab + incident response' },
  { key: 'ctf-writeups',         name: 'ctf-writeups',         desc: 'HTB, PicoCTF, OverTheWire writeups' },
  { key: 'diabetes-prediction',  name: 'diabetes-prediction',  desc: '97% ML model + explainable visuals' },
  { key: 'promptshield',         name: 'promptshield',         desc: 'LLM prompt injection firewall' },
];

export default function FolderViewer({ onOpenFile, title = 'projects/', items = DEFAULT_PROJECTS, imgSrc = projectsImg, badgeText = 'prj' }) {
  return (
    <div className="p-4 bg-termbg h-full">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
        <img src={imgSrc} alt={title} className="w-8 h-8 object-contain" />
        <div>
          <p className="text-[11px] text-pink font-mono">{title}</p>
          <p className="text-[10px] text-tmuted font-mono italic">{items.length} items</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {items.map(p => (
          <button
            key={p.key}
            onClick={() => onOpenFile(p.key, p.name)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded border border-border bg-winbg hover:bg-pinkbg hover:border-pink/40 transition-all text-left group"
          >
            <div className="w-7 h-7 border border-border bg-[#f0e8e4] flex items-center justify-center text-[9px] text-pink font-mono flex-shrink-0">
              {badgeText}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-pink font-mono group-hover:underline truncate">{p.name}</p>
              <p className="text-[10px] text-tmuted font-mono italic truncate">{p.desc}</p>
            </div>
            <span className="text-[10px] text-border group-hover:text-pink transition-colors">→</span>
          </button>
        ))}
      </div>

      <div className="mt-4 text-center text-[10px] text-border tracking-widest">
        ✦ ─ ✦ ─ ✦ ─ ✦ ─ ✦
      </div>
    </div>
  );
}