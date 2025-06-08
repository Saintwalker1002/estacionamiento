/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'slide-left-to-right':{
          '0%':{
            transform: 'translateX(3rem)'
          },
          '50%': {
            transform: 'translateX(-2rem)' 
          },
          '100%': {
            transform: 'translateX(0rem)' 
          },  
        },

        'slide-left-to-right2':{
          '10%':{
            transform: 'translateX(3rem)'
          },
          '60%': {
            transform: 'translateX(-2rem)' 
          },
          '100%': {
            transform: 'translateX(0rem)' 
          },  
        },

        'slide-left-to-right3':{
          '10%':{
            transform: 'translateX(3rem)'
          },
          '60%': {
            transform: 'translateX(-2rem)' 
          },
          '100%': {
            transform: 'translateX(0rem)' 
          },  
        },

        'slide-left-to-right4':{
          '30%':{
            transform: 'translateX(3rem)'
          },
          '70%': {
            transform: 'translateX(-2rem)' 
          },
          '100%': {
            transform: 'translateX(0rem)' 
          }, 

        },

        'slide-top':{
          '0%':{
            transform: 'translateY(5rem)',
            opacity: '0%'
          },
          '100%':{
            transform: 'translateY(0rem)',
            opacity: '100%'
          },
        },

        'slide-top2':{
          '0%':{
            transform: 'translateY(5rem)',
            opacity: '0%'
          },
          '100%':{
            transform: 'translateY(0rem)',
            opacity: '100%'
          },
        },

        'slide-top3':{
          '0%':{
            transform: 'translateY(5rem)',
            opacity: '0%'
          },
          '100%':{
            transform: 'translateY(0rem)',
            opacity: '100%'
          },
        },

        'slide-top4':{
          '0%':{
            transform: 'translateY(5rem)',
            opacity: '0%'
          },
          '100%':{
            transform: 'translateY(0rem)',
            opacity: '100%'
          },
        },

        'slide-top5':{
          '0%':{
            transform: 'translateY(4rem)',
            opacity: '0%'
          },
          '100%':{
            transform: 'translateY(0rem)',
            opacity: '100%'
          },
        },
        
      },

      animation:{
        'slide-left-to-right': 'slide-left-to-right 1s ease-in-out',
        'slide-left-to-right2': 'slide-left-to-right2 1s ease-in-out',
        'slide-left-to-right3': 'slide-left-to-right2 1.5s ease-in-out',
        'slide-left-to-right4': 'slide-left-to-right2 2s ease-in-out',
        'slide-top': 'slide-top 0.8s ease-in-out',
        'slide-top2': 'slide-top 1.1s ease-in-out',
        'slide-top3': 'slide-top 1.4s ease-in-out',
        'slide-top4': 'slide-top 1.8s ease-in-out',
        'slide-top5': 'slide-top 1.3s ease-in-out',

      },
      colors: {
        'nav': '#015498',
        'azulboton': '#428DC5',
      },
      
    },
  },
  plugins: [

  ],
}