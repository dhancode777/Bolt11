import { Moon, Sun } from 'lucide-react';

export function ThemeToggle({
  theme,
  onToggle,
}: {
  theme: 'dark' | 'light';
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative h-10 w-10 flex items-center justify-center rounded-full glass text-content hover:text-heading hover:border-violet-glow/40 transition-all"
    >
      <Sun
        size={17}
        className={`absolute transition-all duration-500 ${
          theme === 'dark' ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
        }`}
      />
      <Moon
        size={17}
        className={`absolute transition-all duration-500 ${
          theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
        }`}
      />
    </button>
  );
}
