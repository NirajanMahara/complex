import React from 'react';
import FooterBottom from './FooterBottom';
import FooterDisclaimer from './FooterDisclaimer';
import FooterLinks from './FooterLinks';

const Footer = () => {
  return (
    <div className='bg-[#eaeaea]'>
      <FooterDisclaimer />
      <FooterLinks />
      <FooterBottom />
    </div>
  );
};

export default Footer;
