import { forwardRef } from 'react';

/**
 * Button — matches the mobile app's pill-shaped gradient primary button
 * (see "Sign in", "Create account", "Get Started" on mobile onboarding/auth
 * screens) plus secondary/ghost/danger variants used for "Cancel" and
 * "End call".
 */
const VARIANT_CLASSES = {
  primary:
    'bg-nkwa-gradient text-white shadow-card hover:shadow-card-lg active:scale-[0.98]',
  secondary:
    'bg-nkwa-100 text-nkwa-700 hover:bg-nkwa-200 active:scale-[0.98]',
  ghost:
    'bg-transparent text-nkwa-600 hover:bg-nkwa-50 active:scale-[0.98]',
  danger:
    'bg-severity-criticalBg text-severity-critical hover:bg-[#FBDCE1] active:scale-[0.98]',
  dangerSolid:
    'bg-severity-critical text-white shadow-card hover:brightness-105 active:scale-[0.98]',
  outline:
    'bg-white text-ink-700 border border-nkwa-100 hover:border-nkwa-300 active:scale-[0.98]',
};

const SIZE_CLASSES = {
  sm: 'h-9 px-4 text-sm gap-1.5',
  md: 'h-12 px-6 text-[15px] gap-2',
  lg: 'h-14 px-8 text-base gap-2',
};

const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    disabled = false,
    type = 'button',
    className = '',
    icon: Icon,
    iconPosition = 'right',
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center rounded-full font-semibold',
        'transition-all duration-150 ease-out',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-[1.1em] h-[1.1em]" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-[1.1em] h-[1.1em]" />}
    </button>
  );
});

export default Button;
