import "./admin.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Pagination from "../common/Pagination";
import { Button1, Button2 } from "../util/Button";
import { useNavigate } from "react-router-dom";
import { FeedView } from "../feed/FeedView";
import { FeedComment } from "../feed/FeedComment";
import MeetView from "../meet/MeetView";
import ReviewReport from "../review/ReviewReport";
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
                <td width={"20%"}>신고종류</td>
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
  const navigate = useNavigate();
  const index = props.index;
  const changeToggle = (e) => {
    if (index === toggleIdx) {
      setToggleIdx(-1);
    } else {
      setToggleIdx(index);
    }

  }
  const clickConfirm = () => {
    const obj = { reportNo: report.reportNo, reportStatus: report.reportStatus };
    console.log("clickConfirm :", obj);
    if (report.reportStatus === 1) {
      axios
        .post("/admin/changeReportStatus", obj)
        .then((res) => {
          if (res.data === 1) {
            Swal.fire("확인완료");
            report.reportStatus = 0;
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
    //console.log("reductLike ", report);
    axios
      .post("/admin/reduceLike", report)
      .then((res) => {
        if (res.data === 1) {
          Swal.fire("호감도가 내려갔습니다")
          axios
            .post("/admin/checkBlacklist", report)
            .then((res) => {
              if (res.data === 1) {
                Swal.fire("블랙리스트입니다.")
              } else {
                Swal.fire("블랙리스트가 아닙니다.")
              }
            })
            .catch((res) => {

            })
        } else {
          Swal.fire("호감도 실패")
        }
      })
      .catch((res) => {

      })
  }



  const clickMove = (props) => {
    const report = props;

    if (report.reportType === 0) {
      const reportItemNo = report.reportItemNo;
      axios
        .get("/admin/memberInfo/" + reportItemNo)
        .then((res) => {
          navigate("/memberProfile", { state: { memberId: res.data } })
        })
    } else if (report.reportType === 1) {
      const reportItemNo = report.reportItemNo;
      axios
        .get("/admin/meetInfo/" + reportItemNo)
        .then((res) => {
          //console.log("meetinfo result : ", res.data[0]);
          navigate("/meet/View", { state: { m: res.data[0] } })
        })
        .catch((res) => {
          console.log("catch : " + res.response.status);
        });


    } else if (report.reportType === 2) {
      setViewOpen(true);

    } else if (report.reportType === 3) {
      setReviewOpen(true);
    }

  }
  // //댓글모달
  // const myFeedComment = (e) => {
  //   setCmtIsOpen(true);
  //   setRcmId("");
  //   setFCommentRefNo(null);
  //   // 댓글 버튼 누를 때 피드까지 뜨는 버블링 막는 코드
  //   e.stopPropagation();
  //   // setLoadList(loadList + 1);
  // };
  const [viewOpen, setViewOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const isAdmin = props.isAdmin;
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
          <td className="report-list-content" colSpan={4}>
            <div>{report.reportContent}</div>
            <div>
              <div className="reportlist-btn-box">
                <div>
                  <Button2 text="이동" clickEvent={() => { clickMove(report) }}></Button2>
                </div>
                <div>
                  <Button1 text="온도 내리기" clickEvent={reduceLike}></Button1>
                </div>
              </div>
              <ReportItemContent report={report} viewOpen={viewOpen} setViewOpen={setViewOpen} reviewOpen={reviewOpen} setReviewOpen={setReviewOpen} isAdmin={isAdmin}></ReportItemContent>
            </div>
          </td>
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

const ReportItemContent = (props) => {
  const reportType = props.report.reportType;
  const setViewOpen = props.setViewOpen;
  const viewOpen = props.viewOpen;
  const reportItemNo = props.report.reportItemNo;
  const isAdmin = props.isAdmin;
  const setReviewOpen = props.setReviewOpen;
  const reviewOpen = props.reviewOpen;


  const [loadList, setLoadList] = useState(0);

  const closeView = (e) => {
    setViewOpen(false);
    e.stopPropagation();
  };

  if (reportType === 0) {
    return (<tr></tr>)
  }
  else if (reportType === 1) {
    return (<tr>
      {/* <MeetView /> */}
    </tr>)
  }
  else if (reportType === 2) {
    return (
      <tr>
        <FeedView
          isOpen={viewOpen}
          closeView={closeView}
          feedNo={reportItemNo}
          isLogin={true}
          loadList={loadList}
          setLoadList={setLoadList}
          isAdmin={true}
        />
      </tr>
    )
  }
  else if (reportType === 3) {
    return (
      <tr>
        <ReviewReport
          reviewOpen={reviewOpen}
          setReviewOpen={setReviewOpen}
          closeView={(e) => {
            setReviewOpen(false);
          }}
          reviewNo={reportItemNo} //review번호 값
          isAdmin={isAdmin}
        />
      </tr>

    )
  }

}

export default AdminReport;
