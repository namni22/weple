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
  const fImage = props.fImage;
  const setFImage = props.setFImage;
  const delButton = props.delButton; //삭제버튼 생성 ture/false
  const deleteImg = props.deleteImg;
  const setDeleteImg = props.setDeleteImg;
  const fimageNoList = props.fimageNoList;

  return (
    <Swiper
      spaceBetween={spaceBetween} //SwiperSlide간 간격
      slidesPerView={slidesPerView} //한번에 보여지는 슬라이드 개수
      navigation={{ clickable: { navigation } }}
      pagination={{ clickable: true }}
      autoplay={autoplay}
      loop={loop}
    >
      {list.map((object, index) => {
        return (
          <SwiperSlide key={"box" + index}>
            <ImgBox
              object={object}
              index={index}
              list={list}
              setFeedBox={setFeedBox}
              fImage={fImage}
              setFImage={setFImage}
              delButton={delButton}
              deleteImg={deleteImg}
              setDeleteImg={setDeleteImg}
              fimageNoList={fimageNoList}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

const ImgBox = (props) => {
  const object = props.object;
  const index = props.index;
  const list = props.list;
  const setFeedBox = props.setFeedBox;
  const fImage = props.fImage;
  const setFImage = props.setFImage;
  const delButton = props.delButton;
  const deleteImg = props.deleteImg;
  const setDeleteImg = props.setDeleteImg;
  const fimageNoList = props.fimageNoList;

  const deleteImgFile = () => {
    if (fimageNoList.length !== 0) {
      const delArr = [...deleteImg];
      delArr.push(fimageNoList[index].fimageNo);
      setDeleteImg([...delArr]);
      fimageNoList.splice(index, 1);
    }
    list.splice(index, 1);
    setFeedBox([...list]);
    fImage.splice(index, 1);
    setFImage([...fImage]);
  };

  return (
    <div className="swiper-img-box">
      {object}
      {delButton ? (
        <button onClick={deleteImgFile}>
          <span className="material-icons">close</span>
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default SwiperComponent;
