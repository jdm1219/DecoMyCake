import { useState } from 'react';
import { signIn } from '../api/auth';
import axios from 'axios';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { accessTokenState } from '../atoms/user';
import { toast } from 'react-toastify';

const SignIn = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const setAccessToken = useSetRecoilState(accessTokenState);

  const login = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const { accessToken } = await signIn({ id, password });
      setAccessToken(accessToken);
      navigate(searchParams.get('redirect') || `/cake/${id}`);
    } catch (err: any) {
      toast.error(err.message || '알수없는 에러가 발생했어요');
    }
  };

  return (
    <div className='login-form-wrap'>
      <h2>로그인</h2>
      <form className='login-form'>
        <p>
          <input className='input' type='text' id='useId' name='useId' onChange={e => setId(e.target.value)}
                 placeholder='아이디' required />
        </p>
        <p>
          <input className='input' type='password' id='password' name='password'
                 onChange={e => setPassword(e.target.value)} placeholder='비밀번호' required />
        </p>
        <p>
          <button className='button' onClick={login}>로그인</button>
        </p>
      </form>
      <div className='create-account-wrap'>
        <p>회원이 아니신가요?
          <Link to='/sign-up'><a href='#'>회원가입</a></Link></p><p>
      </p></div>
    </div>
  );
};
export default SignIn;