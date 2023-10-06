import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// 화면 이동 시 스크롤 최상단으로 가게하는 컴포넌트

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
