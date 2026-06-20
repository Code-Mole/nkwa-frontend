/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Core brand purple ramp — sampled from the mobile app's header
        // gradients (deep violet to lighter purple) and primary buttons.
        nkwa: {
          50: '#F6F2FE',
          100: '#EFE6FD',
          200: '#DDCBFB',
          300: '#C4A6F7',
          400: '#A571EF',
          500: '#8B3FE8', // primary brand purple (buttons, active nav)
          600: '#7429DC', // gradient mid
          700: '#6322C8', // gradient header start
          800: '#511BA3',
          900: '#3D1480',
          950: '#240B4D',
        },
        // Page background — the very light lavender behind cards on Home
        surface: {
          DEFAULT: '#FAF8FE',
          card: '#FFFFFF',
          muted: '#F3EEFC',
        },
        // Severity system — used identically across caller app + dashboard
        severity: {
          critical: '#E0445B',     // red — life-threatening
          criticalBg: '#FCE9EC',
          urgent: '#E68A2E',       // amber — urgent, not immediately fatal
          urgentBg: '#FDF0E2',
          nonEmergency: '#2FA86E', // green — non-emergency / resolved
          nonEmergencyBg: '#E5F6ED',
          prank: '#8A8A99',        // grey — de-prioritised prank calls
          prankBg: '#EEEEF2',
        },
        // Service icon badges — pulled from the four emergency service
        // cards on the mobile Home screen
        service: {
          ambulance: '#2FA86E',
          ambulanceBg: '#E1F5EA',
          fire: '#E8772E',
          fireBg: '#FCE6D8',
          police: '#6322C8',
          policeBg: '#EBE1FB',
          sos: '#E0445B',
          sosBg: '#FCE3E7',
        },
        ink: {
          900: '#1A1330', // primary text on light backgrounds
          700: '#433A57',
          500: '#766C8A',
          300: '#A89FBE',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'nkwa-gradient': 'linear-gradient(135deg, #6322C8 0%, #8B3FE8 100%)',
        'nkwa-gradient-vertical': 'linear-gradient(180deg, #6322C8 0%, #8B3FE8 100%)',
        'nkwa-gradient-radial': 'radial-gradient(circle at top right, rgba(255,255,255,0.12), transparent 60%)',
      },
      boxShadow: {
        card: '0 2px 10px rgba(99, 34, 200, 0.08)',
        'card-lg': '0 8px 30px rgba(99, 34, 200, 0.12)',
        glow: '0 0 0 4px rgba(139, 63, 232, 0.15)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      animation: {
        'pulse-ring': 'pulseRing 1.8s ease-out infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.25s ease-out',
      },
      keyframes: {
        pulseRing: {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '70%': { transform: 'scale(1.4)', opacity: '0' },
          '100%': { transform: 'scale(1.4)', opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
