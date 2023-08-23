import React, { useEffect, useMemo, useState } from 'react';
import { createSearchParams, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getPost, Post } from '../api/post';
import usePagination from '../hooks/usePagination';
import useApiLoading from '../hooks/useApiLoading';
import { useRecoilValue } from 'recoil';
import { userState } from '../atoms/user';
import { toast } from 'react-toastify';
import NotFound from './NotFound';

const PAGE_SIZE = 10;

const Cake = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = useRecoilValue(userState);
  const { userId } = useParams();
  const [page, setPage] = useState(1);
  const isMyPage = useMemo(() => {
    return userId === userInfo?.id;
  }, [userId, userInfo]);

  const { isLoading, data, error, execute } = useApiLoading(() => getPost({
    id: userId || '',
    page,
    size: PAGE_SIZE,
  }));

  const fetchPost = async () => {
    if (!userId) return;
    await execute();
  };
  useEffect(() => {
    fetchPost();
  }, [page]);

  const total = useMemo(() => {
    return data?.total;
  }, [data]);
  const posts = useMemo<Post[]>(() => {
    return data?.content || [];
  }, [data]);


  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('링크가 복사되었습니다.');
  };

  const openCreatePostModal = () => {
    navigate(`./write`, { relative: 'path' });
  };

  if (error) {
    switch (error.status) {
      case 401:
        toast.info('로그인 후 이용할 수 있어요😊');
        navigate(`/sign-in?${createSearchParams({ redirect: location.pathname })}`);
        return <></>;
      case 404:
        return <NotFound />;
      default:
        return <div>에러가 발생했습니다.</div>;
    }
  }
  return (
    <div className='cake-container'>
      <h3>
        {userId}님에게<br />
        <strong>{total}</strong>개의 메세지가 전달됐어요!
      </h3>
      <div className='cake-content'>
        <div className='cake-image'>
          {posts?.map(post => (
            <div className='cake-deco'><img src={`${process.env.PUBLIC_URL}/assets/${post.fileName}`} alt='' /></div>))}
          <img src={`${process.env.PUBLIC_URL}/assets/cake.png`} alt='' />
        </div>
      </div>
      {
        isMyPage
          ? (
            <>
              <button onClick={copyLink} className='button'>케이크 링크 복사하기</button>
            </>
          )
          : (
            <button onClick={openCreatePostModal} className='button'>케이크 꾸며주기</button>
          )
      }
      <Outlet />
    </div>
  );
};

export default Cake;