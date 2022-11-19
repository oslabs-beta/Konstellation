import React from 'react';
import '../../styles/traceTable.scss';
import TableContent from './tableList';
import TableHeader from './tableHeader';
import WindowHeader from './windowHeader';

/**
 * Renders the content held within the Trace Table Drawer
 * @Remarks Renders all content for the main portion of the Trace Table Drawer
 */
const traceTableContent = () => {
  return (
    <div id="trace-table-content">
      <WindowHeader />
      <TableHeader />
      <TableContent />
    </div>
  );
};

export default traceTableContent;
