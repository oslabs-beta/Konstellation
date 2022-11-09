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
  const {all, long, medium, short, micro} = {
    all: 'All', 
    long: '15m',
    medium: '5m',
    short: '2m',
    micro: '1m',
  }

  const {allId, longId, mediumId, shortId, microId} = {
    allId: `duration-selector-${all}`,
    longId: `duration-selector-${long}`,
    mediumId: `duration-selector-${medium}`,
    shortId: `duration-selector-${short}`,
    microId: `duration-selector-${micro}`
  }
  
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
    <div ref={refs[0]} id={allId} onClick={() => handleClick(0)} key={allId}>{all}</div>,
    <div ref={refs[1]} id={longId} onClick={() => handleClick(1)} key={longId}>{long}</div>,
    <div ref={refs[2]} id={mediumId} onClick={() => handleClick(2)} key={mediumId}>{medium}</div>,
    <div ref={refs[3]} id={shortId} onClick={() => handleClick(3)} key={shortId}>{short}</div>,
    <div ref={refs[4]} id={microId} onClick={() => handleClick(4)} key={microId}>{micro}</div>,
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
      case 1: lookback = long; break;
      case 2: lookback = medium; break;
      case 3: lookback = short; break;
      case 4: lookback = micro; break;
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