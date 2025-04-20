import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import easterImg from '../assets/easter-service.jpg';
import youthEvent from '../assets/youth-event.jpg.jpg'; // double-check filename

const ChurchGallery = () => {
  const highlights = [
    { src: easterImg, caption: "Children's Camp 2025" },
    { src: youthEvent, caption: 'Youth Event Highlights' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto py-6">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        navigation
        loop
      >
        {highlights.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative gallery-slide">
              <img
                src={item.src}
                alt={item.caption}
                className="gallery-img"
              />
              <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 p-2 rounded">
                {item.caption}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ChurchGallery;
