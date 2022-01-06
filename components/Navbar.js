// import styles from "../styles/navbar.module.css";
// import { Image } from "@chakra-ui/image";
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className='navbar navbar-expand-lg sticky-top '>
      <div className='container'>
        <Link passHref={true} href='/' className='nav-link left'>
          <a className='nav-link left'>
            <h2>
              <b>Home</b>
            </h2>
          </a>
        </Link>{' '}
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span id='navbar-toggler-icon'>≡</span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav ml-auto'>
            <li className='link-background'>
              <Link passHref={true} href='/create' className='nav-link left'>
                <a className='nav-link left'>Create NFT</a>
              </Link>
            </li>
            <li className='link-background'>
              <Link
                passHref={true}
                href='/viewassets'
                className='nav-link left'
              >
                <a className={'nav-link left'}>View assets</a>
              </Link>
            </li>
            <li className='link-background'>
              <Link passHref={true} href='/creator-dashboard'>
                <a className='nav-link left'>Dashboard</a>
              </Link>
            </li>
            <li className='link-background'>
              <Link passHref={true} href='/about' className='nav-link left'>
                <a className={'nav-link left'}> About Us</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
