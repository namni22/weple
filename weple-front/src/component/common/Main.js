import SwiperComponent from "../util/Swiper";
import "./main.css";
const Main = () => {
  const imgList = ["./img/main_1.jpg", "./img/main_2.jpg"];
  const list = imgList.map((item, index) => {
    return <img src={item} key={"mainSwiper" + index}></img>;
  });
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
