import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Banner() {
  return (
    <div>
      {/* <div className='relative'> */}
      {/* <div className='absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20' /> */}

      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <img
            loading='lazy'
            src='https://res.cloudinary.com/nmahara/image/upload/v1645005426/0504-AMZN-GNBC-GatewayHero-1500x600_v5._CB669739807__y1ippl.jpg'
            alt=''
          />
        </div>

        <div>
          <img
            loading='lazy'
            src='https://res.cloudinary.com/nmahara/image/upload/v1645005426/UGRR_S1_GWBleedingHero_ENG_COVIDUPDATE_XSite_1500X600_PV_en-GB._CB669781769__oyldui.jpg'
            alt=''
          />
        </div>

        <div>
          <img
            loading='lazy'
            src='https://res.cloudinary.com/nmahara/image/upload/v1645005426/UK-EN_030821_SpringSitewide_ACQ_GW_Hero_D_1500x600_CV69._CB656397523__k6qxxf.jpg'
            alt=''
          />
        </div>
      </Carousel>
      {/* </div> */}
    </div>
  );
}

export default Banner;
