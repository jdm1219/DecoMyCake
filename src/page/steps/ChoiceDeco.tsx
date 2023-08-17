import React, { SetStateAction, Dispatch } from 'react';

interface Props {
  fileName: string;
  setFileName: Dispatch<SetStateAction<string>>;
}

const ChoiceDeco = ({ fileName, setFileName }: Props) => {
  const CANDLE_IMAGES = ['candle1.png', 'candle2.png', 'candle3.png', 'candle4.png', 'candle5.png'];

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
    </>
  );

};

export default ChoiceDeco;