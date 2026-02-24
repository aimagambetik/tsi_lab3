import { Link } from 'react-router-dom';

function Footer() {
  return (
    <header className="bg-red-500 h-40 rounded-xl hover:bg-green-500 duration-300">
      <div className="container">
        <div className="header-content">
       
          <div className="logo">
            <Link to="/" className="logo-link">
              <span className="logo-text">ALEIKUM</span>
            </Link>
          </div>
          
       
          <nav className="nav">
            <ul className="nav-list">
              
              
              <li className="nav-item">
                <Link to="/halal" className="nav-link">
                  <span className="nav-text">HALAL</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Footer;