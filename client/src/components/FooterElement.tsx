import React, { useEffect } from 'react'
import '../styles/home.scss'
import { useAppDispatch } from '../lib/hooks'

type Props = {
  type: FooterType
}
type FooterType = 'button' | 'text'

const FooterElement = ({ type }: Props) => {

  const dispatch = useAppDispatch();

  const handleClick = () => {
    
  }


  return (
    <div id="home__footer-button" onClick={handleClick}>Trace View 
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <span className="material-symbols-outlined"> expand_less </span>
    </div>
  )
}

export default FooterElement
