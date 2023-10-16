import "./boardTab.css";
import { Link } from "react-router-dom";

const BoardTab = (props) =>{
    const tabs = props.tabs;
    const setTabs = props.setTabs;
    const activeTab = (index) => {
        tabs.forEach((item) => {
            item.active = false;
        });
        tabs[index].active = true;
        setTabs([...tabs]);
    };

    return(
        <div className="tab-menu">
      <ul>
        {tabs.map((tab, index) => {
          return (
            <li key={"tab" + index}>
              {tab.active ? (
                <Link
                  to={tab.url}
                  className="active-side"
                  onClick={() => {
                    activeTab(index);
                  }}
                >
                  {tab.text}
                </Link>
              ) : (
                <Link
                  to={tab.url}
                  onClick={() => {
                    activeTab(index);
                  }}
                >
                  {tab.text}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
    )  
}



export default BoardTab;