import React, { SetStateAction, Dispatch } from 'react';
import { toast } from 'react-toastify';

interface Props {
  fileName: string;
  setFileName: Dispatch<SetStateAction<string>>;
  setStep: Dispatch<SetStateAction<number>>;
}

const ChoiceDeco = ({ fileName, setFileName, setStep }: Props) => {
  const CANDLE_IMAGES = ['candle.png', 'cherry.png', 'strawberry.png'];
  const nextStep = () => {
    if (!fileName) {
      toast.error('장식을 선택해주세요');
      return;
    }
    setStep(2);
  };

  return (
    <>
      <h3>장식을 선택하세요</h3>
      <div className='deco-select-container'>
        {
          CANDLE_IMAGES.map(image => (
            <label>
              <input type='radio' name='deco' checked={fileName === image} onChange={() => setFileName(image)} />
              <div className='deco-img-container'>
                <img src={`${process.env.PUBLIC_URL}/assets/${image}`} draggable='false' alt={image} />
              </div>
            </label>
          ))
        }
      </div>
      <button className='button' onClick={nextStep}>다음으로</button>
    </>
  );

};

export default ChoiceDeco;