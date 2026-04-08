import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiExternalLink, FiGithub, FiX, FiZoomIn } from 'react-icons/fi';
import SectionHeader from '../shared/SectionHeader';
import ImageViewer from '../shared/ImageViewer';
import { projects } from '../../data/portfolio';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

function ProjectModal({ project, onClose, onViewImage }) {
  const modalRef = useRef(null);

  // useGSAP(() => {
  //   gsap.from('.project-modal__overlay', { opacity: 0, duration: 0.3 });
  //   gsap.from('.project-modal__content', {
  //     scale: 0.9,
  //     opacity: 1,
  //     duration: 0.4,
  //     ease: 'back.out(1.5)',
  //   });
  // }, { scope: modalRef });

  return (
    <div className="project-modal" ref={modalRef}>
      <div className="project-modal__overlay" onClick={onClose} />
      <div className="project-modal__content glass">
        <button className="project-modal__close" onClick={onClose} aria-label="Close modal">
          <FiX size={24} />
        </button>
        <div
          className="project-modal__image-wrapper"
          onClick={() => onViewImage({ src: project.image, alt: project.name })}
          title="Click to zoom"
        >
          <img src={project.image} alt={project.name} className="project-modal__img" />
          <div className="project-modal__image-hint">
            <FiZoomIn /> Click to zoom
          </div>
        </div>
        <div className="project-modal__header">
          <div className="project-modal__badges">
            <span className="project-card__domain">{project.domain}</span>
            {project.category === 'opensource' && (
              <span className="project-card__oss-badge">Open Source</span>
            )}
          </div>
          <h3 className="project-modal__name">{project.name}</h3>
          {project.category === 'professional' && (
            <p className="project-modal__client">Client: {project.client}</p>
          )}
        </div>
        <div className="project-modal__tech">
          {project.techStack.map((t, i) => (
            <span className="skill-tag" key={i}>{t}</span>
          ))}
        </div>
        <p className="project-modal__desc">{project.description}</p>
        <h4 className="project-modal__resp-title">
          {project.category === 'professional' ? 'Key Responsibilities' : 'Highlights'}
        </h4>
        <ul className="project-modal__list">
          {project.responsibilities.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-modal__github-btn"
          >
            <FiGithub size={18} />
            View on GitHub
          </a>
        )}
      </div>
    </div>
  );
}

const FILTERS = [
  { key: 'all', label: 'All Projects' },
  { key: 'professional', label: 'Professional' },
  { key: 'opensource', label: 'Open Source' },
];

export default function Projects() {
  const projRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewedImage, setViewedImage] = useState(null);

  useGSAP(() => {
    gsap.from('.project-card', {
      y: 40,
      opacity: 0,
      scale: 0.95,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.projects__grid',
        start: 'top 85%',
      },
    });
  }, { scope: projRef });

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const handleFilterChange = (key) => {
    setActiveFilter(key);
    // Animate cards in on filter change
    setTimeout(() => {
      gsap.from('.project-card', {
        y: 20,
        opacity: 0,
        scale: 0.97,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power2.out',
      });
    }, 10);
  };

  return (
    <section className="projects section" id="projects" ref={projRef}>
      <div className="container">
        <SectionHeader
          number="04"
          title="Projects"
          subtitle="Professional work & open source contributions"
        />

        <div className="projects__filters">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`projects__filter-btn ${activeFilter === f.key ? 'projects__filter-btn--active' : ''}`}
              onClick={() => handleFilterChange(f.key)}
            >
              {f.label}
              {f.key !== 'all' && (
                <span className="projects__filter-count">
                  {projects.filter((p) => p.category === f.key).length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="projects__grid">
          {filteredProjects.map((project) => (
            <div
              className={`project-card glass ${project.featured ? 'project-card--featured' : ''}`}
              key={project.id}
            >
              <div
                className="project-card__image-wrapper"
                onClick={() => setSelectedProject(project)}
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className="project-card__img"
                  loading="lazy"
                />
                <div className="project-card__image-overlay">
                  <span className="project-card__image-label">View Project Details</span>
                </div>
              </div>

              <div className="project-card__content">
                <div className="project-card__header">
                  <span className="project-card__domain">{project.domain}</span>
                  <div className="project-card__header-right">
                    {project.featured && <span className="project-card__featured-badge">Featured</span>}
                    {project.category === 'opensource' && (
                      <span className="project-card__oss-badge">OSS</span>
                    )}
                  </div>
                </div>
                <h3 className="project-card__name">{project.name}</h3>
                {project.category === 'professional' && (
                  <p className="project-card__client">Client: {project.client}</p>
                )}
                <p className="project-card__desc">{project.description}</p>

                <div className="project-card__tech">
                  {project.techStack.map((t, i) => (
                    <span className="skill-tag" key={i}>{t}</span>
                  ))}
                </div>

                <div className="project-card__actions">
                  <button
                    className="project-card__btn"
                    onClick={() => setSelectedProject(project)}
                  >
                    <FiExternalLink size={16} />
                    View Details
                  </button>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-card__btn project-card__btn--outline"
                    >
                      <FiGithub size={16} />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onViewImage={setViewedImage}
        />
      )}

      {viewedImage && (
        <ImageViewer
          src={viewedImage.src}
          alt={viewedImage.alt}
          onClose={() => setViewedImage(null)}
        />
      )}
    </section>
  );
}
