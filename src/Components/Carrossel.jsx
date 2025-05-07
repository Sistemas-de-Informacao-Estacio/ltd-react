import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, EffectFade } from 'swiper/modules';

function Carrossel() {
    const img = [
        'https://estadodeexcelencia.com.br/wp-content/uploads/2022/08/Estacio-Centro-2.jpeg',
        'https://websiteltd.vercel.app/dist/images/ltd.png',

    ];

    return (
        <div className="w-full max-w-3xl mx-auto">

            <Swiper
                modules={[Navigation, Autoplay, EffectFade]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop
                effect="fade"
                fadeEffect={{ crossFade: true }}
                spaceBetween={20}
                slidesPerView={1}
                className="rounded-2xl shadow-lg">

                {img.map((url, index) => (

                    <SwiperSlide key={index}>
                        <img
                            src={url}
                            alt={`Slide ${index + 1}`}
                            className=" w-96 h-96 object-cover rounded-2xl" />

                    </SwiperSlide>

                ))}

            </Swiper>

        </div>
    );
}

export default Carrossel;