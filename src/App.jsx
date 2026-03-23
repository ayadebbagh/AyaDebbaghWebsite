import { useState, useEffect, useRef, useCallback } from 'react';
import DeskIcon   from './components/DeskIcon';
import Window     from './components/Window';
import Terminal   from './components/Terminal';
import FileViewer from './components/FileViewer';
import FolderViewer from './components/FolderViewer';

import aboutImg    from './assets/aboutme.png';
import contactImg  from './assets/contact.png';
import folder2Img  from './assets/folder2.png';
import projectsImg from './assets/projects.png';
import skillsImg   from './assets/skills.png';

const STAR_CHARS = ['✦', '✧', '*', '⋆'];

function useClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = () => {
      const n = new Date();
      let h = n.getHours(), m = n.getMinutes();
      const ap = h >= 12 ? 'PM' : 'AM';
      h = h % 12 || 12;
      setTime(`${h}:${String(m).padStart(2, '0')} ${ap}`);
    };
    fmt();
    const id = setInterval(fmt, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

let winZCounter = 30;

const PROJECT_ITEMS = [
  { key: 'homelab-ir',          name: 'homelab-ir',          desc: 'enterprise homelab + incident response' },
  { key: 'ctf-writeups',        name: 'ctf-writeups',        desc: 'HTB, PicoCTF, OverTheWire writeups' },
  { key: 'diabetes-prediction', name: 'diabetes-prediction', desc: '97% ML model + explainable visuals' },
  { key: 'promptshield',        name: 'promptshield',        desc: 'LLM prompt injection firewall' },
];

const FUN_STUFF_ITEMS = [
  { key: 'cybersci',             name: 'Cybersci',              desc: 'cybersecurity and science activities' },
  { key: 'ieeexhtb-ctf',         name: 'IEEExHackTheBox CTF',   desc: 'competition highlights and notes' },
  { key: 'lockpicking-workshop', name: 'Lockpicking workshop',  desc: 'hands-on physical security workshop' },
  { key: 'bsides-2025',          name: 'Bsides 2025',           desc: 'conference participation and takeaways' },
];

export default function App() {
  const clock     = useClock();
  const canvasRef = useRef(null);

  const [windows, setWindows] = useState([
    { id: 'terminal', type: 'terminal', title: 'terminal', pos: { left: 100, top: 18 }, zIndex: 20, visible: true },
  ]);

  const bringToFront = useCallback((id) => {
    winZCounter++;
    const z = winZCounter;
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: z } : w));
  }, []);

  const closeWindow = useCallback((id) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, visible: false } : w));
  }, []);

  const openFileWindow = useCallback((fileKey, title) => {
    winZCounter++;
    const id = `file-${fileKey}-${Date.now()}`;
    setWindows(prev => [
      ...prev,
      {
        id,
        type: 'file',
        fileKey,
        title: title || fileKey,
        pos: { left: 140 + Math.random() * 80, top: 40 + Math.random() * 40 },
        zIndex: winZCounter,
        visible: true,
      },
    ]);
  }, []);

  const openProjectsFolder = useCallback(() => {
    setWindows(prev => {
      const existing = prev.find(w => w.id === 'projects-folder');
      if (existing) {
        winZCounter++;
        return prev.map(w => w.id === 'projects-folder'
          ? { ...w, visible: true, zIndex: winZCounter }
          : w
        );
      }
      winZCounter++;
      return [...prev, {
        id: 'projects-folder',
        type: 'folder',
        title: 'projects/',
        pos: { left: 160, top: 60 },
        zIndex: winZCounter,
        visible: true,
      }];
    });
  }, []);

  const openFunStuffFolder = useCallback(() => {
    setWindows(prev => {
      const existing = prev.find(w => w.id === 'fun-stuff-folder');
      if (existing) {
        winZCounter++;
        return prev.map(w => w.id === 'fun-stuff-folder'
          ? { ...w, visible: true, zIndex: winZCounter }
          : w
        );
      }
      winZCounter++;
      return [...prev, {
        id: 'fun-stuff-folder',
        type: 'folder',
        folderKey: 'fun-stuff',
        title: 'fun stuff/',
        pos: { left: 230, top: 90 },
        zIndex: winZCounter,
        visible: true,
      }];
    });
  }, []);

  const openTerminal = useCallback(() => {
    setWindows(prev => {
      winZCounter++;
      return prev.map(w => w.id === 'terminal'
        ? { ...w, visible: true, zIndex: winZCounter }
        : w
      );
    });
  }, []);

  const stars = useRef(
    Array.from({ length: 40 }, (_, i) => ({
      id:   i,
      char: STAR_CHARS[Math.floor(Math.random() * STAR_CHARS.length)],
      x:    Math.random() * 100,
      y:    Math.random() * 100,
      op:   0.1 + Math.random() * 0.2,
      sz:   7 + Math.random() * 7,
    }))
  ).current;

  return (
    <div className="w-screen h-screen bg-desktop font-mono overflow-hidden relative flex flex-col">

      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {stars.map(s => (
          <span key={s.id} className="absolute text-border"
            style={{ left: `${s.x}%`, top: `${s.y}%`, opacity: s.op, fontSize: s.sz }}>
            {s.char}
          </span>
        ))}
      </div>

      <div className="relative z-50 flex items-center justify-between px-3.5 py-1 bg-taskbar border-b border-border">
        <span className="font-script text-[17px] text-pink">✦ Aya Debbagh</span>
        <div className="flex items-center gap-2.5 text-[10px] text-dim">
          <span>{clock}</span>
          <span className="text-pink">✦</span>
        </div>
      </div>

      <div ref={canvasRef} className="relative flex-1 overflow-hidden z-10">

        <DeskIcon id="di-term"     label="terminal"  glyphText=">_"      style={{ left: 16, top: 12  }} canvasRef={canvasRef} onClick={openTerminal} />
        <DeskIcon id="di-about"    label="about.txt" imgSrc={aboutImg}    style={{ left: 16, top: 138 }} canvasRef={canvasRef} onClick={() => openFileWindow('about',   'about.txt')} />
        <DeskIcon id="di-projects" label="projects/" imgSrc={projectsImg} style={{ left: 16, top: 264 }} canvasRef={canvasRef} onClick={openProjectsFolder} />
        <DeskIcon id="di-skills"   label="skills.sh" imgSrc={skillsImg}   style={{ left: 16, top: 390 }} canvasRef={canvasRef} onClick={() => openFileWindow('skills',  'skills.sh')} />
        <DeskIcon id="di-contact"  label="contact"   imgSrc={contactImg}  style={{ left: 16, top: 516 }} canvasRef={canvasRef} onClick={() => openFileWindow('contact', 'contact')} />
        <DeskIcon id="di-fun"      label="fun stuff/" imgSrc={folder2Img} style={{ left: 16, top: 642 }} canvasRef={canvasRef} onClick={openFunStuffFolder} />

        {windows.map(w => {
          if (!w.visible) return null;

          if (w.type === 'terminal') {
            return (
              <Window key={w.id} id={w.id}
                title={<><span className="text-[#b09090]">bash</span> — ~/aya — 80×24</>}
                visible={w.visible} onClose={() => closeWindow(w.id)}
                onFocus={() => bringToFront(w.id)}
                initialPos={w.pos} zIndex={w.zIndex} width={620} height={430}>
                <Terminal onOpenFile={(key, title) => openFileWindow(key, title)} />
              </Window>
            );
          }

          if (w.type === 'folder') {
            const isFunStuff = w.folderKey === 'fun-stuff';
            return (
              <Window key={w.id} id={w.id} title={isFunStuff ? 'fun stuff/' : 'projects/'}
                visible={w.visible} onClose={() => closeWindow(w.id)}
                onFocus={() => bringToFront(w.id)}
                initialPos={w.pos} zIndex={w.zIndex} width={520} height={380}>
                <FolderViewer
                  title={isFunStuff ? 'fun stuff/' : 'projects/'}
                  imgSrc={isFunStuff ? folder2Img : projectsImg}
                  badgeText={isFunStuff ? 'fun' : 'prj'}
                  items={isFunStuff ? FUN_STUFF_ITEMS : PROJECT_ITEMS}
                  onOpenFile={(key, title) => openFileWindow(key, title)}
                />
              </Window>
            );
          }

          if (w.type === 'file') {
            return (
              <Window key={w.id} id={w.id} title={w.title}
                visible={w.visible} onClose={() => closeWindow(w.id)}
                onFocus={() => bringToFront(w.id)}
                initialPos={w.pos} zIndex={w.zIndex} width={460} height={340}>
                <FileViewer fileKey={w.fileKey} />
              </Window>
            );
          }

          return null;
        })}

      </div>

      <div className="relative z-50 flex items-center gap-3.5 px-3.5 py-1 bg-taskbar border-t border-border text-[10px] text-dim">
        <span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#7ab898] mr-1 animate-blink2" />
          <span className="text-pink">online</span>
        </span>
        <span>UTF-8</span>
        <span className="text-pink">✦ Aya Debbagh</span>
        <span className="ml-auto font-script text-[13px] text-pinklt">
          security researcher. pink &amp; encrypted.
        </span>
      </div>

    </div>
  );
}