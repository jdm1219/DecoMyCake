import React, { Dispatch, SetStateAction } from 'react';

interface Props {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}

const WriteText = ({ content, setContent }: Props) => {
  const handleSetContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <>
      <h3>메세지를 작성해주세요</h3>
      <div className='deco-write-container'>
        <textarea name='content' value={content} onChange={handleSetContent} />
      </div>
    </>
  );
};

export default WriteText;