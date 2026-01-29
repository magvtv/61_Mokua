/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    important: '#root',
    theme: {
      extend: {
        fontFamily: {
          'playfair': ['"Playfair Display"', 'serif'],
          'inter': ['Inter', 'sans-serif'],
        },
        colors: {
          primary: {
            50: '#f0f9fa',
            100: '#d9f2f4',
            200: '#b8e6ea',
            300: '#87d3db',
            400: '#4fb8c4',
            500: '#2e7d8a',
            600: '#296b76',
            700: '#275862',
            800: '#274a52',
            900: '#243f46',
          },
          secondary: {
            50: '#fff8e1',
            100: '#ffecb3',
            200: '#ffe082',
            300: '#ffd54f',
            400: '#ffca28',
            500: '#ff8f00',
            600: '#ff8f00',
            700: '#ff6f00',
            800: '#e65100',
            900: '#bf360c',
          },
        },
      },
    },
    plugins: [],
  };
  