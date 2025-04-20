import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ChurchGallery = () => {
  const highlights = [
    { type: 'image', src: '/assets/easter-service.jpg', caption: 'Easter Celebration 2025' },
    { type: 'video', src: '/assets/worship-clip.mp4', caption: 'Praise & Worship' },
    { type: 'image', src: '/assets/youth-event.jpg', caption: 'Youth Event Highlights' },
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
            <div className="relative">
              {item.type === 'image' ? (
                <img src={item.src} alt={item.caption} className="w-full h-96 object-cover rounded-lg" />
              ) : (
                <video className="w-full h-96 object-cover rounded-lg" controls>
                  <source src={item.src} type="video/mp4" />
                </video>
              )}
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
