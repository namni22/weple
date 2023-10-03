import "./jwInputFrm.css";

const JwInput = (props) => {
  const data = props.data; //state
  const setData = props.setData; //함수
  const type = props.type;
  const content = props.content;
  const blurEvent = props.blurEvent;

  const changeValue = (e) => {
    const inputValue = e.currentTarget.value;
    setData(inputValue);
  };
  return (
    <>
      <input
        id={content}
        className="jwInput-form"
        type={type}
        value={data || ""}
        onChange={changeValue}
        // blur : 여기서쓰는이벤트 이름
        onBlur={blurEvent}
      ></input>
    </>
  );
};

export default JwInput;
