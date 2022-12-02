import React from 'react';
import { useAppSelector } from '../../lib/hooks';
import SpanData from './spanData';
import { selectSpanResultsMap, spanViewType } from './spanResultsMapSlice';
import '../../styles/home.scss';

interface Props {
  spanData?: any;
}

const spanResultsMap = (Props: Props) => {
  const renderType = useAppSelector(selectSpanResultsMap);

  const render =
    renderType.type === spanViewType.render ? (
      <SpanData spanData={Props.spanData} />
    ) : null;

  return (
    <>
      <div className="span-results-map">{render}</div>
    </>
  );
};

export default spanResultsMap;
