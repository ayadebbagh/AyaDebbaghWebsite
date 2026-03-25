import { useState, useRef, useEffect, useCallback } from 'react';
import { fileContents, filesystem, pathNames, EASTER_EGGS } from '../data';

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

// ── Easter egg detection ─────────────────────────────────────────────────────
function detectEasterEgg(cmd) {
  if (/^rm\s+-/.test(cmd) || cmd.startsWith('del /f') || /^format\s+c/.test(cmd)) return 'rm_rf';
  if (cmd.startsWith('sudo ') || cmd === 'sudo') return 'sudo';
  if (cmd === 'cat /etc/passwd' || cmd === 'cat /etc/shadow') return 'cat_passwd';
  if (cmd === 'ls -la' || cmd === 'ls -a' || cmd === 'ls -al') return 'ls_hidden';
  if (cmd === 'hack' || cmd === 'hack the planet') return 'hack';
  if (cmd === 'secret') return 'secret';
  if (cmd === 'nmap' || cmd.startsWith('nmap ')) return 'nmap';
  if (cmd === 'python' || cmd === 'python3') return 'python';
  if (cmd === 'vim' || cmd === 'vi') return 'vim';
  if (cmd === 'uname' || cmd.startsWith('uname ')) return 'uname';
  return null;
}

const EGG_RESPONSES = {
  rm_rf: [
    { type: 'warn',  text: "rm: cannot remove '/': Operation not permitted" },
    { type: 'warn',  text: 'nuh uh. this filesystem is read-only 😐' },
    { type: 'muted', text: '(nice try though)' },
  ],
  sudo: [
    { type: 'muted', text: '[sudo] password for aya: ········' },
    { type: 'warn',  text: 'aya is not in the sudoers file. this incident will be reported.' },
  ],
  cat_passwd: [
    { type: 'resp',  text: 'root:x:0:0:root:/root:/bin/bash' },
    { type: 'resp',  text: 'aya:x:1337:1337:aya debbagh:/home/aya:/bin/zsh' },
    { type: 'resp',  text: 'intern:x:9999:9999:pls hire:/dev/null:/bin/false' },
    { type: 'muted', text: '(not a real passwd file, but nice try)' },
  ],
  ls_hidden: [
    { type: 'resp',  text: 'total 42' },
    { type: 'resp',  text: '-rw-r--r--  aya  about.txt' },
    { type: 'resp',  text: 'drwxr-xr-x  aya  projects/' },
    { type: 'resp',  text: '-rwxr-xr-x  aya  skills.txt' },
    { type: 'resp',  text: '-rw-r--r--  aya  .bash_history' },
    { type: 'resp',  text: '-rw-------  aya  .secret_notes' },
    { type: 'resp',  text: '-rwx------  aya  .flag  ← you found me' },
  ],
  hack: [
    { type: 'resp',  text: '[░░░░░░░░░░] initializing breach...' },
    { type: 'resp',  text: '[▓▓▓░░░░░░░] bypassing firewall...' },
    { type: 'resp',  text: '[▓▓▓▓▓▓░░░░] injecting payload...' },
    { type: 'resp',  text: '[▓▓▓▓▓▓▓▓▓▓] access granted.' },
    { type: 'muted', text: '  welcome to the mainframe.' },
  ],
  secret: [
    { type: 'star',  text: '✦ you found it ✦' },
    { type: 'resp',  text: "there's no grand secret." },
    { type: 'resp',  text: 'the secret is: keep building, keep learning, hire aya.' },
  ],
  nmap: [
    { type: 'muted', text: 'Starting Nmap 7.94 ( https://nmap.org )' },
    { type: 'resp',  text: 'Nmap scan report for aya-portfolio (127.0.0.1)' },
    { type: 'resp',  text: 'PORT      STATE   SERVICE' },
    { type: 'resp',  text: '80/tcp    open    http' },
    { type: 'resp',  text: '443/tcp   open    https' },
    { type: 'resp',  text: '1337/tcp  open    aya-is-hireable' },
    { type: 'muted', text: 'Nmap done: 1 IP address (1 host up)' },
  ],
  python: [
    { type: 'resp',  text: 'Python 3.12.0 (aya build)' },
    { type: 'resp',  text: '>>> import aya' },
    { type: 'resp',  text: '>>> aya.is_hireable()' },
    { type: 'star',  text: 'True' },
    { type: 'resp',  text: '>>> exit()' },
  ],
  vim: [
    { type: 'resp',  text: '~' },
    { type: 'resp',  text: '~   VIM - Vi IMproved 9.1' },
    { type: 'resp',  text: '~' },
    { type: 'resp',  text: '~ "portfolio.md" 42L, 1337C' },
    { type: 'warn',  text: 'you are now trapped. type :q! to escape.' },
    { type: 'muted', text: "(hint: you can't. this is a portfolio.)" },
  ],
  uname: [
    { type: 'resp',  text: 'Linux aya-portfolio 6.6.0-pink #1337 SMP' },
    { type: 'resp',  text: 'x86_64 GNU/Linux' },
    { type: 'muted', text: 'kernel built with love ♡' },
  ],
};

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

export default function Terminal({ onOpenFile, onEggFound, onOpenFlags }) {
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
    { id: 7, type: 'resp',   text: '-rwxr--r-- ✦  skills.txt' },
    { id: 8, type: 'resp',   text: '-rw-r--r-- ✦  contact.txt' },
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

    // ── Easter eggs ──
    const eggKey = detectEasterEgg(cmd);
    if (eggKey) {
      const egg = EASTER_EGGS.find(e => e.key === eggKey);
      onEggFound?.(eggKey);
      addLines([
        ...submitted,
        ...(EGG_RESPONSES[eggKey] || []),
        ...(egg ? [{ type: 'star', text: `✦ ${egg.flag}` }] : []),
        { type: 'muted', text: "  type 'flags' to view your ctf board" },
        { type: 'spacer', text: '' },
      ]);
      return;
    }

    // ── flags command ──
    if (cmd === 'flags') {
      onOpenFlags?.();
      addLines([
        ...submitted,
        { type: 'star', text: '→ opening flag board ✦' },
        { type: 'spacer', text: '' },
      ]);
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
          { type: 'resp',  text: '  secret          — secret' },
          { type: 'resp',  text: '  flags           — flag board' },
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
  }, [addLines, getPath, onOpenFile, onEggFound, onOpenFlags]);

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
