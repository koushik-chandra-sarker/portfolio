import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiMail, FiPhone, FiGithub, FiLinkedin, FiHeart, FiMapPin } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import SectionHeader from '../shared/SectionHeader';
import { personalInfo } from '../../data/portfolio';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const contactRef = useRef(null);

  // useGSAP(() => {
  //   gsap.from('.contact__info-card', {
  //     y: 40,
  //     opacity: 0,
  //     stagger: 0.15,
  //     duration: 0.8,
  //     ease: 'power3.out',
  //     scrollTrigger: {
  //       trigger: '.contact__info-grid',
  //       start: 'top 85%',
  //     },
  //   });

  //   gsap.from('.contact__cta', {
  //     scale: 0.9,
  //     opacity: 0,
  //     duration: 1,
  //     delay: 0.5,
  //     ease: 'elastic.out(1, 0.5)',
  //     scrollTrigger: {
  //       trigger: '.contact__info-grid',
  //       start: 'top 80%',
  //     },
  //   });
  // }, { scope: contactRef });

  const contactLinks = [
    { 
      icon: <FiMail size={24} />, 
      label: 'Email', 
      value: personalInfo.email, 
      href: `mailto:${personalInfo.email}`,
      desc: 'Send me an email for a quick response'
    },
    { 
      icon: <FiPhone size={24} />, 
      label: 'Phone', 
      value: personalInfo.phone, 
      href: `tel:${personalInfo.phone}`,
      desc: 'Call or text for urgent matters'
    },
    { 
      icon: <FiPhone size={24} />, 
      label: 'WhatsApp', 
      value: `+${personalInfo.whatsapp}`, 
      href: `https://wa.me/${personalInfo.whatsapp}`,
      desc: 'Connect with me on WhatsApp'
    },
    { 
      icon: <FiMapPin size={24} />, 
      label: 'Location', 
      value: personalInfo.location, 
      href: `https://maps.google.com/?q=${personalInfo.location}`,
      desc: 'Based in Dhaka, Bangladesh'
    },
    { 
      icon: <FiGithub size={24} />, 
      label: 'GitHub', 
      value: 'koushik-chandra-sarker', 
      href: personalInfo.github,
      desc: 'Check out my code and contributions'
    },
    { 
      icon: <FiLinkedin size={24} />, 
      label: 'LinkedIn', 
      value: 'koushik-chandra-sarker', 
      href: personalInfo.linkedin,
      desc: 'Let\'s connect professionally'
    },
  ];

  return (
    <section className="contact section" id="contact" ref={contactRef}>
      {/* Floating background orbs */}
      <div className="contact__orb contact__orb--1" />
      <div className="contact__orb contact__orb--2" />

      <div className="container">
        <SectionHeader
          number="06"
          title="Get in Touch"
          subtitle={`Reach out directly at ${personalInfo.email} or call ${personalInfo.phone}`}
        />

        <div className="contact__info-grid">
          {contactLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="contact__info-card glass"
            >
              <div className="contact__info-icon">
                {link.label === 'WhatsApp' ? <FaWhatsapp size={24} /> : link.icon}
              </div>
              <div className="contact__info-content">
                <span className="contact__info-label">{link.label}</span>
                <span className="contact__info-value">{link.value}</span>
                <p className="contact__info-desc">{link.desc}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="contact__cta">
          <p className="contact__cta-text">Always open for new opportunities and collaborations.</p>
          <a href={`mailto:${personalInfo.email}`} className="contact__cta-btn">
            Start a Project
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p className="footer__text">
            © {new Date().getFullYear()} Koushik Chandra Sarker. Built with{' '}
            <FiHeart size={14} className="footer__heart" /> using React & GSAP
          </p>
        </div>
      </footer>
    </section>
  );
}
