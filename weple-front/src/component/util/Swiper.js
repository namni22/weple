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
  const list = props.list; //src속성값 배열
  const autoplay = props.autoplay;
  const loop = props.loop;
  const setFeedBox = props.setFeedBox;
  const feedThumb = props.feedThumb;
  const setFeedThumb = props.setFeedThumb;
  const delButton = props.delButton; //삭제버튼 생성 ture/false

  return (
    <Swiper
      spaceBetween={spaceBetween} //SwiperSlide간 간격
      slidesPerView={slidesPerView} //한번에 보여지는 슬라이드 개수
      navigation={{ clickable: { navigation } }}
      pagination={{ clickable: true }}
      autoplay={autoplay}
      loop={loop}
    >
      {list.map((src, index) => {
        return (
          <SwiperSlide key={"box" + index}>
            <ImgBox
              src={src}
              index={index}
              list={list}
              setFeedBox={setFeedBox}
              feedThumb={feedThumb}
              setFeedThumb={setFeedThumb}
              delButton={delButton}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

const ImgBox = (props) => {
  const src = props.src;
  const index = props.index;
  const list = props.list;
  const setFeedBox = props.setFeedBox;
  const feedThumb = props.feedThumb;
  const setFeedThumb = props.setFeedThumb;
  const delButton = props.delButton;

  const deleteImg = () => {
    list.splice(index, 1);
    setFeedBox([...list]);
    feedThumb.splice(index, 1);
    setFeedThumb([...feedThumb]);
  };

  return (
    <div className="feed-write-img-box">
      <img src={src}></img>
      {delButton ? (
        <button onClick={deleteImg}>
          <span className="material-icons">close</span>
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default SwiperComponent;
