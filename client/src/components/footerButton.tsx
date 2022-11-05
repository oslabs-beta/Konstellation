import React, { useEffect } from 'react'
import '../styles/home.scss'
import { useAppDispatch, useAppSelector } from '../lib/hooks'
import { selectFooterButtonFullscreen, toggleFullscreen } from './footerButtonSlice'

type Props = {
}

const FooterElement = (props: Props) => {

  const dispatch = useAppDispatch();
  const footerFullscreenState = useAppSelector(selectFooterButtonFullscreen);

  const handleClick = () => {
    console.log("original state: ", footerFullscreenState);
    dispatch(toggleFullscreen())
  }

  return (
    <div className="drawer-button" onClick={handleClick}>Trace View 
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <span className="material-symbols-outlined"> expand_less </span>
    </div>
  )
}

export default FooterElement
