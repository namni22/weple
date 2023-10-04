import SwiperComponent from "../util/Swiper";
import "./main.css";
const Main = () => {
  return (
    <>
      <SwiperComponent
        spaceBetween={21}
        slidesPerView={1}
        navigation={true}
        pagination={true}
      />
    </>
  );
};
export default Main;
