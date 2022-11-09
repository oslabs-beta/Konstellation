import React from 'react'
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../lib/hooks';
import { selectSpanDataList } from './spanDataSlice';
import '../../styles/spanTable.scss'

const spanData= (props: any) => {
 
  // console.log(props) 

const { data } = useSelector(selectSpanDataList)
const dispatch = useAppDispatch();
  
const jsxElements = (() => {
  const result: Array<Array<JSX.Element>> = []

  for (let i = 0; i < data.length; i++) {
    const e = data[i];

    const entryKey = `span-data-entry-${i}`
    // console.log(e)

    //will need to use a forEach loop to iterate through the data to place on each span-data-sinle-entry

    result.push([
      <div key={entryKey} className='span-data-single-entry'>
        <div className="span-data-entry-individual">
          data: {data[i]}
        </div>
      </div>
    ])
  }

  // onClick={()=>loadSpanTableData(e.data.name)}

  return result;
})()

  return (
    <div>
      <div className="span-data-entry">
        hello {props.traceId}
      </div>
      <div>
        {jsxElements}
      </div>
    </div>
  )
};


export default spanData;