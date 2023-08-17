import { useState } from 'react';
import ChoiceDeco from './steps/ChoiceDeco';
import WriteText from './steps/WriteText';
import { useNavigate, useParams } from 'react-router-dom';
import { createPost } from '../api/post';

const WriteModal = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [step, setStep] = useState(1);
  const [content, setContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [readingDate, setReadingDate] = useState('');
  const closeModal = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate(-1);
  };
  const submit = async () => {
    await createPost({
      id: userId as string,
      content,
      fileName,
      readingDate,
    });
  };


  return (
    <div className='write-modal-container'>
      <div className='write-modal-content'>
        <i className='close-button' onClick={closeModal}></i>
        {
          {
            1: <ChoiceDeco fileName={fileName} setFileName={setFileName} />,
            2: <WriteText content={content} setContent={setContent} />,
          }[step]
        }
      </div>
      <button className='button' onClick={() => setStep(step + 1)}>다음으로</button>
      <button className='button' onClick={() => setStep(step - 1)}>이전으로</button>
      <button className='button' onClick={submit}>장식하기</button>
    </div>
  );
};

export default WriteModal;