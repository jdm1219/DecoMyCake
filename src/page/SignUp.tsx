import { useState } from 'react';
import { signUp } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUp = () => {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const join = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }
    if (!validateForm()) {
      return;
    }
    try {
      setIsLoading(true);
      await signUp({ id, password, nickname });
      toast.success('회원가입 되었습니다😊');
      navigate('/sign-in');
    } catch (err: any) {
      toast.error(err.message || '알수없는 에러가 발생했어요');
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    let errorMessage = '';
    const NICKNAME_EXP = /^[가-힣a-zA-Z0-9]{2,8}$/;
    const ID_EXP = /^[a-zA-Z0-9]{4,16}$/;
    if (!nickname) {
      errorMessage = '닉네임을 입력해주세요';
    } else if (!NICKNAME_EXP.test(nickname)) {
      errorMessage = '닉네임은 특수문자를 사용할 수 없어요';
    } else if (!id) {
      errorMessage = '아이디를 입력해주세요';
    } else if (!ID_EXP.test(id)) {
      errorMessage = '아이디를 영어대소문자,숫자로만 이루어진 4~16자로 입력해주세요';
    } else if (!password) {
      errorMessage = '비밀번호를 입력해주세요';
    } else if (password.length < 4 || password.length > 16) {
      errorMessage = '비밀번호를 4~16자로 입력해주세요';
    }

    if (errorMessage) {
      toast.error(errorMessage);
      return false;
    }
    return true;
  };

  return (
    <div className='join-form-wrap'>
      <h2>회원가입</h2>
      <form className='join-form'>
        <p>
          <input className='input' type='text' id='nickname' name='nickname' maxLength={8}
                 onChange={e => setNickname(e.target.value)} placeholder='닉네임'
                 required />
        </p>
        <p>
          <input className='input' type='text' id='userId' name='userId' maxLength={16}
                 onChange={e => setId(e.target.value)} placeholder='아이디' required />
        </p>
        <p>
          <input className='input' type='password' id='password' name='password'
                 onChange={e => setPassword(e.target.value)}
                 placeholder='비밀번호' required />
        </p>
        <p>
          <button className='button' onClick={join}>회원가입</button>
        </p>
      </form>
    </div>
  );
};
export default SignUp;