import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import ThemeToggle from '../shared/ThemeToggle';
import { navLinks } from '../../data/portfolio';
import './Navbar.css';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar({ theme, toggleTheme }) {
  const navRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useGSAP(() => {
    gsap.from('.nav-link', {
      y: -20,
      opacity: 0,
      stagger: 0.08,
      duration: 0.6,
      ease: 'power3.out',
      delay: 0.3,
    });
    gsap.from('.nav-logo', {
      x: -30,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
      delay: 0.1,
    });
  }, { scope: navRef });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((l) => document.getElementById(l.id));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav ref={navRef} className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="main-navbar">
      <div className="navbar__container container">
        <a className="nav-logo" href="#home" onClick={() => handleNavClick('home')}>
          <span className="nav-logo__bracket">&lt;</span>
          <span className="nav-logo__name">TheKoushik</span>
          <span className="nav-logo__bracket"> /&gt;</span>
        </a>

        <div className={`navbar__links ${mobileOpen ? 'navbar__links--open' : ''}`}>
          {navLinks.map((link) => (
            <a
              key={link.id}
              className={`nav-link ${activeSection === link.id ? 'nav-link--active' : ''}`}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.id);
              }}
            >
              {link.label}
            </a>
          ))}
          <div className="navbar__theme-mobile">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
        </div>

        <div className="navbar__actions">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <button
            className="navbar__hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            id="hamburger-btn"
          >
            {mobileOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && <div className="navbar__backdrop" onClick={() => setMobileOpen(false)} />}
    </nav>
  );
}
