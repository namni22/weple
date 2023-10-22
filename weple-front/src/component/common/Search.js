import {  useLocation } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../common/Pagination";
import "./search.css";
import { Link } from "react-router-dom";

const Search = ()=>{
  const location = useLocation();
  const [searchResult, setSearchResult] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  useEffect(() => {
    console.log(location.state);
    const searchWord = location.state;
    console.log(searchWord);
    axios
      .get("/meet/searchKeyword/" + reqPage + "/테")
      .then((res) => {
        console.log(res.data);
        setSearchResult(res.data.meetList);
        //페이지인포 셋팅
        setPageInfo(res.data.pi);
      })
      .catch((res) => {
        console.log(res);
      });
  }, [reqPage]);
    return (
      <div className="search-wrap">
        {/* <div className="search-top">검색결과 </div> */}
        {searchResult.map((meet, index) => {
          return (
            <Link to="/meet/View" state={{ m: meet }}>
              <div className="search-results">
                <SearchComponent meet={meet} />
              </div>
            </Link>
          );
        })}
        <Pagination
          reqPage={reqPage}
          setReqPage={setReqPage}
          pageInfo={pageInfo}
          setData={setSearchResult}
        />
      </div>
    );
}
const SearchComponent = (props)=>{
  const meet = props.meet;
  const meetTitle = meet.meetTitle;
  const meetThumbNail = "/meet/" + meet.meetThumbNail;
  const meetContentS = meet.meetContentS;
  //태그 삭제
  let meetContentDRaw = meet.meetContentD.replaceAll("<br>", "");
  meetContentDRaw = meetContentDRaw.replaceAll("<p>", "");
  meetContentDRaw = meetContentDRaw.replaceAll("</p>", "");
  const imgTags = meetContentDRaw.split(
    meetContentDRaw.indexOf("<img"),
    meetContentDRaw.indexOf(">") + 1
  );
    imgTags.map((item, index)=>{
      meetContentDRaw= meetContentDRaw.replaceAll(item,"");

    })
    //
  const meetContentD = meetContentDRaw;
    return (
      <div className="search-result">
        <div className="search-thumb">
          <img src={meetThumbNail} />
        </div>
        <div className="search-content">
          <div className="search-title">{meetTitle}</div>
          <div className="search-contentS">{meetContentS}</div>
          <div className="search-contentD">{meetContentD}</div>
        </div>
      </div>
    );
}
export default Search;