import React from 'react';
import { disclaimer } from './utils/data';

const FooterDisclaimer = () => {
  return (
    <div
      className='text-base bg-[#1a1a2c] text-white
        py-4 px-12 mt-3'
    >
      <strong>Disclaimer:</strong> {disclaimer.text}
    </div>
  );
};

export default FooterDisclaimer;
