import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Link } from 'react-router-dom'
import concertsData from '../data/concerts'

export default function HotCarousel() {
  const hotConcerts = [...concertsData]
    .sort((a, b) => new Date(a.date) - new Date(b.date)) 
    .slice(0, 3) 
  return (
    <div className="relative w-full py-6">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        className="mx-auto h-[600px] object-contain"
      >
        {hotConcerts.map(concert => (
          <SwiperSlide key={concert.id}>
            <div className="relative w-full h-full">
              <img
                src={concert.image_url}
                alt={concert.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black/70 text-white p-6">
                <h2 className="text-2xl font-bold truncate">{concert.name}</h2>
                <Link
                  to={`/concert/${concert.id}`}
                  className="inline-block mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-semibold"
                >
                  MORE INFO
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <button className="swiper-button-prev absolute z-10 top-1/2 left-4 -translate-y-1/2 bg-white text-red-600 rounded-full p-2 shadow hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="swiper-button-next absolute z-10 top-1/2 right-4 -translate-y-1/2 bg-white text-red-600 rounded-full p-2 shadow hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </Swiper>
    </div>
  )
}
