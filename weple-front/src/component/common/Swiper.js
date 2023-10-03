//https://blog.naver.com/jisub44/223167419138 참고

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {Navigation, Pagination} from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./swiper.css";
SwiperCore.use([Navigation, Pagination]);

const SwiperComponent = () => {
  return (
    <Swiper
      spaceBetween={26} //SwiperSlide간 간격
      slidesPerView={1} //한번에 보여지는 슬라이드 개수
      // scrollbar={{ draggable: true }}
      navigation={{ clickable: true }}
      pagination={{ clickable: true }}
      // onSlideChange={() => console.log("slide change")}
      // onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <img src="./img/main_1.jpg"></img>
      </SwiperSlide>
      <SwiperSlide>
        <img src="./img/main_2.jpg"></img>
      </SwiperSlide>
    </Swiper>
  );
};


export default SwiperComponent;