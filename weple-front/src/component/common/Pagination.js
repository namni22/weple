import "./pagination.css";

const Pagination = (props) => {
  const pageInfo = props.pageInfo;
  const reqPage = props.reqPage;
  const setReqPage = props.setReqPage;
  const changePage = (e) => {
    const changePage = e.currentTarget.innerText;
    setReqPage(changePage);
  }
  const arr = new Array();
  //제일 왼 버튼
  arr.push(
    <span
      onClick={() => {
        setReqPage(1);
      }}
      key="first-page" className="material-icons page-item">
      keyboard_double_arrow_left
    </span>
  );
  //왼 버튼
  arr.push(
    <span
      onClick={() => {
        if (reqPage != 1) {
          setReqPage(reqPage - 1);
        }
      }}
      key="prev-page" className="material-icons page-item">
      navigate_before
    </span>
  );
  // 페이지 숫자
  let pageNo = pageInfo.pageNo;
  for (let i = 0; i < pageInfo.pageNaviSize; i++) {
    if (pageNo === Number(reqPage)) {
      arr.push(
        <span onClick={changePage} key={"page" + i} className="page-item active-page">
          {pageNo}
        </span>
      );
    } else {
      arr.push(
        <span
          onClick={changePage}
          key={"page" + i} className="page-item">
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
    <span
      onClick={() => {
        if (reqPage != pageInfo.totalPage) {
          setReqPage(Number(reqPage) + 1);
        }
      }}
      key="next-page" className="material-icons page-item">
      navigate_next
    </span>
  );
  //제일 오른 버튼
  arr.push(
    <span
      onClick={() => {
        setReqPage(pageInfo.totalPage);
      }}
      key="last-page" className="material-icons page-item">
      keyboard_double_arrow_right
    </span>
  );
  return <div className="paging-wrap">{arr}</div>;
};

export default Pagination;
