import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '../shared/SectionHeader';
import { summary, stats } from '../../data/portfolio';
import profileImg from '../../assets/profile.png';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

function AnimatedCounter({ value, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: value,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => setCount(Math.round(obj.val)),
          });
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="stat-card__value gradient-text">
      {count}{suffix}
    </span>
  );
}

export default function About() {
  const aboutRef = useRef(null);

  useGSAP(() => {
    gsap.from('.about__image-wrapper', {
      clipPath: 'inset(0 100% 0 0)',
      duration: 1.2,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: '.about__image-wrapper',
        start: 'top 80%',
      },
    });

    gsap.from('.about__text p', {
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about__text',
        start: 'top 80%',
      },
    });

    gsap.from('.stat-card', {
      y: 40,
      opacity: 0,
      stagger: 0.12,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about__stats',
        start: 'top 85%',
      },
    });
  }, { scope: aboutRef });

  return (
    <section className="about section" id="about" ref={aboutRef}>
      <div className="container">
        <SectionHeader number="01" title="About Me" subtitle="Get to know me better" />

        <div className="about__grid">
          <div className="about__image-wrapper">
            <div className="about__image-glow" />
            <img src={profileImg} alt="Koushik Chandra Sarker" className="about__image" />
            <div className="about__image-border" />
          </div>

          <div className="about__text">
            <p className="about__intro">
              I'm a <strong>Full-Stack Software Engineer</strong> with over{' '}
              <strong className="gradient-text">5 years of experience</strong> building
              enterprise-grade applications. Specializing in Java, Spring Boot, and microservices
              architecture, I craft scalable solutions that power financial platforms serving
              thousands of users.
            </p>
            <p>
              {summary[2]} {summary[3]}
            </p>
            <p>
              {summary[4]} {summary[5]}
            </p>
          </div>
        </div>

        <div className="about__stats">
          {stats.map((stat, i) => (
            <div className="stat-card glass" key={i}>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <span className="stat-card__label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
