/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono:   ['"Share Tech Mono"', 'monospace'],
        script: ['"PPEditorialOld-Italic"', 'cursive'],
      },
      colors: {
        desktop:   '#EEDFD2',   // Almond Cream
        taskbar:   '#E8D5C5',   // slightly darker Almond Cream
        tbar:      '#270722',   // Midnight Violet title bar
        border:    '#D897B8',   // Pink Mist
        termbg:    '#F6EEE6',   // light terminal bg
        winbg:     '#F2E8DC',   // window bg
        pink:      '#270722',   // Midnight Violet
        pinklt:    '#D897B8',   // Pink Mist
        pinkbg:    '#F5EBF2',   // light pink bg
        cursor:    '#D897B8',   // Pink Mist cursor
        tgreen:    '#7A9A50',   // darker Tea Green
        tblue:     '#63768D',   // Slate Grey
        tmuted:    '#B0A8B8',   // muted
        ttext:     '#4A3858',   // dark violet text
        tdim:      '#8A8090',   // dimmed
        tstar:     '#D897B8',   // Pink Mist
        twarn:     '#a07840',   // amber warning
        butterfly: '#34092E',   // deep dark purple for ASCII art
        closebtn:  '#c96060',   // close button red
      },
      animation: {
        blink:  'blink 1s step-end infinite',
        blink2: 'blink 2s step-end infinite',
      },
      keyframes: {
        blink: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0 } },
      },
    },
  },
  plugins: [],
};


