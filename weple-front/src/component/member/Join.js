import { useState } from "react";

const Join = () => {
  const [allAgree, setAllAgree] = useState(false);
  const [agreement, setAgreement] = useState({
    termsAgree: false,
    personalInfoAgree: false,
    eventAlarmAgree: false,
  });

  const agreeChecked = (event) => {
    const { name, checked } = event.target;
    setAgreement((prevAgreement) => ({ ...prevAgreement, [name]: checked }));
  };
  return (
    <div className="join-wrap">
      <div className="join-title">
        <h3>이용약관</h3>
      </div>
      <div className="join-content"></div>
    </div>
  );
};

export default Join;
