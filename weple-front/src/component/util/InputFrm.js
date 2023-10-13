import "./inputFrm.css";

const Input = (props) => {
  const data = props.data;
  const setData = props.setData;
  const type = props.type;
  const content = props.content;
  const blurEvent = props.blurEvent;
  const placeholder = props.placeholder;
  const enter = props.enter;
  const readOnly = props.readOnly;
  const changeValue = (e) => {
    const inputValue = e.currentTarget.value;
    setData(inputValue);
  };
  return (
    <>
      <input
        id={content}
        className="input-form"
        type={type}
        value={data || ""}
        onChange={changeValue}
        onBlur={blurEvent}
        onKeyPress={enter}
        placeholder={placeholder}
        readOnly={readOnly}
      ></input>
    </>
  );
};
export default Input;
