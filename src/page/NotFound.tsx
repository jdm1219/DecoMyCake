import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className='not-found'>
      <h3>페이지를 찾을 수 없어요😢</h3>
      <button onClick={() => navigate('/')} className='button'>메인으로</button>
    </div>
  );
}

export default NotFound;