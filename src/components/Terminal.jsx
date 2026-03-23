import { useState, useRef, useEffect, useCallback } from 'react';
import { fileContents, filesystem, pathNames } from '../data';

const BUTTERFLY = [
  "            ,ggg,                         ",
  "          dP\"\"8I                         ",
  "         dP   88                         ",
  "        dP    88                         ",
  "       ,8'    88                         ",
  "       d88888888   gg     gg    ,gggg,gg ",
  " __   ,8\"     88   I8     8I   dP\"  \"Y8I ",
  "dP\"  ,8P      Y8   I8,   ,8I  i8'    ,8I ",
  "Yb,_,dP       `8b,,d8b, ,d8I ,d8,   ,d8b,",
  " \"Y8P\"         `Y8P\"\"Y88P\"888P\"Y8888P\"`Y8",
  "                        ,d8I'            ",
  "                      ,dP'8I             ",
  "                     ,8\"  8I             ",
  "                     I8   8I             ",
  "                     `8, ,8I             ",
  "                      `Y8P\"              ",
].join('\n');

const STARS_ART = `pls hire me
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡞⠋⠉⠳⡄⠀⠀⠀⠀⢠⠴⠒⠳⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢀⡶⢶⡀⠀⠀⠀⠀⠀⠀⠀⢠⠏⠀⠀⠀⠀⢹⡄⠀⠀⣰⠋⠀⠀⠀⠸⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⣀⡼⠀⠀⠛⠒⠒⡦⠀⠀⠀⠀⡟⠀⠀⠀⠀⠀⠀⣷⠀⢰⡏⠀⠀⠀⠀⠀⣹⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣏⠁⠀⠀⠀⠀⠀⣼⠁⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⣹⠀⢸⠀⠀⠀⠀⠀⠀⢸⠁⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠉⡶⠀⠀⠀⠀⠈⡆⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⢽⠀⢸⠀⠀⠀⠀⠀⠀⣽⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢷⡤⠞⠉⠉⠉⠁⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⢸⡆⢸⠀⠀⠀⠀⠀⢀⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣆⠀⠀⠀⠀⠀⠈⠛⠋⠀⠀⠀⠀⠀⣸⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⡤⠆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠳⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡞⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠷⡀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣦⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠰⡇⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣧⣠⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⡇⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣀⣤⣾⠁⠈⣧⠀⠰⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣄⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠐⡇⠀⠘⠁⠀⠘⠲⢤⡀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠈⠉⠀⠀⠀⢠⠇⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠙⢦⣄⠀⣠⠤⠤⠄⠙⡇⠀⠀⢨⠷⢶⡋⠀⠀⠀⠀⠀⢀⣴⠋⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣧⠀⢷⣀⡴⠂⢠⣇⡀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣴⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠳⠤⣤⣤⡴⠋⠀⠹⣽⣛⣛⣿⠋⠉⠉⢁⡴⢋⣳⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠳⣄⡀⠀⠀⠉⠁⠀⠀⠀⣠⡞⠓⠚⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⡍⠓⠦⢤⠤⠴⠶⣺⠟⠀⠀⠀⠀⠀⠀⠀⢀⣀⡀⡰⢲⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠓⠒⠛⠲⠶⠚⠁⠀⠀⠀⠀⠀⠀⠀⠀⠘⣏⠉⠁⠈⠲⣤
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡞⣁⡀⠀⡞⠁
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠁⠈⠙⠁⠀`;

function Line({ type, text }) {
  const colors = {
    prompt:    'text-pink',
    resp:      'text-tgreen',
    muted:     'text-tmuted text-[10px] italic',
    star:      'text-tstar',
    warn:      'text-twarn',
    path:      'text-tblue',
    default:   'text-ttext',
  };
  return (
    <div className={`font-mono text-[11px] leading-[1.65] mb-px ${colors[type] || colors.default}`}>
      {text}
    </div>
  );
}

