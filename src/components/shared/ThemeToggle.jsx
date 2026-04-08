import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { FiSun, FiMoon } from 'react-icons/fi';
import './ThemeToggle.css';

export default function ThemeToggle({ theme, toggleTheme }) {
  const btnRef = useRef(null);

  const handleClick = () => {
    gsap.to(btnRef.current, {
      rotate: '+=360',
      duration: 0.5,
      ease: 'power2.inOut',
    });
    toggleTheme();
  };

  return (
    <button
      ref={btnRef}
      className="theme-toggle"
      onClick={handleClick}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      id="theme-toggle-btn"
    >
      {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
    </button>
  );
}
