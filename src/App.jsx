import { useState, useEffect, useRef, useCallback } from 'react';
import DeskIcon   from './components/DeskIcon';
import Window     from './components/Window';
import Terminal   from './components/Terminal';
import FileViewer from './components/FileViewer';
import FolderViewer   from './components/FolderViewer';
import EggChecklist  from './components/EggChecklist';
import { EASTER_EGGS } from './data';

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

function useIconRows() {
  const compute = () => {
    const canvasH = window.innerHeight - 60;
    const gap = Math.min(126, Math.max(90, Math.floor((canvasH - 12 - 110) / 4)));
    return Array.from({ length: 5 }, (_, i) => 12 + i * gap);
  };
  const [rows, setRows] = useState(compute);
  useEffect(() => {
    const handler = () => setRows(compute());
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return rows;
}

let winZCounter = 30;
const TERMINAL_WIDTH = 620;
const TERMINAL_HEIGHT = 430;
const FOLDER_WIDTH = 520;
const FOLDER_HEIGHT = 380;
const FILE_WIDTH = 460;
const FILE_HEIGHT = 340;

function getCenteredPos(width, height) {
  if (typeof window === 'undefined') {
    return { left: 100, top: 18 };
  }

  return {
    left: Math.max(0, Math.round((window.innerWidth - width) / 2)),
    top: Math.max(0, Math.round((window.innerHeight - height) / 2)),
  };
}

function getCenteredTerminalPos() {
  return getCenteredPos(TERMINAL_WIDTH, TERMINAL_HEIGHT);
}

function isMobileViewport() {
  if (typeof window === 'undefined') return false;

  const coarsePointer = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  return window.innerWidth <= 900 || coarsePointer;
}

function getWindowSize(type, isMobile) {
  if (!isMobile || typeof window === 'undefined') {
    if (type === 'terminal') return { width: TERMINAL_WIDTH, height: TERMINAL_HEIGHT };
    if (type === 'folder') return { width: FOLDER_WIDTH, height: FOLDER_HEIGHT };
    return { width: FILE_WIDTH, height: FILE_HEIGHT };
  }

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  if (type === 'terminal') {
    return {
      width: Math.min(560, Math.max(300, vw - 20)),
      height: Math.min(520, Math.max(250, vh - 140)),
    };
  }

  if (type === 'folder') {
    return {
      width: Math.min(500, Math.max(280, vw - 20)),
      height: Math.min(500, Math.max(260, vh - 130)),
    };
  }

  return {
    width: Math.min(460, Math.max(270, vw - 20)),
    height: Math.min(460, Math.max(240, vh - 130)),
  };
}

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
  const iconRows  = useIconRows();
  const canvasRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() => isMobileViewport());
  const [showMobileNotice, setShowMobileNotice] = useState(true);

  const [foundEggs, setFoundEggs] = useState([]);
  const sessionFoundRef     = useRef(false);
  const [toast, setToast]   = useState(null);
  const toastTimerRef       = useRef(null);
  const openEggChecklistRef = useRef(null);

  useEffect(() => {
    const handleViewportChange = () => setIsMobile(isMobileViewport());
    handleViewportChange();

    window.addEventListener('resize', handleViewportChange);
    return () => window.removeEventListener('resize', handleViewportChange);
  }, []);

  const [windows, setWindows] = useState(() => ([
    (() => {
      const mobileAtLoad = isMobileViewport();
      const terminalSize = getWindowSize('terminal', mobileAtLoad);
      return {
        id: 'terminal',
        type: 'terminal',
        title: 'terminal',
        pos: getCenteredPos(terminalSize.width, terminalSize.height),
        zIndex: 20,
        visible: !mobileAtLoad,
      };
    })(),
  ]));

  const getSize = useCallback((type) => getWindowSize(type, isMobile), [isMobile]);

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
    const fileSize = getSize('file');
    setWindows(prev => [
      ...prev,
      {
        id,
        type: 'file',
        fileKey,
        title: title || fileKey,
        pos: isMobile
          ? getCenteredPos(fileSize.width, fileSize.height)
          : { left: 140 + Math.random() * 80, top: 40 + Math.random() * 40 },
        zIndex: winZCounter,
        visible: true,
      },
    ]);
  }, [getSize, isMobile]);

  const openProjectsFolder = useCallback(() => {
    setWindows(prev => {
      const existing = prev.find(w => w.id === 'projects-folder');
      const folderSize = getSize('folder');
      if (existing) {
        winZCounter++;
        return prev.map(w => w.id === 'projects-folder'
          ? {
              ...w,
              visible: true,
              zIndex: winZCounter,
              pos: isMobile ? getCenteredPos(folderSize.width, folderSize.height) : w.pos,
            }
          : w
        );
      }
      winZCounter++;
      return [...prev, {
        id: 'projects-folder',
        type: 'folder',
        title: 'projects/',
        pos: isMobile ? getCenteredPos(folderSize.width, folderSize.height) : { left: 160, top: 60 },
        zIndex: winZCounter,
        visible: true,
      }];
    });
  }, [getSize, isMobile]);

  const openFunStuffFolder = useCallback(() => {
    setWindows(prev => {
      const existing = prev.find(w => w.id === 'fun-stuff-folder');
      const folderSize = getSize('folder');
      if (existing) {
        winZCounter++;
        return prev.map(w => w.id === 'fun-stuff-folder'
          ? {
              ...w,
              visible: true,
              zIndex: winZCounter,
              pos: isMobile ? getCenteredPos(folderSize.width, folderSize.height) : w.pos,
            }
          : w
        );
      }
      winZCounter++;
      return [...prev, {
        id: 'fun-stuff-folder',
        type: 'folder',
        folderKey: 'fun-stuff',
        title: 'fun stuff/',
        pos: isMobile ? getCenteredPos(folderSize.width, folderSize.height) : { left: 230, top: 90 },
        zIndex: winZCounter,
        visible: true,
      }];
    });
  }, [getSize, isMobile]);

  const openTerminal = useCallback(() => {
    setWindows(prev => {
      winZCounter++;
      const terminalSize = getSize('terminal');
      return prev.map(w => w.id === 'terminal'
        ? {
            ...w,
            visible: true,
            zIndex: winZCounter,
            pos: isMobile ? getCenteredPos(terminalSize.width, terminalSize.height) : w.pos,
          }
        : w
      );
    });
  }, [getSize, isMobile]);

  const openEggChecklist = useCallback(() => {
    setWindows(prev => {
      const existing = prev.find(w => w.id === 'egg-checklist');
      const sz = getSize('file');
      if (existing) {
        winZCounter++;
        return prev.map(w => w.id === 'egg-checklist'
          ? { ...w, visible: true, zIndex: winZCounter, pos: isMobile ? getCenteredPos(sz.width, sz.height) : w.pos }
          : w
        );
      }
      winZCounter++;
      return [...prev, {
        id: 'egg-checklist', type: 'egg-checklist', title: 'flags.txt',
        pos: isMobile ? getCenteredPos(sz.width, sz.height) : { left: 200, top: 80 },
        zIndex: winZCounter, visible: true,
      }];
    });
  }, [getSize, isMobile]);

  openEggChecklistRef.current = openEggChecklist;

  const handleEggFound = useCallback((key) => {
    setFoundEggs(prev => {
      if (prev.includes(key)) return prev;
      const next = [...prev, key];
      if (!sessionFoundRef.current) {
        sessionFoundRef.current = true;
        setTimeout(() => openEggChecklistRef.current?.(), 0);
      }
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      setToast({ text: `✦ flag captured! [${next.length}/${EASTER_EGGS.length}]  —  type 'flags' to view board`, id: Date.now() });
      toastTimerRef.current = setTimeout(() => setToast(null), 4000);
      return next;
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

  const terminalSize = getSize('terminal');
  const folderSize = getSize('folder');
  const fileSize = getSize('file');

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
        <div className="flex items-center gap-2.5 text-[10px] text-tdim">
          <span>{clock}</span>
          <span className="text-pink">✦</span>
        </div>
      </div>

      {isMobile && showMobileNotice && (
        <div className="relative z-50 px-3 pt-2 pointer-events-none">
          <div className="mx-auto max-w-[560px] rounded border border-[#c9a8b8] bg-[#fff7fb]/95 text-[#7a3f60] px-3 py-2 text-[11px] leading-snug flex items-start gap-2 pointer-events-auto shadow-sm">
            <span className="text-[12px]">✦</span>
            <p className="flex-1">
              This portfolio works best on a laptop. Some features (like terminal interactions and window dragging) are limited on mobile.
            </p>
            <button
              type="button"
              aria-label="Dismiss mobile notice"
              onClick={() => setShowMobileNotice(false)}
              className="text-[10px] text-pink hover:text-[#9d557b]"
            >
              dismiss
            </button>
          </div>
        </div>
      )}

      <div ref={canvasRef} className="relative flex-1 overflow-hidden z-10">

        <DeskIcon id="di-term"     label="terminal"   glyphText=">_"      style={{ left: 16,  top: iconRows[0] }} canvasRef={canvasRef} onClick={openTerminal} />
        <DeskIcon id="di-about"    label="about.txt"  imgSrc={aboutImg}    style={{ left: 16,  top: iconRows[1] }} canvasRef={canvasRef} onClick={() => openFileWindow('about',   'about.txt')} />
        <DeskIcon id="di-fun"      label="fun stuff/" imgSrc={folder2Img}  style={{ left: 110, top: iconRows[1] }} canvasRef={canvasRef} onClick={openFunStuffFolder} />
        <DeskIcon id="di-projects" label="projects/"  imgSrc={projectsImg} style={{ left: 16,  top: iconRows[2] }} canvasRef={canvasRef} onClick={openProjectsFolder} />
        <DeskIcon id="di-skills"   label="skills.txt" imgSrc={skillsImg}   style={{ left: 16,  top: iconRows[3] }} canvasRef={canvasRef} onClick={() => openFileWindow('skills',  'skills.txt')} />
        <DeskIcon id="di-contact"  label="contact.txt" imgSrc={contactImg} style={{ left: 16,  top: iconRows[4] }} canvasRef={canvasRef} onClick={() => openFileWindow('contact', 'contact.txt')} />

        {windows.map(w => {
          if (!w.visible) return null;

          if (w.type === 'terminal') {
            return (
              <Window key={w.id} id={w.id}
                title={<><span className="text-[#b09090]">bash</span> — ~/aya — 80×24</>}
                visible={w.visible} onClose={() => closeWindow(w.id)}
                onFocus={() => bringToFront(w.id)}
                initialPos={w.pos} zIndex={w.zIndex} width={terminalSize.width} height={terminalSize.height}>
                <Terminal
                  onOpenFile={(key, title) => openFileWindow(key, title)}
                  onEggFound={handleEggFound}
                  onOpenFlags={openEggChecklist}
                />
              </Window>
            );
          }

          if (w.type === 'folder') {
            const isFunStuff = w.folderKey === 'fun-stuff';
            return (
              <Window key={w.id} id={w.id} title={isFunStuff ? 'fun stuff/' : 'projects/'}
                visible={w.visible} onClose={() => closeWindow(w.id)}
                onFocus={() => bringToFront(w.id)}
                initialPos={w.pos} zIndex={w.zIndex} width={folderSize.width} height={folderSize.height}>
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
                initialPos={w.pos} zIndex={w.zIndex} width={fileSize.width} height={fileSize.height}>
                <FileViewer fileKey={w.fileKey} />
              </Window>
            );
          }

          if (w.type === 'egg-checklist') {
            const sz = getSize('file');
            return (
              <Window key={w.id} id={w.id} title={w.title}
                visible={w.visible} onClose={() => closeWindow(w.id)}
                onFocus={() => bringToFront(w.id)}
                initialPos={w.pos} zIndex={w.zIndex}
                width={sz.width} height={sz.height}>
                <EggChecklist foundEggs={foundEggs} />
              </Window>
            );
          }

          return null;
        })}

      </div>

      {toast && (
        <div key={toast.id} className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
          <div className="toast-fade bg-[#270722] text-[#D897B8] font-mono text-[10px] px-4 py-2 border border-[#D897B8]/40 whitespace-nowrap">
            {toast.text}
          </div>
        </div>
      )}

      <div className="relative z-50 flex items-center gap-3.5 px-3.5 py-1 bg-taskbar border-t border-border text-[10px] text-tdim">
        <span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#7ab898] mr-1 animate-blink2" />
          <span className="text-pink">online</span>
        </span>
        <span>UTF-8</span>
        <span className="text-pink">✦ Aya Debbagh</span>
        <span className="ml-auto font-script text-[13px] text-pinklt">
          made with love.
        </span>
      </div>

    </div>
  );
}