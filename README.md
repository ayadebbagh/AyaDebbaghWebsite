# aya debbagh — portfolio terminal (React + Tailwind)

## getting started

```bash
npm install
npm start        # dev server at http://localhost:3000
npm run build    # production build -> /build
```

## project structure

```
src/
├── App.jsx                  # root layout: taskbar, canvas, windows, icons
├── index.js                 # React entry point
├── index.css                # Tailwind directives + Google Fonts + scrollbar
├── data.js                  # EDIT THIS: file contents + filesystem
├── assets/
│   ├── aboutme.png
│   ├── contact.png
│   ├── projects.png
│   └── skills.png
├── components/
│   ├── DeskIcon.jsx         # draggable desktop icon (image or glyph)
│   ├── Window.jsx           # draggable window with close button
│   ├── Terminal.jsx         # terminal with keyboard input + filesystem nav
│   └── FileViewer.jsx       # renders HTML from data.js into a window
└── hooks/
    └── useDraggable.js      # shared drag logic
```

## how to customise

### update bio / skills / contact
edit src/data.js -> fileContents. each entry has title and html.

### add a new project
in src/data.js:
1. add to fileContents:
   myproject: { title: 'myproject', html: '<h3>...</h3>' }
2. add to filesystem.projects.ls: [..., 'myproject']
3. add to filesystem.projects.files: { 'cat myproject': { open: 'myproject' } }

### swap an icon image
replace the file in src/assets/ and update the import in App.jsx.

### change colours
all colours are in tailwind.config.js under theme.extend.colors.

## deploying

GitHub Pages:
  npm install -g gh-pages
  add "homepage": "https://yourusername.github.io/repo-name" to package.json
  npm run build && gh-pages -d build

Netlify / Vercel: just point at this folder.

## terminal commands

| command        | what it does               |
|----------------|----------------------------|
| ls             | list current directory     |
| cat [file]     | open file viewer window    |
| cd projects/   | navigate into projects dir |
| cd ..          | go back to root            |
| whoami         | identity                   |
| clear          | clear terminal             |
| stars          | something pretty           |
| help           | show commands              |
