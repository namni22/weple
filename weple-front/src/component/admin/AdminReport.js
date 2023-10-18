import { FormControl, MenuItem, Select } from "@mui/material";
import "./admin.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Pagination from "../common/Pagination";
import { Button1, Button2 } from "../util/Button";
const AdminReport = () => {

  const [reportList, setReportList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);

  // const handleChange = (event) => {
  //   const obj = { reportNo: report.reportNo, reportType: event.target.value };
  // }

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
        <div className="admin-menu-title"><h1>신고 내역</h1></div>

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
                <td width={"20%"}>아이디</td>
                <td width={"35%"}>신고유형</td>
                <td width={"25%"}>상태</td>
              </tr>
            </thead>
            <tbody>
              {reportList.map((report, index) => {
                return <ReportItem key={"report" + index} report={report} />;
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
  )
};
const ReportItem = (props) => {
  const report = props.report;

  const [reportType, setReportType] = useState(report.reportType);
  const [reportStatus, setReportStatus] = useState();

  console.log("신고전체 : ", report);

  const handleChange = (event) => {


  };
  const changeStatus = () => {
    console.log(report.reportStatus);
    if (report.reportStatus === 1) {
      axios
        .post("/admin/changeReportStatus", report.reportStatus)
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
  return (
    <tr>
      <td>
        {report.reportType === 0 ? "후기" : (report.reportType === 1 ? "피드" : "모임")}
      </td>
      <td>{report.reportedMember}</td>
      <td>{report.reportCategoryContent}</td>
      <td>
        {report.reportStatus === 1 ? <Button2 text="확인 중" clickEvent={changeStatus} /> : <Button1 text="확인완료" />}
      </td>
    </tr>
  );
}
export default AdminReport;