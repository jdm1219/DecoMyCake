import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { verify } from '../api/auth';
import { useRecoilValue } from 'recoil';
import { userState } from '../atoms/user';

const Main = () => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userState);
  const checkLogIn = async () => {
    try {
      await verify();
      navigate(`/cake/${userInfo?.id}`);
    } catch (error) {
      console.log('not logged in');
    }
  };
  checkLogIn();

  return (
    <div className='main'>
      <header className='main-header'>
        <h2>내 케이크를 꾸며줘</h2>
        <h3>친구와 마음을 주고 받으세요</h3>
      </header>
      <section>
        <Link to='/sign-in'>
          <button className='button'>로그인</button>
        </Link>
        <Link to='/sign-up'>
          <button className='button'>가입하기</button>
        </Link>
      </section>
    </div>
  );
};

export default Main;
