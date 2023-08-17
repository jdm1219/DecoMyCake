import React, { Dispatch, SetStateAction } from 'react';
import {toast} from "react-toastify";

interface Props {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  setStep: Dispatch<SetStateAction<number>>;
}

const WriteText = ({ content, setContent, setStep}: Props) => {
  const handleSetContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const prevStep = () => {
    setStep(1);
  }

  const nextStep = () => {
    if(!content) {
      toast.error('장식을 선택해주세요');
      return;
    }
    setStep(3);
  }

  return (
    <>
      <h3>메세지를 작성해주세요</h3>
      <div className='deco-write-container'>
        <textarea name='content' value={content} onChange={handleSetContent} />
      </div>
      <button className='button' onClick={prevStep}>이전으로</button>
      <button className='button' onClick={nextStep}>다음으로</button>
    </>
  );
};

export default WriteText;