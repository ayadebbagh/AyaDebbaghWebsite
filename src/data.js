import bsides2025Img1 from './assets/bsides-2025-1.png';
import bsides2025Img2 from './assets/bsides-2025-2.png';
import cybersciImg1 from './assets/cybersci-1.png';
import cybersciImg2 from './assets/cybersci-2.png';
import ieeexhtbCtfImg1 from './assets/ieeexhtb-ctf-1.png';
import ieeexhtbCtfImg2 from './assets/ieeexhtb-ctf-2.png';
import lockpickingImg1 from './assets/lockpicking-1.png';
import lockpickingImg2 from './assets/lockpicking-2.png';

// ── file content rendered inside file viewer windows ──
export const fileContents = {
  about: {
    title: 'about.txt',
    html: `
      <h3 style="font-family:'PPEditorialOld-Italic',cursive;color:#7a3f60;font-size:22px;margin-bottom:5px;">✦ Aya Debbagh</h3>
      <div style="text-align:center;color:#c4aeb8;font-size:10px;letter-spacing:3px;padding:2px 0;margin:3px 0;">✦ ─ ✦ ─ ✦ ─ ✦ ─ ✦ ─ ✦</div>
      <p style="color:#8a7070;line-height:1.7;margin-bottom:6px;font-size:11px;">hi. i'm a cybersecurity researcher who builds beautiful things that break beautiful things. security doesn't have to look like it was designed in 1997.</p>
      <p style="color:#8a7070;line-height:1.7;margin-bottom:6px;font-size:11px;">somewhere between the terminal and a dream. obsessed with network forensics, malware analysis, and making the command line look like a fever dream.</p>
      <div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:7px;">
        <span style="font-size:9px;padding:2px 7px;border:1px solid #c4aeb8;color:#7a3f60;background:#fbeef4;">pentesting</span>
        <span style="font-size:9px;padding:2px 7px;border:1px solid #c4aeb8;color:#7a3f60;background:#fbeef4;">malware analysis</span>
        <span style="font-size:9px;padding:2px 7px;border:1px solid #c4aeb8;color:#7a3f60;background:#fbeef4;">CTF</span>
        <span style="font-size:9px;padding:2px 7px;border:1px solid #c4aeb8;color:#7a3f60;background:#fbeef4;">forensics</span>
        <span style="font-size:9px;padding:2px 7px;border:1px solid #c4aeb8;color:#7a3f60;background:#fbeef4;">she/her</span>
      </div>
    `,
  },

  skills: {
    title: 'skills.sh',
    html: `
      <h3 style="font-family:'PPEditorialOld-Italic',cursive;color:#7a3f60;font-size:22px;margin-bottom:5px;">✦ skills.sh</h3>
      <div style="text-align:center;color:#c4aeb8;font-size:10px;letter-spacing:3px;padding:2px 0;margin:3px 0;">✦ ─ ✦ ─ ✦ ─ ✦ ─ ✦ ─ ✦</div>
      <p style="color:#7a3f60;font-size:11px;">languages</p>
      <p style="color:#8a7070;margin-top:2px;font-size:11px;">Python · Java · JavaScript</p>
      <p style="margin-top:8px;color:#7a3f60;font-size:11px;">frameworks</p>
      <p style="color:#8a7070;margin-top:2px;font-size:11px;">React · React Native · Redux · Tailwind CSS</p>
      <p style="margin-top:8px;color:#7a3f60;font-size:11px;">cybersecurity</p>
      <p style="color:#8a7070;margin-top:2px;font-size:11px;">Nmap · Metasploit · Burp Suite · Wazuh · Security Onion · Kali Linux · Wireshark</p>
      <p style="margin-top:8px;color:#7a3f60;font-size:11px;">ml/ds</p>
      <p style="color:#8a7070;margin-top:2px;font-size:11px;">Scikit-Learn · Pandas · NumPy · TensorFlow (basics)</p>
      <p style="margin-top:8px;color:#7a3f60;font-size:11px;">other</p>
      <p style="color:#8a7070;margin-top:2px;font-size:11px;">GitHub · Agile · Swagger · Power BI · Figma</p>
      <p style="margin-top:8px;color:#7a3f60;font-size:11px;">spoken languages</p>
      <p style="color:#8a7070;margin-top:2px;font-size:11px;">Fluent in English · French · Arabic</p>
      <div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:7px;">
        <span style="font-size:9px;padding:2px 7px;border:1px solid #c4aeb8;color:#7a3f60;background:#fbeef4;">React</span>
        <span style="font-size:9px;padding:2px 7px;border:1px solid #c4aeb8;color:#7a3f60;background:#fbeef4;">Python</span>
        <span style="font-size:9px;padding:2px 7px;border:1px solid #c4aeb8;color:#7a3f60;background:#fbeef4;">Nmap</span>
        <span style="font-size:9px;padding:2px 7px;border:1px solid #c4aeb8;color:#7a3f60;background:#fbeef4;">Wireshark</span>
        <span style="font-size:9px;padding:2px 7px;border:1px solid #c4aeb8;color:#7a3f60;background:#fbeef4;">Pandas</span>
        <span style="font-size:9px;padding:2px 7px;border:1px solid #c4aeb8;color:#7a3f60;background:#fbeef4;">TensorFlow</span>
      </div>
    `,
  },

  contact: {
    title: 'contact',
    html: `
      <h3 style="font-family:'PPEditorialOld-Italic',cursive;color:#7a3f60;font-size:22px;margin-bottom:5px;">✦ reach me</h3>
      <div style="text-align:center;color:#c4aeb8;font-size:10px;letter-spacing:3px;padding:2px 0;margin:3px 0;">✦ ─ ✦ ─ ✦ ─ ✦ ─ ✦ ─ ✦</div>
      <p style="font-size:11px;"><span style="color:#7a3f60;">email</span>&nbsp;&nbsp; <span style="color:#6a7a9a;">debbagh.aya@gmail.com</span></p>
      <p style="margin-top:6px;font-size:11px;"><span style="color:#7a3f60;">github</span>&nbsp; <span style="color:#6a7a9a;">github.com/ayadebbagh</span></p>
      <p style="margin-top:6px;font-size:11px;"><span style="color:#7a3f60;">linkedin</span>&nbsp; <span style="color:#6a7a9a;">linkedin.com/in/ayadebbagh/</span></p>
      <p style="margin-top:10px;color:#c0b0b0;font-size:10px;">pgp key available on request ✦</p>
    `,
  },

  'homelab-ir': {
    title: 'homelab-ir',
    html: `
      <h3 style="font-family:'PPEditorialOld-Italic',cursive;color:#7a3f60;font-size:22px;margin-bottom:5px;">✦ Cybersecurity Homelab & Incident Response</h3>
      <div style="text-align:center;color:#c4aeb8;font-size:10px;letter-spacing:3px;padding:2px 0;margin:3px 0;">✦ ─ ✦ ─ ✦ ─ ✦ ─ ✦ ─ ✦</div>
      <p style="font-size:11px;"><span style="color:#7a3f60;">stack</span>&nbsp; <span style="color:#4a7a6a;">VMWare · Active Directory · Linux/Windows Servers · Wazuh · Security Onion</span></p>
      <p style="margin-top:8px;color:#8a7070;line-height:1.7;font-size:11px;">Built an enterprise homelab with virtualized infrastructure and SIEM tooling to simulate realistic blue team workflows.</p>
      <p style="color:#8a7070;line-height:1.7;font-size:11px;">Executed phishing, brute force, and reverse-shell attack scenarios, then authored detections and incident response playbooks.</p>
      <p style="color:#8a7070;line-height:1.7;font-size:11px;">Documented workflows with scripts, dashboards, and reports to keep the environment reproducible and presentation-ready.</p>
      <div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:7px;">
        <span style="font-size:9px;padding:2px 7px;border:1px solid #c4aeb8;color:#7a3f60;background:#fbeef4;">Wazuh</span>
        <span style="font-size:9px;padding:2px 7px;border:1px solid #c4aeb8;color:#7a3f60;background:#fbeef4;">Security Onion</span>
        <span style="font-size:9px;padding:2px 7px;border:1px solid #c4aeb8;color:#7a3f60;background:#fbeef4;">IR Playbooks</span>
        <span style="font-size:9px;padding:2px 7px;border:1px solid #c4aeb8;color:#7a3f60;background:#fbeef4;">Active Directory</span>
      </div>
    `,
  },

  'ctf-writeups': {
    title: 'ctf-writeups',
    html: `
      <h3 style="font-family:'PPEditorialOld-Italic',cursive;color:#7a3f60;font-size:22px;margin-bottom:5px;">✦ CTF & Wargame Writeups</h3>
      <div style="text-align:center;color:#c4aeb8;font-size:10px;letter-spacing:3px;padding:2px 0;margin:3px 0;">✦ ─ ✦ ─ ✦ ─ ✦ ─ ✦ ─ ✦</div>
      <p style="font-size:11px;"><span style="color:#7a3f60;">platforms</span>&nbsp; <span style="color:#4a7a6a;">HackTheBox · PicoCTF · OverTheWire</span></p>
      <p style="margin-top:8px;color:#8a7070;line-height:1.7;font-size:11px;">Solved challenge tracks and published technical, step-by-step writeups with clear methodology and reproducible commands.</p>
      <p style="color:#8a7070;line-height:1.7;font-size:11px;">Focused on privilege escalation, web exploitation, cryptography, and reverse engineering across multiple environments.</p>
      <p style="color:#8a7070;line-height:1.7;font-size:11px;">Used writeups to teach others and highlight structured cybersecurity problem-solving.</p>
      <div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:7px;">
        <span style="font-size:9px;padding:2px 7px;border:1px solid #c4aeb8;color:#7a3f60;background:#fbeef4;">HackTheBox</span>
        <span style="font-size:9px;padding:2px 7px;border:1px solid #c4aeb8;color:#7a3f60;background:#fbeef4;">PicoCTF</span>
        <span style="font-size:9px;padding:2px 7px;border:1px solid #c4aeb8;color:#7a3f60;background:#fbeef4;">OverTheWire</span>
        <span style="font-size:9px;padding:2px 7px;border:1px solid #c4aeb8;color:#7a3f60;background:#fbeef4;">Writeups</span>
      </div>
    `,
  },

  'diabetes-prediction': {
    title: 'diabetes-prediction',
    html: `
      <h3 style="font-family:'PPEditorialOld-Italic',cursive;color:#7a3f60;font-size:22px;margin-bottom:5px;">✦ Diabetes Prediction (ML)</h3>
      <div style="text-align:center;color:#c4aeb8;font-size:10px;letter-spacing:3px;padding:2px 0;margin:3px 0;">✦ ─ ✦ ─ ✦ ─ ✦ ─ ✦ ─ ✦</div>
      <p style="font-size:11px;"><span style="color:#7a3f60;">stack</span>&nbsp; <span style="color:#4a7a6a;">Python · Pandas · Scikit-Learn · NumPy</span></p>
      <p style="font-size:11px;"><span style="color:#7a3f60;">result</span>&nbsp; <span style="color:#4a7a6a;">97% model accuracy</span></p>
      <p style="margin-top:8px;color:#8a7070;line-height:1.7;font-size:11px;">Built a diabetes prediction model and documented preprocessing, feature engineering, and evaluation decisions end-to-end.</p>
      <p style="color:#8a7070;line-height:1.7;font-size:11px;">Created visualizations to explain predictions and communicate findings to non-technical stakeholders.</p>
      <p style="color:#8a7070;line-height:1.7;font-size:11px;">Kaggle link available in resume/portfolio links.</p>
      <div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:7px;">
        <span style="font-size:9px;padding:2px 7px;border:1px solid #c4aeb8;color:#7a3f60;background:#fbeef4;">Scikit-Learn</span>
        <span style="font-size:9px;padding:2px 7px;border:1px solid #c4aeb8;color:#7a3f60;background:#fbeef4;">Pandas</span>
        <span style="font-size:9px;padding:2px 7px;border:1px solid #c4aeb8;color:#7a3f60;background:#fbeef4;">NumPy</span>
        <span style="font-size:9px;padding:2px 7px;border:1px solid #c4aeb8;color:#7a3f60;background:#fbeef4;">Data Viz</span>
      </div>
    `,
  },

  promptshield: {
    title: 'promptshield',
    html: `
      <h3 style="font-family:'PPEditorialOld-Italic',cursive;color:#7a3f60;font-size:22px;margin-bottom:5px;">✦ PromptShield: LLM Prompt Injection Firewall</h3>
      <div style="text-align:center;color:#c4aeb8;font-size:10px;letter-spacing:3px;padding:2px 0;margin:3px 0;">✦ ─ ✦ ─ ✦ ─ ✦ ─ ✦ ─ ✦</div>
      <p style="font-size:11px;"><span style="color:#7a3f60;">stack</span>&nbsp; <span style="color:#4a7a6a;">Python · FastAPI · PyTorch · HuggingFace Transformers · DistilBERT · scikit-learn</span></p>
      <p style="margin-top:8px;color:#8a7070;line-height:1.7;font-size:11px;">Built an ML-powered firewall that intercepts prompts before they reach an LLM and classifies injection, jailbreak, and PII-risk behavior.</p>
      <p style="color:#8a7070;line-height:1.7;font-size:11px;">Combined regex detection across 10+ attack categories with a fine-tuned DistilBERT model trained on ~5,800 labeled examples.</p>
      <p style="color:#8a7070;line-height:1.7;font-size:11px;">Implemented a policy engine returning allow/rewrite/redact/block outcomes with sub-50ms latency and validated via a 34-test end-to-end suite.</p>
      <div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:7px;">
        <span style="font-size:9px;padding:2px 7px;border:1px solid #c4aeb8;color:#7a3f60;background:#fbeef4;">FastAPI</span>
        <span style="font-size:9px;padding:2px 7px;border:1px solid #c4aeb8;color:#7a3f60;background:#fbeef4;">DistilBERT</span>
        <span style="font-size:9px;padding:2px 7px;border:1px solid #c4aeb8;color:#7a3f60;background:#fbeef4;">PyTorch</span>
        <span style="font-size:9px;padding:2px 7px;border:1px solid #c4aeb8;color:#7a3f60;background:#fbeef4;">Prompt Security</span>
      </div>
    `,
  },

  cybersci: {
    title: 'Cybersci',
    html: `
      <h3 style="font-family:'PPEditorialOld-Italic',cursive;color:#7a3f60;font-size:22px;margin-bottom:5px;">✦ Cybersci</h3>
      <div style="text-align:center;color:#c4aeb8;font-size:10px;letter-spacing:3px;padding:2px 0;margin:3px 0;">✦ ─ ✦ ─ ✦ ─ ✦ ─ ✦ ─ ✦</div>
      <p style="color:#8a7070;line-height:1.7;font-size:11px;">I competed in the regional Cybersci competition in Ottawa after only two months of being involved in cybersecurity.</p>
      <p style="color:#8a7070;line-height:1.7;font-size:11px;">I brought together a team of 10 people, we trained for about a month, and we finished 6th overall. For such a short prep window, I am proud of what we built as a team.</p>
      <p style="font-size:11px;margin-top:8px;"><span style="color:#7a3f60;">highlights</span>&nbsp; <span style="color:#4a7a6a;">Ottawa regional · team of 10 · 6th place</span></p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:9px;">
        <img src="${cybersciImg1}" alt="Cybersci team photo 1" style="width:100%;height:120px;object-fit:cover;border:1px solid #c4aeb8;background:#fff9fc;" />
        <img src="${cybersciImg2}" alt="Cybersci team photo 2" style="width:100%;height:120px;object-fit:cover;border:1px solid #c4aeb8;background:#fff9fc;" />
      </div>
    `,
  },

  'ieeexhtb-ctf': {
    title: 'IEEExHackTheBox CTF',
    html: `
      <h3 style="font-family:'PPEditorialOld-Italic',cursive;color:#7a3f60;font-size:22px;margin-bottom:5px;">✦ IEEExHackTheBox CTF</h3>
      <div style="text-align:center;color:#c4aeb8;font-size:10px;letter-spacing:3px;padding:2px 0;margin:3px 0;">✦ ─ ✦ ─ ✦ ─ ✦ ─ ✦ ─ ✦</div>
      <p style="color:#8a7070;line-height:1.7;font-size:11px;">I co-hosted my first CTF with Daniel Kisenko in collaboration with IEEE uOttawa Student Branch and Hack The Box.</p>
      <p style="color:#8a7070;line-height:1.7;font-size:11px;">The event came together through the hard work of Floyd Haynes and Joe Gallo, and we had 50+ participants show up to learn, compete, and challenge themselves in cybersecurity.</p>
      <p style="color:#8a7070;line-height:1.7;font-size:11px;">Seeing that level of energy and engagement made me even more motivated to keep building community-focused security events.</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:9px;">
        <img src="${ieeexhtbCtfImg1}" alt="IEEE x Hack The Box CTF photo 1" style="width:100%;height:120px;object-fit:cover;border:1px solid #c4aeb8;background:#fff9fc;" />
        <img src="${ieeexhtbCtfImg2}" alt="IEEE x Hack The Box CTF photo 2" style="width:100%;height:120px;object-fit:cover;border:1px solid #c4aeb8;background:#fff9fc;" />
      </div>
    `,
  },

  'lockpicking-workshop': {
    title: 'Lockpicking workshop',
    html: `
      <h3 style="font-family:'PPEditorialOld-Italic',cursive;color:#7a3f60;font-size:22px;margin-bottom:5px;">✦ Lockpicking workshop</h3>
      <div style="text-align:center;color:#c4aeb8;font-size:10px;letter-spacing:3px;padding:2px 0;margin:3px 0;">✦ ─ ✦ ─ ✦ ─ ✦ ─ ✦ ─ ✦</div>
      <p style="color:#8a7070;line-height:1.7;font-size:11px;">I helped host a lock-picking workshop in partnership with TOOOL (The Open Organisation of Lockpickers).</p>
      <p style="color:#8a7070;line-height:1.7;font-size:11px;">Huge thanks to Cameron and his team for teaching participants the mechanics, ethics, and fun behind lock-picking in a hands-on setting.</p>
      <p style="color:#8a7070;line-height:1.7;font-size:11px;">The turnout and feedback were great, and we are planning more practical security workshops through IEEE uOttawa Student Branch.</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:9px;">
        <img src="${lockpickingImg1}" alt="Lockpicking workshop photo 1" style="width:100%;height:120px;object-fit:cover;border:1px solid #c4aeb8;background:#fff9fc;" />
        <img src="${lockpickingImg2}" alt="Lockpicking workshop photo 2" style="width:100%;height:120px;object-fit:cover;border:1px solid #c4aeb8;background:#fff9fc;" />
      </div>
    `,
  },

  'bsides-2025': {
    title: 'Bsides 2025',
    html: `
      <h3 style="font-family:'PPEditorialOld-Italic',cursive;color:#7a3f60;font-size:22px;margin-bottom:5px;">✦ Bsides 2025</h3>
      <div style="text-align:center;color:#c4aeb8;font-size:10px;letter-spacing:3px;padding:2px 0;margin:3px 0;">✦ ─ ✦ ─ ✦ ─ ✦ ─ ✦ ─ ✦</div>
      <p style="color:#8a7070;line-height:1.7;font-size:11px;">At BSides, I connected with passionate cybersecurity professionals across offensive security, DFIR, threat detection, and cloud security.</p>
      <p style="color:#8a7070;line-height:1.7;font-size:11px;">I had meaningful conversations about different career paths in the field, attended excellent talks, and spent a lot of time in hands-on workshops, especially lockpicking.</p>
      <p style="color:#8a7070;line-height:1.7;font-size:11px;">The experience was deeply inspiring and pushed me to keep going deeper in cybersecurity by learning directly from practitioners who live this work every day.</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:9px;">
        <img src="${bsides2025Img1}" alt="BSides 2025 photo 1" style="width:100%;height:120px;object-fit:cover;border:1px solid #c4aeb8;background:#fff9fc;" />
        <img src="${bsides2025Img2}" alt="BSides 2025 photo 2" style="width:100%;height:120px;object-fit:cover;border:1px solid #c4aeb8;background:#fff9fc;" />
      </div>
    `,
  },
};

