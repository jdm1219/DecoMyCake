import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { verify } from '../api/auth';
import { useRecoilValue } from 'recoil';
import { userState } from '../atoms/user';

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = useRecoilValue(userState);

  const checkLogIn = async () => {
    try {
      await verify();
      if (location.pathname === '/') {
        navigate(`/cake/${userInfo?.id}`);
      }
    } catch (error) {
      console.log('not logged in');
    }
  };
  useEffect(() => {
    checkLogIn();
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
}

export default Layout;