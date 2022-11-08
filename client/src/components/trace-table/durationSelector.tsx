import e from 'express'
import React, {useEffect, useRef, useState} from 'react'
import { useAppDispatch } from '../../lib/hooks';
import { getTraceTableDataAsync } from './tableListSlice';

type Props = {}

/**
   * Allows for the selection of a single element from a collection of elements.
   * @remarks Currently features a hard-coded implementation for a TraceTable but can be repurposed for reusability via prop-drilling.
   * @renders A "duration selector" with five individual elements inside which can be selected via mouse click.
   */
const durationSelector = (props: Props) => {

  const dispatch = useAppDispatch();
  const [activeDuration, setActiveDuration] = useState(-1)
  
  const refs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ]

  useEffect(() => {
    if(activeDuration === -1) {
      updateActiveDuration(4);
    }
  });

  const durations = [
    <div ref={refs[0]} id="duration-selector-all" onClick={() => handleClick(0)} key="duration-selector-all">All</div>,
    <div ref={refs[1]} id="duration-selector-15m" onClick={() => handleClick(1)} key="duration-selector-15m">15m</div>,
    <div ref={refs[2]} id="duration-selector-5m" onClick={() => handleClick(2)} key="duration-selector-5m">5m</div>,
    <div ref={refs[3]} id="duration-selector-2m" onClick={() => handleClick(3)} key="duration-selector-2m">2m</div>,
    <div ref={refs[4]} id="duration-selector-1m" onClick={() => handleClick(4)} key="duration-selector-1m">1m</div>,
  ]

  function handleClick(index: number): any {
    updateActiveDuration(index);
    fetchDurationTraceData(index);
  }
  function updateActiveDuration(index: number) {
    setActiveDuration(index);
    console.log("INDEX IS" + index + " in updateActiveDuration")
    refs.forEach((ref, i)=> {
      if (i === index) {
        ref.current?.setAttribute('class', 'duration-selector-active')
      }
      else {
        ref.current?.setAttribute('class', 'duration-selector')
      }
    })
  }

  function fetchDurationTraceData(index: number) {
    let lookback:string;
    console.log(`INDEX = ${index}`)
    switch(index) {
      case 0: lookback = "2d"; break;
      case 1: lookback = "15m"; break;
      case 2: lookback = "5m"; break;
      case 3: lookback = "2m"; break;
      case 4: lookback = "1m"; break;
      default: lookback = "2d"; break;
    }
    dispatch(getTraceTableDataAsync(lookback))
  }

  return (
    <div id="duration-selector">
      {durations}
    </div>
  )
}

export default durationSelector