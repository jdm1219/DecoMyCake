import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/reset.css';
import './fonts/fonts.css';
import './css/common.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './page/Main';
import SignIn from './page/SignIn';
import SignUp from './page/SignUp';
import Cake from './page/Cake';
import WriteModal from './page/WriteModal';
import { RecoilRoot } from 'recoil';

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
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <RecoilRoot>
    <RouterProvider
      router={router}
      fallbackElement={<div>Loading...</div>} />
  </RecoilRoot>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
