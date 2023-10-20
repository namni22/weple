import { FormControl, MenuItem, Select } from "@mui/material";
import "./admin.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Pagination from "../common/Pagination";
import { Button1, Button2 } from "../util/Button";
import { useNavigate } from "react-router-dom";
const AdminReport = () => {

  const [toggleIdx, setToggleIdx] = useState(-1);
  const [reportList, setReportList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);


  useEffect(() => {
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
                  <FormControl sx={{ m: 1, minWidth: 80 }}>
                    <Select>
                      <MenuItem value={0}>후기</MenuItem>
                      <MenuItem value={1}>피드</MenuItem>
                      <MenuItem value={2}>모임</MenuItem>
                    </Select>
                  </FormControl>
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
  const navigate = useNavigate();
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
    // console.log(report.reportStatus);
    // if (report.reportStatus === 1) {
    //   axios
    //     .post("/admin/changeReportStatus", report.reportStatus)
    //     .then((res) => {
    //       if (res.data === 1) {
    //         setReportStatus(0);
    //       } else {
    //         Swal.fire("변경 중 문제가 발생했습니다.");
    //       }
    //     })
    //     .catch((res) => {
    //       console.log(res);
    //     });
    // }
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
  if (index === toggleIdx) {

    return (
      <>
        <tr onClick={changeToggle}>
          <td>
            {report.reportType === 0 ? "회원" : (report.reportType === 1 ? "후기" : "피드")}
          </td>
          <td>{report.reportedMember}</td>
          <td>{report.reportCategoryContent}</td>
          <td>
            {report.reportStatus === 1 ? <Button2 text="확인 중" clickEvent={clickConfirm} /> : <Button1 text="확인완료" />}
          </td>
        </tr>
        <div>
          <div className="report-list-content">
            {report.reportContent}
          </div>
          <div className="reportlist-btn-box">
            <div>
              <Button2 text="이동"></Button2>
            </div>
            <div>
              <Button1 text="온도 내리기" clickEvent={reduceLike}></Button1>
            </div>
          </div>
        </div>
      </>

    );
  }
  else {
    return (
      <tr onClick={changeToggle}>
        <td>
          {report.reportType === 0 ? "후기" : (report.reportType === 1 ? "피드" : "모임")}
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

