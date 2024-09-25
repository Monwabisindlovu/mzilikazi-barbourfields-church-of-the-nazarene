import React, { useState } from 'react';
import Lightbox from 'react-spring-lightbox';
import Modal from 'react-modal';
import styles from './Media.module.css'; // Assuming you are using CSS modules

function Media() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const mediaItems = [
    { src: 'https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/images/WhatsApp%20Image%202024-09-03%20at%2013.59.20_6158f60c.jpg?raw=true', alt: 'Sermon 1', link: '#' },
    { src: 'https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/images/IMG-20240903-WA0022.jpg?raw=true', alt: 'Video 2', link: '#' },
    { src: 'https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/images/IMG-20240903-WA0019.jpg?raw=true', alt: 'Podcast 3', link: '#' },
    { src: 'https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/images/IMG-20240830-WA0027.jpg?raw=true', alt: 'Audio 4', link: '#' },
    { src: 'https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/images/IMG-20240903-WA0009.jpg?raw=true', alt: 'Devotional 5', link: '#' },
    { src: 'https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/images/IMG-20240830-WA0025.jpg?raw=true', alt: 'Sermon 6', link: '#' },
    { src: 'https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/images/IMG-20240903-WA0021.jpg?raw=true', alt: 'Video 7', link: 'https://github.com/Monwabisindlovu/portfolio-landing_page/raw/main/images/service.mp4' },
    { src: 'https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/images/IMG-20240830-WA0026.jpg?raw=true', alt: 'Podcast 8', link: '#' },
    { src: 'https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/images/IMG-20240903-WA0012.jpg?raw=true', alt: 'Sermon 9', link: '#' },
    { src: 'https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/images/IMG-20240903-WA0013.jpg?raw=true', alt: 'Devotional 10', link: '#' },
    { src: 'https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/images/IMG-20240903-WA0023.jpg?raw=true', alt: 'Audio 11', link: '#' },
    { src: 'https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/images/IMG-20240903-WA0014.jpg?raw=true', alt: 'Video 12', link: '#' },
    { src: 'https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/images/IMG-20240830-WA0024.jpg?raw=true', alt: 'Podcast 13', link: '#' },
    { src: 'https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/images/IMG-20240903-WA0016.jpg?raw=true', alt: 'Sermon 14', link: '#' },
    { src: 'https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/images/childrens.jpg?raw=true', alt: 'Devotional 15', link: '#' },
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + mediaItems.length) % mediaItems.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaItems.length);
  };

  const handleClick = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const renderMedia = (item) => {
    if (item.type === 'image') {
      return <img src={item.src} alt={item.alt} style={{ maxWidth: '100%', maxHeight: '100%' }} />;
    } else if (item.type === 'video') {
      return (
        <video controls autoPlay style={{ maxWidth: '100%', maxHeight: '100%' }}>
          <source src={item.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }
    return null;
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
              onClick={() => handleClick(index)}
              className={styles.mediaButton}
            >
              {item.type === 'image' ? (
                <img src={item.src} alt={item.alt} className={styles.mediaImage} />
              ) : (
                <div style={{ width: '100px', height: '100px', backgroundColor: '#ddd', textAlign: 'center', lineHeight: '100px' }}>
                  Video
                </div>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Lightbox for images and videos */}
      {isOpen && (
        <Lightbox
          isOpen={isOpen}
          onPrev={handlePrev}
          onNext={handleNext}
          onClose={() => setIsOpen(false)}
          currentIndex={currentIndex}
          renderHeader={() => <h4>{mediaItems[currentIndex].alt}</h4>}
          renderContent={() => renderMedia(mediaItems[currentIndex])}
        />
      )}
    </div>
  );
}

export default Media;
