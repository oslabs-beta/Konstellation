import React from 'react'
import FooterElement from './footerElement'

type Props = {
}

type FooterType = 'button' | 'text'

const Footer = (props: Props) => {

  return (
    <div className="home__footer">
      <FooterElement type="button"/>
    </div>
  )
}

export default Footer
