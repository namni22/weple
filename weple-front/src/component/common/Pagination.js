import "./pagination.css";

const Pagination = (props) => {
  const pageInfo = props.pageInfo;
  const reqPage = props.reqPage;
  const setReqPage = props.setReqPage;
  const arr = new Array();
  //제일 왼 버튼
  arr.push(
    <span key="first-page" className="material-icons-outlined">
      keyboard_double_arrow_left
    </span>
  );
  //왼 버튼
  arr.push(
    <span key="prev-page" className="material-icons-outlined">
      navigate_before
    </span>
  );
  // 페이지 숫자
  let pageNo = pageInfo.pageNo;
  for (let i = 0; i < pageInfo.pageNaviSize; i++) {
    if (pageNo === reqPage) {
      arr.push(
        <span key={"page" + i} className="page-item active-page">
          {pageNo}
        </span>
      );
    } else {
      arr.push(
        <span key={"page" + i} className="page-item">
          {pageNo}
        </span>
      );
    }
    pageNo++;
    if (pageNo > pageInfo.totalPage) {
      break;
    }
  }
  //오른 버튼
  arr.push(
    <span key="next-page" className="material-icons-outlined">
      navigate_next
    </span>
  );
  //제일 오른 버튼
  arr.push(
    <span key="last-page" className="material-icons-outlined">
      keyboard_double_arrow_right
    </span>
  );
  return <div className="paging-wrap">{arr}</div>;
};

export default Pagination;
