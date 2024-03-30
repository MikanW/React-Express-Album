import { Link } from 'react-router-dom';

function AppNav() {
  return (
    <nav className='AppNav'>
      <ul>
        <li>
          <Link to="/album" className='Link'>ALBUM</Link>
        </li>
        <li>
          <Link to="/blog" className='Link'>BLOG</Link>
        </li>
        <li>
          <Link to="/about" className='Link'>ABOUT</Link>
        </li>
      </ul>
    </nav>
  )
};

export default AppNav;