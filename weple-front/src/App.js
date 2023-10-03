import { Route, Routes } from "react-router-dom";
import "./component/common/common.css";
import Feed from "./component/feed/Feed";
import Header from "./component/common/Header";
import Main from "./component/common/Main";
import Footer from "./component/common/Footer";




function App() {
  return (
    <div className="weple-wrap">
      <Header />
      <div className="weple-content">
        <Main/>
        <Routes>
          <Route path="/feed/*" element={<Feed />} />
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
