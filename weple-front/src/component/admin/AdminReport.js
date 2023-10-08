import { FormControl, MenuItem, Select } from "@mui/material";
import "./admin.css";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const AdminReport = (props) => {
    // const report = props.report;
    // const [reportType, setReportType] = useState(report.reportType);
    // const [reportList, setReportList] = useState([]);
    // const handleChange = (event) => {
    //   const obj = { reportNo: report.reportNo, reportType: event.target.value };
  
    // }
  
    return(
    <div className="admin-report-wrap">
        <div className="admin-report-top">   
        <div className="admin-menu-title"><h1>신고 내역</h1></div>   
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
                <td width={"20%"}>아이디</td>
                <td width={"35%"}>신고유형</td>
                <td width={"25%"}>상태</td>
              </tr>
            </thead>
            <tbody>
              {/* {reportList.map((report, index) => {
                return <ReportItem key={"report" + index} report={report} />;
              })} */}
            </tbody>
          </table>
        </div>
    </div>
  

  
    )
    
};
const ReportItem = ()=>{

}
export default AdminReport;