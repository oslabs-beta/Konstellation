import e from 'express'
import React, {useEffect, useRef} from 'react'

type Props = {}

/**
   * Allows for the selection of a single element from a collection of elements.
   * @remarks Currently features a hard-coded implementation for a TraceTable but can be repurposed for reusability via prop-drilling.
   * @renders A "duration selector" with five individual elements inside which can be selected via mouse click.
   */
const durationSelector = (props: Props) => {
  
  const refs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ]

  useEffect(() => {
    updateActiveDuration(0);
  });

  const durations = [
    <div ref={refs[0]} id="duration-selector-all" onClick={() => updateActiveDuration(0)} key="duration-selector-all">All</div>,
    <div ref={refs[1]} id="duration-selector-24" onClick={() => updateActiveDuration(1)} key="duration-selector-24">24h</div>,
    <div ref={refs[2]} id="duration-selector-12" onClick={() => updateActiveDuration(2)} key="duration-selector-12">12h</div>,
    <div ref={refs[3]} id="duration-selector-4" onClick={() => updateActiveDuration(3)} key="duration-selector-4">4h</div>,
    <div ref={refs[4]} id="duration-selector-1" onClick={() => updateActiveDuration(4)} key="duration-selector-1">1h</div>,
  ]

  function updateActiveDuration(index: number) {
    refs.forEach((ref, i)=> {
      if (i === index) {
        ref.current?.setAttribute('class', 'duration-selector-active')
      }
      else {
        ref.current?.setAttribute('class', 'duration-selector')
      }
    })
  }

  return (
    <div id="duration-selector">
      {durations}
    </div>
  )
}

export default durationSelector