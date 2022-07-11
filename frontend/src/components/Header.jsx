import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { FiSun } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

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
            <FiSun /> Zen Diary
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
                <Link to='/login'>Login</Link>
              </li>
              <li>
                <Link to='/register'>Register</Link>
              </li>
            </>
          )}
        </ul>
      </header>
    </div>
  );
}

export default Header;
