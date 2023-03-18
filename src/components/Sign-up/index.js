import './style.css';
import { useState } from 'react';
import { checkValidFormUser } from '../../utils/general'

import api from './../../services/api';

function SignUp({ isLogin, setIsLogin }) {
  const [form, setForm] = useState(
    {
      nome: '',
      email: '',
      senha: '',
      confirmacaoSenha: ''
    }
  );

  function handleForm(event) {
    const value = event.target.value;
    setForm({ ...form, [event.target.name]: value })
  }

  async function createUser() {
    if (!checkValidFormUser(form)) {
      console.log('formulario invalido')
      return;
    }

    console.log('form submetido')
    try {
      const response = await api.post('/usuario', {
        nome: form.nome,
        email: form.email,
        senha: form.senha
      });

      console.log(response);
      if (response.status == 201) {
        console.log('usuario cadastrado')
        clearForm();
        setIsLogin(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function clearForm() {
    setForm(
      {
        nome: '',
        email: '',
        senha: '',
        confirmacaoSenha: ''
      }
    );
  }
  //onSubmit={(event) => createUser(event)}
  return (
    <div className="box margin-t-62 center">
      <form className="form">
        <h2 className="purple">Cadastre-se</h2>

        <label className="margin-t-28 align-self"
          htmlFor='nome'
        >Nome</label>
        <input className="margin-t-8 input"
          type='text'
          name='nome'
          value={form.nome}
          onChange={(event) => handleForm(event)}
        ></input>

        <label className="margin-t-28 align-self"
          htmlFor='email'
        >E-mail</label>
        <input className="margin-t-8 input"
          type='email'
          name='email'
          value={form.email}
          onChange={(event) => handleForm(event)}
        ></input>

        <label className="margin-t-31 align-self"
          htmlFor='senha'
        >Senha</label>
        <input className="margin-t-8 input"
          type='password'
          name='senha'
          value={form.senha}
          onChange={(event) => handleForm(event)}
        ></input>

        <label className="margin-t-31 align-self"
          htmlFor='confirmacaoSenha'
        >Confirmação de senha</label>
        <input className="margin-t-8 input"
          type='password'
          name='confirmacaoSenha'
          value={form.confirmacaoSenha}
          onChange={(event) => handleForm(event)}
        ></input>

        <button className="margin-t-38 button-large"
          onClick={(event) => createUser(event)}
          type='button'>Cadastrar</button>
        <a className="margin-t-12 purple anchor" href='' onClick={() => setIsLogin(!isLogin)}>Já tem cadastro? Clique aqui!</a>
      </form>
    </div>
  );
}

export default SignUp;
