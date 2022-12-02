import React from 'react';
import '../../styles/spanTable.scss';

const spanData = (props: any) => {

  const jsxElements = (() => {
    const result: Array<Array<JSX.Element>> = [];

    const tags = props.spanData.tags;

    for (let i = 0; i < tags.length; i++) {
      const e = tags[i];

      const entryKey = `span-data-tag-entry-${i}`;

      const key = tags[i].key;
      const type = tags[i].type;
      const value = tags[i].value;

      result.push([
        <div key={entryKey} className="span-data-tag-entry">
          <div className="span-data-entry">
            {i}: [<span className="boldSpanTag">Key: </span>
            {key}, <span className="boldSpanTag">Type: </span>
            {type}, <span className="boldSpanTag">Value: </span>
            {value}]
          </div>
        </div>,
      ]);
    }

    return result;
  })();

  const jsxWarnings = (() => {
    const result: Array<Array<JSX.Element>> = [];

    const warnings = props.spanData.warnings;

    if (warnings === null) {
      return 'null';
    }

    for (let i = 0; i < warnings.length; i++) {
      const e = warnings[i];

      const entryKey = `span-data-tag-entry-${i}`;

      result.push([
        <div key={entryKey} className="span-data-tag-entry">
          <div className="span-data-entry">{e}</div>
        </div>,
      ]);
    }
    return result;
  })();

  const startTime = props.spanData.startTime;

  const time: any = new Date(startTime / 1000).toString();

  return (
    <div>
      <div className="span-data-entry">
        {' '}
        <span className="boldItalicsSpan span-label">ProcessID: </span>
        {props.spanData.processID}{' '}
      </div>
      <div className="span-data-entry">
        {' '}
        <span className="boldItalicsSpan span-label">Duration: </span>
        {props.spanData.duration} μs
      </div>
      <div className="span-data-entry">
        {' '}
        <span className="boldItalicsSpan span-label">Operation Name: </span>
        {props.spanData.operationName}{' '}
      </div>
      <div className="span-data-entry">
        {' '}
        <span className="boldItalicsSpan span-label">Start Time: </span>
        {time}{' '}
      </div>
      <div className="span-data-entry">
        {' '}
        <span className="boldItalicsSpan span-label">Warnings: </span>
        {jsxWarnings}
      </div>
      <div className="span-data-entry">
        {' '}
        <span className="boldItalicsSpan span-label">Tags: </span>
        {jsxElements}
      </div>
    </div>
  );
};

export default spanData;
