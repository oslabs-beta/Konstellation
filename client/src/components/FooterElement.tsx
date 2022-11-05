import React from 'react'
import '../styles/home.scss'

type Props = {
  type: FooterType
}
type FooterType = 'button' | 'text'

const FooterElement = ({ type }: Props) => {

  return (
    <div id="home__footer-button">FooterElement</div>
  )
}

export default FooterElement