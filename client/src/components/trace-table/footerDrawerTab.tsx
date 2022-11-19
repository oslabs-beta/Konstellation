import React from 'react';

export type DrawerTabProps = {
  handleClick?: () => void;
  handleText: string;
  iconId: string;
};
/**
 * Renders a single Tab for a Footer Drawer Component
 * @remarks This component is currently hard-coded to render a tab for the Trace Table
 * @beta This component should be refactored for reusability
 */
const footerDrawerTab = ({
  handleClick,
  handleText,
  iconId,
}: DrawerTabProps) => {
  return (
    <div
      className="footer-drawer-tab"
      id="trace-table-tab"
      onClick={handleClick}
    >
      {handleText}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,
        FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <span className="material-symbols-outlined"> {iconId} </span>
    </div>
  );
};

export default footerDrawerTab;
