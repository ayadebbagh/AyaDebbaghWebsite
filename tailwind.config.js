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
        desktop:   '#ede6dd',
        taskbar:   '#e2d6cc',
        tbar:      '#e0d0cc',
        border:    '#c4aeb8',
        termbg:    '#faf4f0',
        winbg:     '#f5edea',
        pink:      '#7a3f60',
        pinklt:    '#c4a4b4',
        pinkbg:    '#fbeef4',
        cursor:    '#b4749c',
        tgreen:    '#4a7a6a',
        tblue:     '#6a7a9a',
        tmuted:    '#b5a8a8',
        ttext:     '#7a5c6a',
        tdim:      '#9a8080',
        tstar:     '#b4749c',
        twarn:     '#a07840',
        butterfly: '#9a6080',
        closebtn:  '#c96060',
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


