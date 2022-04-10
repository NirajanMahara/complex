import React from 'react';
import { developer } from './utils/data';

const FooterBottom = () => {
  return (
    <div className='py-8 px-12 items-center bg-[#eaeaea] border-t border-[rgba(26, 26, 44, 0.05)]'>
      <span className='text-sm whitespace-nowrap opacity-75'>
        &copy; {new Date().getFullYear()} | Developed by{' '}
        <a
          href={developer.link}
          className='text-orange-500 transition-all duration-200 
          border-b border-dotted  border-orange-500
          hover:text-black hover:border-black'
        >
          {developer.name}
        </a>
      </span>
    </div>
  );
};

export default FooterBottom;
