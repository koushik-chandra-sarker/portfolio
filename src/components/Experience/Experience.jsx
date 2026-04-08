import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '../shared/SectionHeader';
import { experiences } from '../../data/portfolio';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

function ExperienceCard({ exp, index, isLeft }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`timeline__item ${isLeft ? 'timeline__item--left' : 'timeline__item--right'}`}>
      <div className="timeline__dot">
        <span className="timeline__dot-inner" />
      </div>
      <div className="timeline__card glass">
        <div className="timeline__card-header">
          <span className="timeline__domain-badge">{exp.domain}</span>
          <span className="timeline__duration">{exp.duration}</span>
        </div>
        <h3 className="timeline__role">{exp.role}</h3>
        <h4 className="timeline__company">{exp.company}</h4>

        <div className="timeline__tech-tags">
          {exp.techStack.map((tech, i) => (
            <span className="skill-tag" key={i}>{tech}</span>
          ))}
        </div>

        <div className={`timeline__responsibilities ${expanded ? 'timeline__responsibilities--expanded' : ''}`}>
          <ul>
            {exp.responsibilities.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>

        {exp.responsibilities.length > 2 && (
          <button
            className="timeline__read-more"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Show Less' : 'Read More'}
          </button>
        )}
      </div>
    </div>
  );
}

export default function Experience() {
  const expRef = useRef(null);

  useGSAP(() => {
    // Timeline line draw
    gsap.from('.timeline__line-fill', {
      scaleY: 0,
      transformOrigin: 'top center',
      ease: 'none',
      scrollTrigger: {
        trigger: '.timeline',
        start: 'top 70%',
        end: 'bottom 70%',
        scrub: 1,
      },
    });

    // Cards slide in
    gsap.utils.toArray('.timeline__item').forEach((item, i) => {
      const isLeft = item.classList.contains('timeline__item--left');
      gsap.from(item.querySelector('.timeline__card'), {
        x: isLeft ? -60 : 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
        },
      });
    });

    // Dot pulse
    gsap.to('.timeline__dot-inner', {
      scale: 1.4,
      opacity: 0.5,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.3,
    });
  }, { scope: expRef });

  return (
    <section className="experience section" id="experience" ref={expRef}>
      <div className="container">
        <SectionHeader
          number="03"
          title="Work Experience"
          subtitle="My professional journey so far"
        />

        <div className="timeline">
          <div className="timeline__line">
            <div className="timeline__line-fill" />
          </div>
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} isLeft={i % 2 === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
