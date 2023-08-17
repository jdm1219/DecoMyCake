import {useState} from "react";
import {signUp} from "../api/auth";
import axios from "axios";
import {Link} from "react-router-dom";

const SignUp = () => {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const join = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const data = await signUp({id, password, nickname});
      console.log(data);
    } catch (err) {
      if (axios.isAxiosError(err))  {
        alert(err.response?.data?.message);
      } else {
        console.log(err);
      }
    }
  }

  return (
    <div className="join-form-wrap">
      <h2>회원가입</h2>
      <form className="join-form">
        <p>
          <input className="input" type="text" id="nickname" name="nickname" onChange={e => setNickname(e.target.value)} placeholder="닉네임"
                 required/>
        </p>
        <p>
          <input className="input" type="text" id="useId" name="useId" onChange={e => setId(e.target.value)} placeholder="아이디" required/>
        </p>
        <p>
          <input className="input" type="password" id="password" name="password" onChange={e => setPassword(e.target.value)}
                 placeholder="비밀번호" required/>
        </p>
        <p>
          <button className="button" onClick={join}>회원가입</button>
        </p>
      </form>
    </div>
  )
}
export default SignUp;