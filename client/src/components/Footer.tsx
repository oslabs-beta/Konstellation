import React from 'react'
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import FooterButton from './footerButton'
import { selectFooterButtonFullscreen } from './footerButtonSlice';

type Props = {
}

const Footer = (props: Props) => {

  const footerFullscreenState = useAppSelector(selectFooterButtonFullscreen)

  if (!footerFullscreenState){
    return (
      <div className="home__overlay__bottom-drawer-closed">
        <FooterButton />
      </div>
    )
  }
  else {
    return (
    <div className="home__overlay__bottom-drawer-open">
        <FooterButton />
      </div>
    )
  }
}

export default Footer
