import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/reset.css';
import './fonts/fonts.css';
import './css/common.css';
import './utils/vh';
import reportWebVitals from './reportWebVitals';
import Main from './page/Main';
import SignIn from './page/SignIn';
import SignUp from './page/SignUp';
import Cake from './page/Cake';
import WriteModal from './page/WriteModal';
import NotFound from './page/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
  {
    path: '/cake/:userId',
    element: <Cake />,
    children: [
      {
        path: 'write',
        element: <WriteModal />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <RecoilRoot>
    <RouterProvider
      router={router}
      fallbackElement={<div>Loading...</div>} />
    <ToastContainer
      position='bottom-center'
      autoClose={1500}
      closeButton={false}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      theme='colored'
    />
  </RecoilRoot>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
