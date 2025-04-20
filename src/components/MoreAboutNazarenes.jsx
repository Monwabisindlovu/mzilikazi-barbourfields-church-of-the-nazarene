// src/components/MoreAboutNazarenes.jsx
import React from 'react';
import './MoreAboutNazarenes.css';
import coreValuesImg from '../assets/core-values.jpg';
import beliefsImg from '../assets/our-beliefs.jpg';
import faithImg from '../assets/articles-of-faith.jpg';
import { Link } from 'react-router-dom';

const cards = [
  {
    title: 'CORE VALUES',
    img: coreValuesImg,
    link: 'https://www.nazarene.org/who-we-are/core-values',
    external: true,
    overlayClass: 'overlay-core',
  },
  {
    title: 'OUR BELIEFS',
    img: beliefsImg,
    link: 'https://www.nazarene.org/beliefs',
    external: true,
    overlayClass: 'overlay-beliefs',
  },
  {
    title: 'ARTICLES OF FAITH',
    img: faithImg,
    link: 'https://www.nazarene.org/who-we-are/articles-faith',
    external: true,
    overlayClass: 'overlay-faith',
  },
];

const MoreAboutNazarenes = () => {
  return (
    <div className="more-about-section">
      <h2 className="section-title">MORE ABOUT NAZARENES</h2>
      <div className="more-about-grid">
        {cards.map((item, index) =>
          item.external ? (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="more-about-card"
              style={{ backgroundImage: `url(${item.img})` }}
            >
              <div className={`card-overlay ${item.overlayClass}`}>
                <p>{item.title}</p>
              </div>
            </a>
          ) : (
            <Link
              key={index}
              to={item.link}
              className="more-about-card"
              style={{ backgroundImage: `url(${item.img})` }}
            >
              <div className={`card-overlay ${item.overlayClass}`}>
                <p>{item.title}</p>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default MoreAboutNazarenes;
