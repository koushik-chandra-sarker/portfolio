import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '../shared/SectionHeader';
import { skills } from '../../data/portfolio';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const skillsRef = useRef(null);

  useGSAP(() => {
    gsap.from('.skill-card', {
      y: 40,
      opacity: 0,
      stagger: {
        each: 0.08,
        from: 'start',
      },
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.skills__grid',
        start: 'top 85%',
      },
    });
  }, { scope: skillsRef });

  const getSizeClass = (size) => {
    switch (size) {
      case 'large': return 'skill-card--large';
      case 'medium': return 'skill-card--medium';
      default: return 'skill-card--small';
    }
  };

  return (
    <section className="skills section" id="skills" ref={skillsRef}>
      <div className="container">
        <SectionHeader
          number="02"
          title="Skills & Technologies"
          subtitle="Tools and technologies I work with"
        />

        <div className="skills__grid">
          {skills.map((group, i) => (
            <div className={`skill-card glass ${getSizeClass(group.size)}`} key={i}>
              <div className="skill-card__header">
                <span className="skill-card__icon">{group.icon}</span>
                <h3 className="skill-card__title">{group.category}</h3>
              </div>
              <div className="skill-card__items">
                {group.items.map((item, j) => (
                  <span className="skill-tag" key={j}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
