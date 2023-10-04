
import "./categoriMain.css"
import CategoriList from "./CategoriList";
import { Link, Route, Routes } from "react-router-dom";

const CategoriMain = () => {
    return (
        <div>카테고리 메인
            <Link to="/categori/categoriList">카테고리보기</Link>
            <Routes>

                <Route path="/categoriList" element={<CategoriList />}></Route>
            </Routes>
        </div>
    );
}
export default CategoriMain;