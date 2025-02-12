/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        Blue_Midnight_900: '#00317E',
        Blue_Midnight_800: '#0043A9',
        Blue_Midnight_700: '#1054B7',
        Blue_Midnight_600: '#4D86D4',
        Blue_Midnight_400: '#94BAE9',
        Blue_Midnight_300: '#B0CDF1',
        Blue_Midnight_200: '#4D86D4',
        Blue_Midnight_50: '#F6FAFF',
        BlueBrand_800: '#14327D',
        Bluey_500: '#8CAFBE',
        Blue_Info_500: '#9AC7EB',
        Blue_Info_100: '#EDF7FF',
        Green_Success_500: '#95E077',
        Green_Success_100: '#ECFFE2',
        Red_Error_500: '#EDA4A1',
        Red_Error_100: '#FFE7E6',
        Orange_Peach_800: '#CC4700',
        Gray_Carbon_900: '#000000',
        Gray_Carbon_800: '#444444',
        Gray_Carbon_700: '#666666',
        Gray_Carbon_50: '#F2F2F2',
        Khaki_800: '#6D6D25',
        YellowBrand_800: '#FFBE00',
      },
      dropShadow: {
        'blue': '0 8px 2px rgba(150, 253, 193, 0.582)',
      },
      fontFamily:{
        'RobotoMono':['Roboto Mono', 'monospac', 'sans-serif'],
        'Roboto': ['Roboto', 'sans-serif'],

      },
      

    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

