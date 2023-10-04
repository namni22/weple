//https://blog.naver.com/jisub44/223167419138 참고

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./swiper.css";
SwiperCore.use([Navigation, Pagination, Autoplay]);

const SwiperComponent = (props) => {
  const spaceBetween = props.spaceBetween;
  const slidesPerView = props.slidesPerView;
  const navigation = props.navigation;
  const pagination = props.pagination;

  return (
    <Swiper
      spaceBetween={spaceBetween} //SwiperSlide간 간격
      slidesPerView={slidesPerView} //한번에 보여지는 슬라이드 개수
      navigation={{ clickable: { navigation } }}
      pagination={{ clickable: { pagination } }}
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      loop={true}
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
