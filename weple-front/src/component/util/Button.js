import "./button.css";

const Button1 = (props) => {
  const clickEvent = props.clickEvent;
  const text = props.text;
  const disable = props.disable;
  const dValue = props.dValue;
  return (
    <>
      <button
        className="btn btn1"
        type="button"
        onClick={clickEvent}
        disabled={disable}
        defaultValue={dValue}
      >
        {text}
      </button>
    </>
  );
};

const Button2 = (props) => {
  const clickEvent = props.clickEvent;
  const text = props.text;
  const disable = props.disable;
  return (
    <>
      <button
        className="btn btn2"
        type="button"
        onClick={clickEvent}
        disabled={disable}
      >
        {text}
      </button>
    </>
  );
};

const Button3 = (props) => {
  const clickEvent = props.clickEvent;
  const text = props.text;
  const disable = props.disable;
  return (
    <>
      <button
        className="btn btn3"
        type="button"
        onClick={clickEvent}
        disabled={disable}
      >
        {text}
      </button>
    </>
  );
};

export { Button1, Button2, Button3 };
