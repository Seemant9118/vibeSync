
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference or localStorage for initial theme
    const isDark = localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDarkMode(isDark);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="bg-white/30 dark:bg-black/20 hover:bg-white/50 dark:hover:bg-black/30 absolute top-4 left-4"
      onClick={toggleTheme}
    >
      {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  );
};

export default ThemeToggle;
