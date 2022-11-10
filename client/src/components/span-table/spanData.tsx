import React from 'react'
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../lib/hooks';
import { selectSpanDataList } from './spanDataSlice';
import '../../styles/spanTable.scss'

const spanData= (props: any) => {
 
  console.log(props) 
  console.log('props.spanData.duration', props.spanData.duration)

// const { data } = useSelector(selectSpanDataList)
const dispatch = useAppDispatch();
  
const jsxElements = (() => {
  const result: Array<Array<JSX.Element>> = []

  const tags = props.spanData.tags

  for (let i = 0; i < tags.length; i++) {
    const e = tags[i];

    const entryKey = `span-data-tag-entry-${i}`
    // console.log(e)

    const key = tags[i].key
    const type = tags[i].type
    const value = tags[i].value

    result.push([
      <div key={entryKey} className='span-data-tag-entry'>
        <div className="span-data-entry">
          {i}: [Key: {key}, Type: {type}, Value: {value}]
        </div>
      </div>
    ])
  }

  // onClick={()=>loadSpanTableData(e.data.name)}

  return result})()

  const jsxWarnings = (() => {
    const result: Array<Array<JSX.Element>> = []
  
    const warnings = props.spanData.warnings
    
    if (warnings === null) {return 'null'}

    for (let i = 0; i < warnings.length; i++) {
      const e = warnings[i];
  
      const entryKey = `span-data-tag-entry-${i}`
      // console.log(e)
  
    
  
      result.push([
        <div key={entryKey} className='span-data-tag-entry'>
          <div className="span-data-entry">
            {e}
          </div>
        </div>
      ])
    }
    return result})()

  return (
    <div>
      <div className="span-data-entry"> ProcessID: {props.spanData.processID} </div>
      <div className="span-data-entry"> Duration: {props.spanData.duration} </div>
      <div className="span-data-entry"> Operation Name: {props.spanData.operationName} </div>
      <div className="span-data-entry"> Start Time: {props.spanData.startTime} </div>
      <div className="span-data-entry"> Warnings: {jsxWarnings}</div>
      <div className="span-data-entry"> Tags: {jsxElements}</div>
    </div>
  )
}

  



export default spanData;