import { useEffect, useMemo, useState } from 'react';
import ChoiceDeco from './steps/ChoiceDeco';
import WriteText from './steps/WriteText';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { createPost } from '../api/post';
import { toast } from 'react-toastify';
import ChoiceReadingDate from './steps/ChoiceReadingDate';
import { useRecoilValue } from 'recoil';
import { userState } from '../atoms/user';

interface Props {
  execute: () => Promise<void>;
}

const WriteModal = () => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userState);
  const { execute } = useOutletContext<Props>();
  const { userId } = useParams();
  const [step, setStep] = useState(1);
  const [content, setContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [readingDate, setReadingDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    try {
      setIsLoading(true);
      await createPost({
        id: userId as string,
        content,
        fileName,
        readingDate,
      });
      toast.success('등록되었습니다😊');
      await execute();
      closeModal();
    } catch {
      toast.error('등록에 실패했어요😢');
    } finally {
      setIsLoading(false);
    }
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