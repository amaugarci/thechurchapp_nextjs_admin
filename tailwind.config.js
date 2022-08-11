module.exports = {
  corePlugins: {
    preflight: false
  },
  darkMode: 'class',
  mode: 'jit',
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
    './src/forms/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/sections/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
    transitionDuration: {
      DEFAULT: '300ms'
    },
    screens: {
      xs: { min: '0px' },
      sm: { min: '768px' },
      md: { min: '992px' },
      lg: { min: '1200px' },
      xl: { min: '1400px' }
    }
  },
  plugins: []
};
