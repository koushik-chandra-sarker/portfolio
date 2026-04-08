import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SectionHeader.css';

gsap.registerPlugin(ScrollTrigger);

export default function SectionHeader({ number, title, subtitle }) {
  const headerRef = useRef(null);

  useGSAP(() => {
    const el = headerRef.current;
    gsap.from(el.querySelectorAll('.section-header__number, .section-header__title, .section-header__subtitle'), {
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
      },
    });
    gsap.from(el.querySelector('.section-header__line'), {
      scaleX: 0,
      duration: 1,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
      },
    });
  }, { scope: headerRef });

  return (
    <div className="section-header" ref={headerRef}>
      {number && <span className="section-header__number">{number}</span>}
      <h2 className="section-header__title">{title}</h2>
      {subtitle && <p className="section-header__subtitle">{subtitle}</p>}
      <div className="section-header__line"></div>
    </div>
  );
}
