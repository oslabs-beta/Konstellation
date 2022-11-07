import React, { useEffect } from 'react'
import '../../styles/home.scss'
import { useAppDispatch, useAppSelector } from '../../lib/hooks'
import { selectTraceTableDrawerIsOpen, toggleIsOpen } from './drawerSlice'
import FooterDrawerHandle, {DrawerTabProps} from './footerDrawerTab'
import TraceTable from './traceTableContent'

/**
   * Parent level component for managing "Drawer"-type elements in the window's Footer.
   * @renders Either a "Tab" at the bottom of the page when closed OR an expanded window when opened.
   * @remarks Currently features a hard-coded implementation of a TraceTable but can be quickly repurposed for reusability via prop-drilling.
   */
export const footerDrawer = () => {
  const dispatch = useAppDispatch();
  const drawerIsOpen = useAppSelector(selectTraceTableDrawerIsOpen);
  
  const data: DrawerTabProps = getDrawerTabData();

/**
   * Updates when drawer's @see {drawerIsOpen} is opened or closed. Will subsequently trigger the drawer to open or close via CSS Animation.
   * @Reference See home.scss for additional context
   */
  let cssId = drawerIsOpen ? 'drawer-opened' : 'drawer-closed'

  const handleClick = () => {
    dispatch(toggleIsOpen())
  }

  return (
      <div id={cssId}>
        <FooterDrawerHandle handleClick={handleClick} iconId={data.iconId} handleText={data.handleText} />
        <TraceTable />
      </div>
  )

/**
   * Helper function which assigns data based on drawer's opened or closed state
   */
  function getDrawerTabData(): DrawerTabProps {
    if(drawerIsOpen) {
      return {
          iconId: 'expand_more',
          handleText: 'Hide View',
        }
      }
      else {
        return {
            iconId: 'expand_less',
            handleText: 'Trace Table',
          }
      }
  }
}

export default footerDrawer
