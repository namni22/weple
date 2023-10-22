import "./admin.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Pagination from "../common/Pagination";
import { Button1, Button2 } from "../util/Button";
import { useNavigate } from "react-router-dom";
import {FeedView} from "../feed/FeedView";
import { FeedComment } from "../feed/FeedComment";
const AdminReport = () => {

  const [toggleIdx, setToggleIdx] = useState(-1);
  const [reportList, setReportList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);
 


  useEffect(() => {
    setToggleIdx(-1);
    axios
      .get("/admin/reportList/" + reqPage)
      .then((res) => {
        // console.log(res.data.list);
        setReportList(res.data.list);
        setPageInfo(res.data.pi);
      })
      .catch((res) => {
        console.log(res);
      });
  }, [reqPage]);

  return (
    <div className="admin-report-wrap">
      <div className="admin-report-top">
        <div className="admin-menu-title">
          <h1>신고 내역</h1>
        </div>

        <div className="admin-report-tbl-box">
          <table>
            <thead>
              <tr>
                <td width={"20%"}>
                  <select></select>
                </td>
                <td width={"20%"}>신고 받은 아이디</td>
                <td width={"35%"}>신고유형</td>
                <td width={"25%"}>상태</td>
              </tr>
            </thead>
            <tbody>
              {reportList.map((report, index) => {
                return <ReportItem key={"report" + index} report={report} toggleIdx={toggleIdx} setToggleIdx={setToggleIdx} index={index} />;
              })}
            </tbody>
          </table>
        </div>
        <div className="admin-paging-wrap">
          <Pagination
            reqPage={reqPage}
            setReqPage={setReqPage}
            pageInfo={pageInfo}
            setData={setReportList}
          />
        </div>
      </div>
    </div>
  );
};
const ReportItem = (props) => {
  const report = props.report;
  const toggleIdx = props.toggleIdx;
  const setToggleIdx = props.setToggleIdx;
  
  const index = props.index;
  const [reportType, setReportType] = useState(report.reportType);
  const [reportStatus, setReportStatus] = useState();

  const changeToggle = (e) => {
    //console.log("신고번호 : " + index);
    if (index === toggleIdx) {
      setToggleIdx(-1);
    } else {
      setToggleIdx(index);
    }

  }
  const clickConfirm = () => {
    const obj = {reportStatus : report.reportStatus}
    if (report.reportStatus === 1) {
      axios
        .post("/admin/changeReportStatus", obj)
        .then((res) => {
          if (res.data === 1) {
            setReportStatus(0);
          } else {
            Swal.fire("변경 중 문제가 발생했습니다.");
          }
        })
        .catch((res) => {
          console.log(res);
        });
    }
  }
  const reduceLike = (props) => {

    //const member = report.reportedMember;
    //const setMember = [];
    console.log("reductLike ", report);
    axios
      .post("/admin/reduceLike", report)
      .then((res) => {
        if (res.data === 1) {
          Swal.fire("호감도가 내려갔습니다")
          axios
            .post("/admin/checkBlacklist", report)
            //멤버아이디 => 온도 10 이하면 =>블랙리스트 => report type 모임 다막아버리라는 거지 검수중으로 바꾸라고/회원 블랙리스트로 가게 함
            .then((res) => {

            })
            .catch((res) => {
              Swal.fire("블랙리스트입니다.")
            })
        } else {
          Swal.fire("블랙리스트 명단에 있습니다.")
        }
      })
      .catch((res) => {

      })
  }

  const [viewOpen, setViewOpen] = useState(false);
  const [cmtIsOpen, setCmtIsOpen] = useState(false); //댓글모달
  const [loadList, setLoadList] = useState(0);
  const [fCommentRefNo, setFCommentRefNo] = useState(null);
  const [rcmId, setRcmId] = useState(""); //답글남길 아이디 띄우기

  const clickMove = (props) =>{  
    console.log("const clickMove = (props) =>{ ");
    const report =props;
    if(report.reportType === 0){

    }else if(report.reportType === 1){
      const reportedMember = report.reportedMember;

      // const isLogin = props.isLogin;
      // const isAdmin = props.isAdmin;
      // //const myFeed = props.myFeed;
        
      // setViewOpen(true);
      
      
    }else if(report.reportType === 2){
      
    }else if(report.reportType === 3){
      
    }
  
  }
  
  // // 피드 상세보기 모달
  // const myFeedView = () => {
  //   setViewOpen(true);
  // };

  // const closeView = (e) => {
  //   setViewOpen(false);
  //   e.stopPropagation();
  // };

  // //댓글모달
  // const myFeedComment = (e) => {
  //   setCmtIsOpen(true);
  //   setRcmId("");
  //   setFCommentRefNo(null);
  //   // 댓글 버튼 누를 때 피드까지 뜨는 버블링 막는 코드
  //   e.stopPropagation();
  //   // setLoadList(loadList + 1);
  // };
  // const closeComent = () => {
  //   setCmtIsOpen(false);
  // };

  if (index === toggleIdx) {

    return (
      <>
        <tr onClick={changeToggle}>
          <td>
            {report.reportType === 0
              ? "회원"
              : report.reportType === 1
                ? "모임"
                : report.reportType === 2
                  ? "피드"
                  : report.reportType === 3
                    ? "후기"
                    : ""}

          </td>
          <td>{report.reportedMember}</td>
          <td>{report.reportCategoryContent}</td>
          <td>
            {report.reportStatus === 1 ? <Button2 text="확인 중" clickEvent={clickConfirm} /> : <Button1 text="확인완료" />}
          </td>
        </tr>
        <tr>
          <div className="report-list-content">
            {report.reportContent}
          </div>
          <div className="reportlist-btn-box">
            <div>
              <Button2 text="이동" clickEvent={()=>{clickMove(report)}}></Button2>
            </div>
            <div>
              <Button1 text="온도 내리기" clickEvent={reduceLike}></Button1>
            </div>
          </div>
          <div>
      
      {/* <FeedView
        isOpen={viewOpen}
        closeView={closeView}
        feedNo={117}
        isLogin={true}
        loadList={loadList}
        setLoadList={setLoadList}
        isAdmin={true}
      />
      <FeedComment
        isOpen={cmtIsOpen}
        closeComent={closeComent}
        isLogin={true}
        feedNo={12929}
        fCommentRefNo={fCommentRefNo}
        setFCommentRefNo={setFCommentRefNo}
        rcmId={rcmId}
        setRcmId={setRcmId}
        loadList={loadList}
        setLoadList={setLoadList}
      /> */}
    </div>
        </tr>
      </>

    );
  }
  else {
    return (
      <tr onClick={changeToggle}>
        <td>
          {report.reportType === 0
            ? "회원"
            : report.reportType === 1
              ? "모임"
              : report.reportType === 2
                ? "피드"
                : report.reportType === 3
                  ? "후기"
                  : ""}
        </td>
        <td>{report.reportedMember}</td>
        <td>{report.reportCategoryContent}</td>
        <td>
          {report.reportStatus === 1 ? <Button2 text="확인 중" clickEvent={clickConfirm} /> : <Button1 text="확인완료" />}
        </td>
      </tr>
    )
  }
}
export default AdminReport;

