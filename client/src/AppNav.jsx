import { Link } from 'react-router-dom';

function AppNav() {
  return (
    <nav className='AppNav'>
      <ul className='NavList'>
        <li className='NavItem'>
          <Link to="/home" className='Link'>HOME</Link>
        </li>
        <li className='NavItem'>
          <Link to="/album" className='Link'>ALBUM</Link>
        </li>
        <li className='NavItem'>
          <Link to="/blog" className='Link'>BLOG</Link>
        </li>
        <li className='NavItem'>
          <Link to="/about" className='Link'>ABOUT</Link>
        </li>
      </ul>
    </nav>
  )
};

export default AppNav;