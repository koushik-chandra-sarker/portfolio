import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiMapPin, FiCalendar, FiAward } from 'react-icons/fi';
import SectionHeader from '../shared/SectionHeader';
import { education } from '../../data/portfolio';
import './Education.css';

gsap.registerPlugin(ScrollTrigger);

function CgpaRing({ cgpa, maxCgpa }) {
  const ringRef = useRef(null);
  const [animatedPercent, setAnimatedPercent] = useState(0);
  const percent = (cgpa / maxCgpa) * 100;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: percent,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => setAnimatedPercent(obj.val),
          });
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ringRef.current) observer.observe(ringRef.current);
    return () => observer.disconnect();
  }, [percent]);

  const offset = circumference - (animatedPercent / 100) * circumference;

  return (
    <div className="cgpa-ring" ref={ringRef}>
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="var(--border-color)"
          strokeWidth="8"
        />
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="url(#cgpa-gradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 70 70)"
        />
        <defs>
          <linearGradient id="cgpa-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent-primary)" />
            <stop offset="100%" stopColor="var(--accent-secondary)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="cgpa-ring__label">
        <span className="cgpa-ring__value">{(animatedPercent * maxCgpa / 100).toFixed(2)}</span>
        <span className="cgpa-ring__max">/ {maxCgpa.toFixed(1)}</span>
      </div>
    </div>
  );
}

export default function Education() {
  const eduRef = useRef(null);

  useGSAP(() => {
    gsap.from('.education__card', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.education__card',
        start: 'top 85%',
      },
    });
  }, { scope: eduRef });

  return (
    <section className="education section" id="education" ref={eduRef}>
      <div className="container">
        <SectionHeader
          number="05"
          title="Education"
          subtitle="My academic background"
        />

        <div className="education__card glass">
          <div className="education__content">
            <div className="education__info">
              <div className="education__icon-wrapper">
                <FiAward size={28} />
              </div>
              <h3 className="education__degree">{education.degree}</h3>
              <h4 className="education__university">{education.university}</h4>
              <div className="education__meta">
                <span className="education__meta-item">
                  <FiMapPin size={14} />
                  {education.location}
                </span>
                <span className="education__meta-item">
                  <FiCalendar size={14} />
                  {education.duration}
                </span>
              </div>
            </div>
            <div className="education__cgpa">
              <CgpaRing cgpa={education.cgpa} maxCgpa={education.maxCgpa} />
              <span className="education__cgpa-label">CGPA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
