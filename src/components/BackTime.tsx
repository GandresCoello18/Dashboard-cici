/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { Box } from '@material-ui/core';
import { useTimer } from 'react-timer-hook';

interface Props {
  expiryTimestamp: number;
  SetIsRunning: Dispatch<SetStateAction<boolean>>;
}

export const BackTime = ({ expiryTimestamp, SetIsRunning }: Props) => {
  const { seconds, minutes, hours, days, start, pause } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      console.log('expiro ya');
      SetIsRunning(false);
      pause();
    },
  });

  useEffect(() => {
    start();
  }, [start]);

  return (
    <Box p={2}>
      <div className='time'>
        <span className='dice'>Días: {days}</span>
        <span className='split'>:</span>
        <span className='dice'>Horas: {hours}</span>
        <span className='split'>:</span>
        <span className='dice'>M: {minutes}</span>
        <span className='split'>:</span>
        <span className='dice'>S: {seconds}</span>
      </div>
    </Box>
  );
};
