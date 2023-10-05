const Radio = (props) => {
  const data = props.data;
  const setData = props.setData;
  const content = props.content;
  const blurEvent = props.blurEvent;
  const name = props.name;
  const changeValue = (e) => {
    const inputValue = e.currentTarget.value;
    setData(inputValue);
  };
  return (
    <>
      <input
        id={content}
        className="radio-btn"
        name={name}
        type="radio"
        value={data || ""}
        onChange={changeValue}
        onBlur={blurEvent}
      ></input>
    </>
  );
};

export default Radio;
