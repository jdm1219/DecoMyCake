import React, {Dispatch, SetStateAction, useEffect, useMemo, useState} from 'react';
import IosSelector from '../../utils/iosDatepicker';
import '../../css/datePicker.css'
import dayjs from "dayjs";
import {toast} from "react-toastify";

interface Props {
  setReadingDate: Dispatch<SetStateAction<string>>;
  setStep: Dispatch<SetStateAction<number>>;
  submit: () => void;
}

function ChoiceReadingDate({setReadingDate, setStep, submit}: Props) {
  const [remainDays, setRemainDays] = useState(1);

  useEffect(() => {
    setReadingDate(dayjs().add(remainDays, 'day').format('YYYY-MM-DD'))
  }, [remainDays])

  useEffect(() => {
    new IosSelector({
      el: '#remainDate',
      type: 'normal',
      source: Array(15).fill(null).map((_,v)=> ({value: v+1, text: `${v+1}일 후`})),
      count: 15,
      onChange: ({value}: {value: number}) => {
        setRemainDays(value);
      }
    });
  }, [])

  const prevStep = () => {
    setStep(2);
  }

  const nextStep = () => {
    if(!remainDays) {
      toast.error('날짜를 선택해주세요');
      return;
    }
    submit();
  }

  return (
    <>
      <h3>쪽지확인까지 남은일을 선택해주세요</h3>
      <div className='date-selector' id='remainDate'></div>
      <button className='button' onClick={prevStep}>이전으로</button>
      <button className='button' onClick={nextStep}>장식하기</button>
    </>
  );
}

export default ChoiceReadingDate;