import React, { useEffect } from 'react'
import '../../styles/home.scss'
import { useAppDispatch, useAppSelector } from '../../lib/hooks'
import { selectFooterDrawerIsOpen, toggleIsOpen } from './footerDrawerSlice'

type Props = {
}

type DrawerPeekData = {
  cssClassName: string,
  iconId: string,
  handleText: string,
}

export const footerDrawer = (props: Props) => {
  const dispatch = useAppDispatch();
  const drawerIsOpen = useAppSelector(selectFooterDrawerIsOpen);
  
  const data: DrawerPeekData = getDrawerPeekData();
  
  const handleClick = () => {
    dispatch(toggleIsOpen())
  }

  return (
    <div id="footer-drawer" className={data.cssClassName} onClick={handleClick}>{data.handleText}
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <span className="material-symbols-outlined"> {data.iconId} </span>
    </div>
  )

  function getDrawerPeekData(): DrawerPeekData {
    if(drawerIsOpen) {
      return {
          cssClassName: 'home__overlay__bottom-drawer-open',
          iconId: 'expand_more',
          handleText: 'Hide View',
        }
      }
      else {
        return {
            cssClassName: 'home__overlay__bottom-drawer-closed',
            iconId: 'expand_less',
            handleText: 'Trace Table',
          }
      }
  }
}


export default footerDrawer
