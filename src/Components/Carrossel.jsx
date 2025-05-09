import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, EffectFade, Pagination } from 'swiper/modules';
import { v4 as uuidv4 } from 'uuid';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useRef } from 'react';

function Carrossel() {

    const img = [
        { id: uuidv4(), image: 'https://estadodeexcelencia.com.br/wp-content/uploads/2022/08/Estacio-Centro-2.jpeg' },
        { id: uuidv4(), image: 'https://websiteltd.vercel.app/dist/images/ltd.png' },

    ];

    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <div className="w-96 h-96 max-w-3xl mx-auto">

            <Swiper

                modules={[Navigation, Autoplay, EffectFade, Pagination]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop
                effect="fade"
                fadeEffect={{ crossFade: true }}
                spaceBetween={20}
                slidesPerView={1}
                pagination={{ clickable: true }}
                onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                }}
                navigation
                className="rounded-2xl shadow-lg">

                {img.map((item) => (

                    <SwiperSlide key={item.id}>
                        <img
                            src={item.image}
                            alt={`Slide`}
                            className=" w-96 h-96 object-cover rounded-2xl" />

                    </SwiperSlide>

                ))}

                <button ref={prevRef} className="custom-prev absolute top-1/2 left-2 -translate-y-1/2 z-50 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition duration-300">
                    <MdChevronLeft size={24} className="text-black" />
                </button>


                <button ref={nextRef} className="custom-next absolute top-1/2 right-2 -translate-y-1/2 z-50 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition duration-300">
                    <MdChevronRight size={24} className="text-black" />
                </button>


            </Swiper>


        </div>
    );
}

export default Carrossel;