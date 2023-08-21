import { useEffect, useMemo, useState } from 'react';
import ChoiceDeco from './steps/ChoiceDeco';
import WriteText from './steps/WriteText';
import { useNavigate, useParams } from 'react-router-dom';
import { createPost, getPost } from '../api/post';
import { toast } from 'react-toastify';
import ChoiceReadingDate from './steps/ChoiceReadingDate';
import { useRecoilValue } from 'recoil';
import { userState } from '../atoms/user';
import useApiLoading from '../hooks/useApiLoading';

const WriteModal = () => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userState);
  const { userId } = useParams();
  const [step, setStep] = useState(1);
  const [content, setContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [readingDate, setReadingDate] = useState('');

  const { isLoading, error, execute } = useApiLoading(() => createPost({
    id: userId as string,
    content,
    fileName,
    readingDate,
  }));

  const isMyPage = useMemo(() => {
    return userId === userInfo?.id;
  }, [userId, userInfo]);

  useEffect(() => {
    if (isMyPage) {
      toast.error('본인의 케이크는 꾸밀수 없어요😢');
      navigate('../', { relative: 'path', replace: true });
    }
  }, []);

  const closeModal = (event?: React.MouseEvent) => {
    event?.preventDefault?.();
    navigate(-1);
  };


  const submit = async () => {
    if (isLoading) {
      return;
    }
    await execute();
    if (error) {
      toast.error('등록에 실패했어요😢');
      return;
    }
    toast.success('등록되었습니다😊');
    closeModal();
  };


  return (
    <div className='write-modal-container'>
      <div className='write-modal-content'>
        <i className='close-button' onClick={closeModal}></i>
        {
          {
            1: <ChoiceDeco
              fileName={fileName}
              setFileName={setFileName}
              setStep={setStep}
            />,
            2: <WriteText
              content={content}
              setContent={setContent}
              setStep={setStep}
            />,
            3: <ChoiceReadingDate
              setReadingDate={setReadingDate}
              setStep={setStep}
              submit={submit}
            />,
          }[step]
        }
      </div>
    </div>
  );
};

export default WriteModal;