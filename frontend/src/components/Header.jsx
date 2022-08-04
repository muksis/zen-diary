import { BsSun } from 'react-icons/bs';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const location = useLocation();

  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <div>
      <header className='header'>
        <div className='logo'>
          <Link to='/'>
            <BsSun /> Zen Diary
          </Link>
        </div>
        <ul>
          {user ? (
            <li>
              <button className='btn' onClick={onLogout}>
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link
                  to='/login'
                  className={pathMatchRoute('/login') && 'headerActive'}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to='/register'
                  className={pathMatchRoute('/register') && 'headerActive'}
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </header>
    </div>
  );
}

export default Header;
