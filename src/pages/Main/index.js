import './style.css';
import { useState } from 'react';
import Logo from '../../assets/Logo.svg';
import SignUp from '../../components/Sign-up';
import Login from '../../components/Login';


function Main() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="main">
      <div className="logo">
        <img src={Logo} alt='Dindin' />
      </div>
      {isLogin ? <Login isLogin={isLogin} setIsLogin={setIsLogin} /> : <SignUp isLogin={isLogin} setIsLogin={setIsLogin} />}
    </div>
  );
}

export default Main;
