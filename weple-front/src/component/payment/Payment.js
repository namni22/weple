import { useEffect } from "react";
import "./payment.css";
import { useState } from "react";
import moment from "moment/moment";
import { Button1 } from "../util/Button";
import axios from "axios";
import Swal from "sweetalert2";

const Payment = (props) => {
  const [count, setCount] = useState(1);
  const [payPrice, setPayPrice] = useState(10000);
  const formatDate = moment().format("YYYY-MM-DD HH:mm");
  const id = props.id;
  const IMP = window.IMP;
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

  IMP.init("imp62626506");
  const doPayment = () => {
    IMP.request_pay(
      {
        pg: "html5_inicis",
        pay_method: "card",
        merchant_uid: "상품번호_" + formatDate,
        name: "결제테스트",
        amount: 1,
        buyer_name: "ㅇ",
        buyer_tel: "010-1111-1111",
        buyer_postcode: "12345",
      },
      function (rsp) {
        if (rsp.success) {
          axios
            .post("/payment/paySuccess", {
              memberNo: props.member.memberNo,
              payCount: count,
              payPrice: payPrice,
              payDate: formatDate.toString(),
            })
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
          Swal.fire("결제가 완료되었습니다.");
        } else {
          Swal.fire("결제가 취소되었습니다.");
        }
      }
    );
  };
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
