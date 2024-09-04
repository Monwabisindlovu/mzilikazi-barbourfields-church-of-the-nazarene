import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import Modal from 'react-modal';
import 'react-image-lightbox/style.css'; // Import the lightbox styles

import styles from './Media.module.css';

function Media() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [currentVideo, setCurrentVideo] = useState('');
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

  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setCurrentImage(mediaItems[index].src);
    setLightboxOpen(true);
  };

  const handleVideoClick = (index) => {
    setCurrentIndex(index);
    setCurrentVideo(mediaItems[index].link);
    setVideoModalOpen(true);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaItems.length);
    setCurrentImage(mediaItems[(currentIndex + 1) % mediaItems.length].src);
    setCurrentVideo(mediaItems[(currentIndex + 1) % mediaItems.length].link);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + mediaItems.length) % mediaItems.length);
    setCurrentImage(mediaItems[(currentIndex - 1 + mediaItems.length) % mediaItems.length].src);
    setCurrentVideo(mediaItems[(currentIndex - 1 + mediaItems.length) % mediaItems.length].link);
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
            {item.link.endsWith('.mp4') ? (
              <button
                onClick={() => handleVideoClick(index)}
                className={styles.mediaButton}
              >
                <img src={item.src} alt={item.alt} className={styles.mediaImage} />
              </button>
            ) : (
              <button
                onClick={() => handleImageClick(index)}
                className={styles.mediaButton}
              >
                <img src={item.src} alt={item.alt} className={styles.mediaImage} />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox for images */}
      {lightboxOpen && (
        <Lightbox
          mainSrc={currentImage}
          nextSrc={mediaItems[(currentIndex + 1) % mediaItems.length].src}
          prevSrc={mediaItems[(currentIndex - 1 + mediaItems.length) % mediaItems.length].src}
          onCloseRequest={() => setLightboxOpen(false)}
          onMovePrevRequest={handlePrevious}
          onMoveNextRequest={handleNext}
        />
      )}

      {/* Modal for videos */}
      <Modal
        isOpen={videoModalOpen}
        onRequestClose={() => setVideoModalOpen(false)}
        contentLabel="Video Modal"
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <button onClick={() => setVideoModalOpen(false)} className={styles.closeButton}>Close</button>
        <video controls autoPlay className={styles.videoPlayer}>
          <source src={currentVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Modal>
    </div>
  );
}

export default Media;
