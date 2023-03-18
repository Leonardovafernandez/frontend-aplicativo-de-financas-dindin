import './style.css';
import Logo from '../../assets/Logo.svg';
import Leave from '../../assets/Leave.svg';
import Profile from '../../assets/Profile.svg';
import { Link } from 'react-router-dom'
import { clear, getItem } from '../../utils/storage';
import { useEffect, useState } from 'react';
import api from './../../services/api';


function Header({ setIsModalProfile, usuario }) {
  const userName = getItem('userName');
  const token = getItem('token');
  const [name, setName] = useState(userName);

  async function getProfile() {
    try {
      const response = await api.get('/usuario', { headers: { Authorization: `Bearer ${token}` } });
      usuario = { ...response.data };
      setName(usuario.nome);
    } catch (error) {
      console.log(error);
    }
  };
  getProfile();

  useEffect(() => {

  }, [name])

  function logout() {
    clear();
  };

  return (
    <div className="header">
      <div className="flex-row justify-between">
        <div className="logo">
          <img src={Logo}></img>
        </div>
        <nav className="flex-row align-center ">
          <img src={Profile} alt='Profile' onClick={() => setIsModalProfile(true)} />
          <span className="white">{name}</span>
          <Link to='/'>
            <img src={Leave} alt='Logout'
              onClick={() => logout()} />
          </Link>
        </nav>
      </div>

    </div>
  );
}

export default Header;
