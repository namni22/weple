import SwiperComponent from "../util/Swiper";
import "./main.css";
const Main = () => {
  const list = ["./img/main_1.jpg", "./img/main_2.jpg"];
  return (
    <>
      <SwiperComponent
        spaceBetween={21}
        slidesPerView={1}
        navigation={true}
        pagination={true}
        loop={true}
        autoplay={true}
        list={list}
      />
    </>
  );
};
export default Main;
