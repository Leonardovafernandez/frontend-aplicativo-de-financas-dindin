import './style.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setItem } from '../../utils/storage'
import api from './../../services/api';

function Login({ isLogin, setIsLogin }) {

  const navigate = useNavigate();

  const [form, setForm] = useState(
    {
      email: '',
      password: ''
    }
  );

  function handleForm(event) {
    const value = event.target.value;
    setForm({ ...form, [event.target.name]: value })
  }

  async function Login(event) {
    event.preventDefault();
    event.stopPropagation();

    try {
      const response = await api.post('/login', {
        email: form.email,
        senha: form.senha
      });

      console.log(response);
      if (response.status == 200) {
        console.log('Login')
        setItem('token', response.data.token);
        setItem('userId', response.data.usuario.id);
        navigate('/home')
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="content margin-t-108">
      <div className="content-text">
        <h1 className="tittle white">Controle suas <span className="purple">finanças</span>, sem planilha chata.</h1>
        <span className="margin-t-33 sub-tittle white">Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem tudo num único lugar e em um clique de distância.</span>
        <button className="margin-t-43 button-large width-284" onClick={() => setIsLogin(!isLogin)}>Cadastre-se</button>
      </div>
      <div className="box">
        <form className="form" >
          <h2 className="purple">Login</h2>

          <label className="margin-t-28 align-self"
            htmlFor='email'>E-mail</label>
          <input className="margin-t-8 input"
            type='email'
            name='email'
            value={form.email}
            onChange={(event) => handleForm(event)}
          ></input>

          <label className="margin-t-31 align-self"
            htmlFor='senha'>Password</label>
          <input className="margin-t-8 input"
            type='password'
            name='senha'
            value={form.senha}
            onChange={(event) => handleForm(event)}
          ></input>

          <button className="margin-t-73 button-large"
            onClick={(event) => Login(event)}
            type='button'>Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
