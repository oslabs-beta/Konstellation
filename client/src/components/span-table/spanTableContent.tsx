import React from 'react';
import '../../styles/spanTable.scss';
import SpanList from './spanList';
import SpanHeader from './spanHeader';

/**
 * Renders the content held within the Trace Table Drawer
 * @Remarks Renders all content for the main portion of the Trace Table Drawer
 */
const traceTableContent = () => {
  return (
    <div id="span-table-content">
      <SpanHeader />
      <SpanList />
    </div>
  );
};

export default traceTableContent;
