import Image from 'next/image';
import Link from 'next/dist/client/link';

export default function Display() {
  return (
    <div className='below-navbar-container'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 text-center vanish-mobile'>
            <section id='right_below_navbar_svg'></section>
          </div>
          <div className='col-md-12'>
            <div className='box-for-names' id='hello-world'>
              <h1 className='title-main'>
                <b>Nebulous </b>
              </h1>
              <h4 className='mt-2'>
                An Online Blockchain NFT Marketplace where anyone can buy and
                sell digital assets
              </h4>
              <Link href='/create'>
                <button
                  className=' flex-row-reverse mt-3 px-5 text-center'
                  id='commonbuttons'
                >
                  <b>Create Now</b>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
