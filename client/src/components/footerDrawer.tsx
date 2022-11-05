import React, { useEffect } from 'react'
import '../styles/home.scss'
import { useAppDispatch, useAppSelector } from '../lib/hooks'
import { selectFooterButtonFullscreen as selectFooterDrawerIsOpen, toggleIsOpen } from './footerDrawerSlice'

type Props = {
}

export const footerDrawer = (props: Props) => {

  let idName = "home__overlay__bottom-drawer"

  const dispatch = useAppDispatch();
  const footerIsOpen = useAppSelector(selectFooterDrawerIsOpen);

  const handleClick = () => {
    console.log("original state: ", footerIsOpen);
    dispatch(toggleIsOpen())
  }

  idName += footerIsOpen ? '-open' : '-closed'

  return (
    <div id="footer-drawer" className={idName} onClick={handleClick}>Trace View 
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <span className="material-symbols-outlined"> expand_less </span>
    </div>
  )
}

export default footerDrawer
