import React from 'react'
import FooterElement from './FooterElement'

type Props = {
}

type FooterType = 'button' | 'text'

const Footer = (props: Props) => {

  return (
    <div className="home__footer-button">
      <FooterElement type="button"/>
    </div>
  )
}

export default Footer