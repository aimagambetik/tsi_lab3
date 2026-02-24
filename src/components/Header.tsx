import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-red-500 h-40 rounded-xl hover:bg-green-500 duration-300">
      <div className="container">
        <div className="header-content">
       
          <div className="logo">
            <Link to="/" className="logo-link">
              <span className="logo-text">SALAM</span>
            </Link>
          </div>
          
       
          <nav className="nav">
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <span className="nav-text">Главная</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  <span className="nav-text">О нас</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;