// ── virtual filesystem ──
// Add projects here — update ls[], files{}, dirs{} in each dir
export const filesystem = {
  root: {
    ls: ['about.txt', 'projects/', 'fun stuff/', 'skills.sh', 'contact'],
    files: {
      'cat about.txt': { open: 'about' },
      'cat skills.sh': { open: 'skills' },
      'cat contact':   { open: 'contact' },
    },
    dirs: {
      'cd projects/': 'projects',
      'cd projects':  'projects',
      'cd fun stuff/': 'fun-stuff',
      'cd fun stuff':  'fun-stuff',
    },
  },
  projects: {
    ls: ['homelab-ir', 'ctf-writeups', 'diabetes-prediction', 'promptshield'],
    files: {
      'cat homelab-ir':           { open: 'homelab-ir' },
      'cat ctf-writeups':         { open: 'ctf-writeups' },
      'cat diabetes-prediction':  { open: 'diabetes-prediction' },
      'cat promptshield':         { open: 'promptshield' },
    },
    dirs: {
      'cd ..':    'root',
      'cd ~/aya': 'root',
    },
  },
  'fun-stuff': {
    ls: ['Cybersci', 'IEEExHackTheBox CTF', 'Lockpicking workshop', 'Bsides 2025'],
    files: {
      'cat cybersci':                { open: 'cybersci' },
      'cat ieeexhackthebox ctf':     { open: 'ieeexhtb-ctf', title: 'IEEExHackTheBox CTF' },
      'cat lockpicking workshop':    { open: 'lockpicking-workshop', title: 'Lockpicking workshop' },
      'cat bsides 2025':             { open: 'bsides-2025', title: 'Bsides 2025' },
    },
    dirs: {
      'cd ..':    'root',
      'cd ~/aya': 'root',
    },
  },
};

export const pathNames = {
  root:     '~/aya',
  projects: '~/aya/projects',
  'fun-stuff': '~/aya/fun stuff',
};
