import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-red-500 h-40 hover:bg-green-500 duration-300">
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
              {user ? (
                <>
                  <li className="nav-item">
                    <span className="nav-link" style={{ cursor: 'default' }}>
                      <span className="nav-text">
                        {user.firstName} {user.lastName}
                        <span className={`user-badge ${user.role}`}>
                          {user.role === 'admin' ? 'Админ' : 'Пользователь'}
                        </span>
                      </span>
                    </span>
                  </li>
                  <li className="nav-item">
                    <button type="button" className="nav-link" onClick={logout} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                      <span className="nav-text">Выйти</span>
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      <span className="nav-text">Вход</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">
                      <span className="nav-text">Регистрация</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;