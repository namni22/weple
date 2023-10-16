import { useEffect } from "react";
import "./payment.css";
import { useState } from "react";
const Payment = ()=>{
    const [count, setCount] = useState(1);
    const minus =()=>{
        setCount(count - 1);
    }
    const plus =()=>{
        setCount(count + 1);
    }
    useEffect(()=>{
        // count 랜더링
    },[count]);
    return (
      <div className="payment-wrap">
        <div className="payment-top">결제top</div>
        <div className="payment-mid">
          <div>회원정보 : test</div>
          <div>개설가능모임 개수 : 1</div>
          <div>
            수량 :<span class="material-icons" onClick={minus}>remove_circle_outline</span>{count}
            <span class="material-icons" onClick={plus}>add_circle_outline</span>
          </div>
        </div>
      </div>
    );
}

export default Payment;