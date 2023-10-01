import "./jwButton.css";

const JwButton1 = (props) => {
    const clickEvent = props.clickEvent;
    const text = props.text;

    return (
        <>
            <button className="jwBtn jwBtnst1" type="button" onClick={clickEvent}>
                {text}
            </button>
        </>
    );
};

const JwButton2 = (props) => {
    const clickEvent = props.clickEvent;
    const text = props.text;

    return (
        <>
            <button className="jwBtn jwBtnst2" type="button" onClick={clickEvent}>
                {text}
            </button>
        </>
    );
};

const JwButton3 = (props) => {
    const clickEvent = props.clickEvent;
    const text = props.text;

    return (
        <>
            <button className="jwBtn jwBtnst3" type="button" onClick={clickEvent}>
                {text}
            </button>
        </>
    );
};

export { JwButton1, JwButton2 , JwButton3  };