export default function Terminal({ onOpenFile }) {
  const [cwd, setCwd]           = useState('root');
  const [input, setInput]       = useState('');
  const [lines, setLines]       = useState([
    { id: 0, type: 'muted',  text: '✦ welcome — personal terminal v1.0 ✦' },
    { id: 1, type: 'spacer', text: '' },
    { id: 2, type: 'muted',  text: "# type help to get started" },
    { id: 3, type: 'spacer', text: '' },
    { id: 4, type: 'prompt', text: '~/aya $ ls' },
    { id: 5, type: 'resp',   text: 'drwxr--r-- ✦  about.txt' },
    { id: 6, type: 'resp',   text: 'drwxr-xr-x ✦  projects/' },
    { id: 7, type: 'resp',   text: '-rwxr--r-- ✦  skills.sh' },
    { id: 8, type: 'resp',   text: '-rw-r--r-- ✦  contact' },
    { id: 9, type: 'spacer', text: '' },
  ]);

  const lineId      = useRef(10);
  const bodyRef     = useRef(null);
  const cwdRef      = useRef('root');

  const getPath = useCallback((dir) => pathNames[dir] || '~/aya', []);

  // keep cwdRef in sync
  useEffect(() => { cwdRef.current = cwd; }, [cwd]);

  // scroll to bottom on new lines
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  const addLines = useCallback((newLines) => {
    setLines(prev => [...prev, ...newLines.map(l => ({ ...l, id: lineId.current++ }))]);
  }, []);

  const runCmd = useCallback((rawInput, currentCwd, currentSetCwd) => {
    const cmd = rawInput.trim().toLowerCase();
    if (!cmd) return;

    const path = getPath(currentCwd);
    const submitted = [{ type: 'prompt', text: `${path} $ ${cmd}` }];

    if (cmd === 'clear') {
      setLines([]);
      return;
    }

    let output = [];

    if (cmd === 'help') {
      if (currentCwd === 'projects') {
        output = [
          { type: 'star',  text: 'you are in ~/aya/projects/ ✦' },
          { type: 'resp',  text: '  ls            — list projects' },
          { type: 'resp',  text: '  cat [file]    — open a project' },
          { type: 'resp',  text: '  cd ..         — go back' },
        ];
      } else {
        output = [
          { type: 'star',  text: 'available commands ✦' },
          { type: 'resp',  text: '  ls              — list directory' },
          { type: 'resp',  text: '  cat [file]      — read a file' },
          { type: 'resp',  text: '  cd projects/    — enter projects dir' },
          { type: 'resp',  text: '  cd fun stuff/   — enter fun stuff dir' },
          { type: 'resp',  text: '  whoami          — identity check' },
          { type: 'resp',  text: '  clear           — clear terminal' },
          { type: 'resp',  text: '  secret           — secret' },
        ];
      }
    } else if (cmd === 'ls') {
      const dir = filesystem[currentCwd];
      output = dir.ls.map(name => ({ type: 'resp', text: 'drwxr--r-- ✦  ' + name }));
    } else if (cmd === 'whoami') {
      output = [
        { type: 'resp', text: 'Aya Debbagh' },
        { type: 'resp', text: 'uid=1337(aya) gid=1337(pinkteam)' },
      ];
    } else if (cmd === 'stars') {
      output = STARS_ART.split('\n').map(text => ({ type: 'star', text }));
    } else {
      const dir = filesystem[currentCwd];
      if (dir.files[cmd]) {
        onOpenFile(dir.files[cmd].open, dir.files[cmd].title);
        output = [{ type: 'star', text: `→ opening ${cmd} ✦` }];
      } else if (dir.dirs[cmd]) {
        const nextCwd = dir.dirs[cmd];
        currentSetCwd(nextCwd);
        output = [
          { type: 'resp', text: `→ entered ${getPath(nextCwd)}` },
          { type: 'muted', text: '  type ls to explore' },
        ];
      } else {
        output = [{ type: 'warn', text: `command not found: ${cmd} — try 'help'` }];
      }
    }

    addLines([...submitted, ...output, { type: 'spacer', text: '' }]);
  }, [addLines, getPath, onOpenFile]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const currentCwd = cwdRef.current;
      runCmd(input, currentCwd, (next) => {
        setCwd(next);
        cwdRef.current = next;
      });
      setInput('');
    } else if (e.key === 'Backspace') {
      e.preventDefault();
      setInput(prev => prev.slice(0, -1));
    } else if (e.key === 'Tab') {
      e.preventDefault();
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      setInput(prev => prev + e.key);
    }
  }, [input, runCmd]);

  return (
    <div
      ref={bodyRef}
      className="h-full px-3 py-2.5 overflow-y-auto bg-termbg term-scroll cursor-text outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={e => e.currentTarget.focus()}
    >
      {/* butterfly */}
      <pre className="text-butterfly text-[9.5px] leading-[1.18] font-mono mb-1">{BUTTERFLY}</pre>
      <div className="mb-2" />

      {/* history lines */}
      {lines.map(l =>
        l.type === 'spacer'
          ? <div key={l.id} className="h-[1.65em]" />
          : <Line key={l.id} type={l.type} text={l.text} />
      )}

      {/* live input line */}
      <div className="flex items-center font-mono text-[11px] text-pink leading-[1.65]">
        <span className="whitespace-nowrap mr-1">{getPath(cwd)} $&nbsp;</span>
        <span>{input}</span>
        <span className="inline-block w-1.5 h-3 bg-cursor align-middle ml-px animate-blink" />
      </div>
    </div>
  );
}
