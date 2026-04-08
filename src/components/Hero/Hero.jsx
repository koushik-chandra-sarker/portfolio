import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { FiGithub, FiLinkedin, FiMail, FiPhone, FiDownload, FiChevronDown } from 'react-icons/fi';
import ParticleBackground from '../shared/ParticleBackground';
import { personalInfo } from '../../data/portfolio';
import profileImg from '../../assets/profile.png';
import './Hero.css';

export default function Hero() {
  const heroRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const currentRole = personalInfo.roles[roleIndex];
    let timeout;

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length - 1));
        }, 40);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % personalInfo.roles.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  useGSAP(() => {
    // Set initial hidden states
    gsap.set('.hero__greeting', { x: -60, opacity: 0 });
    gsap.set('.hero__name', { x: -80, opacity: 0 });
    gsap.set('.hero__role-wrapper', { x: -50, opacity: 0 });
    gsap.set('.hero__tagline', { x: -40, opacity: 0 });
    gsap.set('.hero__cta', { y: 30, opacity: 0 });
    gsap.set('.hero__social-link', { scale: 0, opacity: 0 });
    gsap.set('.hero__phone', { x: 100, opacity: 0, scale: 0.85 });
    gsap.set('.hero__phone-glow', { scale: 0.5, opacity: 0 });
    gsap.set('.hero__floating-badge', { scale: 0, opacity: 0 });
    gsap.set('.hero__scroll-indicator', { y: -20, opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Staggered text entrance from left
    tl.to('.hero__greeting', { x: 0, opacity: 1, duration: 0.7 })
      .to('.hero__name', { x: 0, opacity: 1, duration: 0.9, ease: 'power4.out' }, '-=0.4')
      .to('.hero__role-wrapper', { x: 0, opacity: 1, duration: 0.7 }, '-=0.5')
      .to('.hero__tagline', { x: 0, opacity: 1, duration: 0.6 }, '-=0.4')
      .to('.hero__cta', { y: 0, opacity: 1, stagger: 0.15, duration: 0.6 }, '-=0.3')
      .to('.hero__social-link', {
        scale: 1,
        opacity: 1,
        stagger: 0.08,
        duration: 0.4,
        ease: 'back.out(1.7)',
      }, '-=0.3');

    // Phone entrance from right with scale
    tl.to('.hero__phone', {
      x: 0,
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'power4.out',
    }, '-=1.2');

    // Phone glow pulse in
    tl.to('.hero__phone-glow', {
      scale: 1,
      opacity: 0.12,
      duration: 1,
      ease: 'power2.out',
    }, '-=0.8');

    // Floating badges pop in with stagger
    tl.to('.hero__floating-badge', {
      scale: 1,
      opacity: 1,
      stagger: 0.12,
      duration: 0.5,
      ease: 'back.out(2)',
    }, '-=0.6');

    // Scroll indicator
    tl.to('.hero__scroll-indicator', { y: 0, opacity: 1, duration: 0.6 }, '-=0.2');

    // ── Continuous animations (start after entrance) ──
    tl.call(() => {
      // Gentle floating for phone
      gsap.to('.hero__phone', {
        y: -14,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Floating badges hover independently
      gsap.to('.hero__floating-badge--java', {
        y: -10,
        x: 5,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.hero__floating-badge--react', {
        y: 8,
        x: -6,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5,
      });

      gsap.to('.hero__floating-badge--spring', {
        y: -8,
        x: -5,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.3,
      });

      gsap.to('.hero__floating-badge--cloud', {
        y: 10,
        x: 4,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.7,
      });
    });

    // Animate gradient orbs slowly (these don't need entrance)
    gsap.to('.hero__orb--1', {
      x: 30,
      y: 20,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    gsap.to('.hero__orb--2', {
      x: -25,
      y: -15,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    gsap.to('.hero__orb--3', {
      x: -20,
      y: 25,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // Bouncing scroll indicator
    gsap.to('.hero__scroll-indicator', {
      y: 10,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      delay: 2,
    });
  }, { scope: heroRef });

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero section" id="home" ref={heroRef}>
      <ParticleBackground />

      {/* Floating gradient orbs */}
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />
      <div className="hero__orb hero__orb--3" />

      <div className="hero__content container">
        {/* Left: Text content */}
        <div className="hero__text">
          <p className="hero__greeting">Hello, I'm</p>
          <h1 className="hero__name gradient-text">{personalInfo.name}</h1>
          <div className="hero__role-wrapper">
            <span className="hero__role-prefix">I'm a </span>
            <span className="hero__role">{displayText}</span>
            <span className="hero__cursor">|</span>
          </div>
          <p className="hero__tagline">{personalInfo.tagline}</p>

          <div className="hero__ctas">
            <a
              href={personalInfo.resumeFile}
              download
              className="hero__cta hero__cta--primary"
              id="download-resume-btn"
            >
              <FiDownload />
              Download Resume
            </a>
            <button
              className="hero__cta hero__cta--secondary"
              onClick={scrollToContact}
              id="get-in-touch-btn"
            >
              Get in Touch
            </button>
          </div>

          <div className="hero__socials">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__social-link"
              aria-label="GitHub"
            >
              <FiGithub size={20} />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__social-link"
              aria-label="LinkedIn"
            >
              <FiLinkedin size={20} />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="hero__social-link"
              aria-label="Email"
            >
              <FiMail size={20} />
            </a>
            <a
              href={`tel:${personalInfo.phone}`}
              className="hero__social-link"
              aria-label="Phone"
            >
              <FiPhone size={20} />
            </a>
          </div>
        </div>

        {/* Right: Phone mockup with profile */}
        <div className="hero__visual">
          <div className="hero__phone-wrapper">
            <div className="hero__phone-glow" />
            <div className="hero__phone">
              <div className="hero__phone-notch" />
              <div className="hero__phone-screen">
                <img src={profileImg} alt={personalInfo.name} />
              </div>
            </div>

            {/* Floating tech badges */}
            <div className="hero__floating-badge hero__floating-badge--java">
              <span className="hero__floating-badge-icon">☕</span>
              Java
            </div>
            <div className="hero__floating-badge hero__floating-badge--react">
              <span className="hero__floating-badge-icon">⚛️</span>
              React
            </div>
            <div className="hero__floating-badge hero__floating-badge--spring">
              <span className="hero__floating-badge-icon">🍃</span>
              Spring Boot
            </div>
            <div className="hero__floating-badge hero__floating-badge--cloud">
              <span className="hero__floating-badge-icon">☁️</span>
              Cloud
            </div>
          </div>
        </div>
      </div>

      <div className="hero__scroll-indicator">
        <span>Scroll down</span>
        <FiChevronDown size={18} />
      </div>
    </section>
  );
}
