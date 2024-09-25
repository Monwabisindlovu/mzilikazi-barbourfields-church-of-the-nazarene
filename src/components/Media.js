import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { Fullscreen, Zoom } from 'yet-another-react-lightbox/plugins';

import styles from './Media.module.css';

function Media() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const mediaItems = [
    { src: 'https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/images/WhatsApp%20Image%202024-09-03%20at%2013.59.20_6158f60c.jpg?raw=true', type: 'image', alt: 'Sermon 1' },
    { src: 'https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/images/IMG-20240903-WA0022.jpg?raw=true', type: 'image', alt: 'Video 2' },
    { src: 'https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/images/IMG-20240903-WA0019.jpg?raw=true', type: 'image', alt: 'Podcast 3' },
    { src: 'https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/images/IMG-20240830-WA0027.jpg?raw=true', type: 'image', alt: 'Audio 4' },
    { src: 'https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/images/IMG-20240903-WA0009.jpg?raw=true', type: 'image', alt: 'Devotional 5' },
    { src: 'https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/images/IMG-20240830-WA0025.jpg?raw=true', type: 'image', alt: 'Sermon 6' },
    { src: 'https://github.com/Monwabisindlovu/portfolio-landing_page/raw/main/images/service.mp4', type: 'video', alt: 'Video 7' },
    { src: 'https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/images/IMG-20240830-WA0026.jpg?raw=true', type: 'image', alt: 'Podcast 8' },
    { src: 'https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/images/IMG-20240903-WA0012.jpg?raw=true', type: 'image', alt: 'Sermon 9' },
    { src: 'https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/images/IMG-20240903-WA0013.jpg?raw=true', type: 'image', alt: 'Devotional 10' },
    { src: 'https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/images/IMG-20240903-WA0023.jpg?raw=true', type: 'image', alt: 'Audio 11' },
    { src: 'https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/images/IMG-20240903-WA0014.jpg?raw=true', type: 'image', alt: 'Video 12' },
    { src: 'https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/images/IMG-20240830-WA0024.jpg?raw=true', type: 'image', alt: 'Podcast 13' },
    { src: 'https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/images/IMG-20240903-WA0016.jpg?raw=true', type: 'image', alt: 'Sermon 14' },
    { src: 'https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/images/childrens.jpg?raw=true', type: 'image', alt: 'Devotional 15' },
  ];

  const handleOpenLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Media</h2>
        <p>Explore our sermons, videos, and other media resources.</p>
      </div>

      <div className={styles.links}>
        {mediaItems.map((item, index) => (
          <div key={index} className={styles.linkItem}>
            <button
              onClick={() => handleOpenLightbox(index)}
              className={styles.mediaButton}
            >
              <img src={item.src} alt={item.alt} className={styles.mediaImage} />
            </button>
          </div>
        ))}
      </div>

      {lightboxOpen && (
        <Lightbox
          slides={mediaItems}
          open={lightboxOpen}
          index={currentIndex}
          close={() => setLightboxOpen(false)}
          plugins={[Fullscreen, Zoom]}
        />
      )}
    </div>
  );
}

export default Media;
