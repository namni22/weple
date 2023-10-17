import { useEffect } from "react";
import "./payment.css";
import { useState } from "react";
import moment from "moment/moment";
import { Button1 } from "../util/Button";

const Payment = (props) => {
  const [count, setCount] = useState(1);
  const [payPrice, setPayPrice] = useState(10000);
  const formatDate = moment().format("YYYY-MM-DD HH:mm");
  const id = props.id;
  const minus = () => {
    if (count <= 1) {
      return;
    }
    setCount(count - 1);
  };
  const plus = () => {
    if (count >= 10) {
      return;
    }
    setCount(count + 1);
  };
  useEffect(() => {
    // count 랜더링
    setPayPrice(10000 * count);
  }, [count]);

  // IMP.init("imp62626506");
  function doPayment() {
    // IMP.request_pay({});
  }
  return (
    <div className="payment-wrap">
      <div className="payment-top">결제</div>
      {id}
      <div className="payment-mid">
        <table>
          <tbody>
            <tr>
              <td>회원 아이디</td>
              <td>{props.member.memberId}</td>
            </tr>
            <tr>
              <td>잔여 모임</td>
              <td>{props.member.memberMeet}</td>
            </tr>
            <tr>
              <td>결제일시</td>
              <td>{formatDate}</td>
            </tr>
            <tr>
              <td>수량</td>
              <td>
                <span class="material-icons" onClick={minus}>
                  remove_circle_outline
                </span>
                {count}
                <span class="material-icons" onClick={plus}>
                  add_circle_outline
                </span>
              </td>
            </tr>
            <tr>
              <td>결제 후 잔여 모임</td>
              <td>{props.member.memberMeet + count}</td>
            </tr>

            <tr>
              <td>결제금액</td>
              <td>{payPrice.toString()} 원</td>
            </tr>
          </tbody>
        </table>
        <Button1 text="결제" clickEvent={doPayment} />
      </div>
    </div>
  );
};

export default Payment;
