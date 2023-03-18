import './style.css';
import { useState, useEffect } from 'react';
import CloseIcon from './../../assets/close-icon.svg';
import { checkValidFormUser } from '../../utils/general'
import api from './../../services/api';
import { getItem } from '../../utils/storage';


function ModalProfile({ isModalProfile, setIsModalProfile }) {
  const [form, setForm] = useState(
    {
      nome: '',
      email: '',
      senha: '',
      confirmacaoSenha: ''
    }
  );
  let usuario = {};

  const token = getItem('token');

  async function getProfile() {
    try {
      const response = await api.get('/usuario', { headers: { Authorization: `Bearer ${token}` } });
      usuario = { ...response.data };
      setForm({
        nome: usuario.nome,
        email: usuario.email,
        senha: '',
        confirmacaoSenha: ''
      })
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, [])

  async function updateProfile(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!checkValidFormUser(form)) {
      return;
    }
    try {
      const responseUpdate = await api.put('/usuario', {
        nome: form.nome,
        email: form.email,
        senha: form.senha
      }, { headers: { Authorization: `Bearer ${token}` } });
      if (responseUpdate.status == 200) {
        console.log('usuario atualizado')
        closeModal();
        clearForm();
      }
    } catch (error) {
      console.log(error);
    }
  };

  function handleForm(event) {
    const value = event.target.value;
    setForm({ ...form, [event.target.name]: value })
  }

  function clearForm() {
    setForm(
      {
        nome: '',
        email: '',
        senha: '',
        confirmacaoSenha: ''
      }
    );
  };

  function closeModal() {
    setIsModalProfile(!isModalProfile);
  };

  return (
    <div className="modal">
      <div className="modal_card center">
        <form className="form">
          <div className="flex-row justify-between">
            <span className="tittle-modal align-self">Editar perfil</span>
            <img className='close-icon' src={CloseIcon} alt="Close modal" onClick={closeModal} />
          </ div>

          <label className="margin-t-28 label-modal align-self"
            htmlFor='nome'
          >Nome</label>
          <input className="margin-t-8 input" value={form.nome}
            type='text'
            name='nome'
            onChange={(event) => handleForm(event)}
          ></input>

          <label className="margin-t-28 label-modal align-self"
            htmlFor='email'
          >E-mail</label>
          <input className="margin-t-8 input" value={form.email}
            type='email'
            name='email'
            onChange={(event) => handleForm(event)}
          ></input>

          <label className="margin-t-31 label-modal align-self"
            htmlFor='senha'
          >Senha</label>
          <input className="margin-t-8 input" value={form.senha}
            type='password'
            name='senha'
            onChange={(event) => handleForm(event)}
            placeholder='********'
          ></input>

          <label className="margin-t-31 label-modal align-self"
            htmlFor='confirmacaoSenha'
          >Confirmação de senha</label>
          <input className="margin-t-8 input" value={form.confirmacaoSenha}
            type='password'
            name='confirmacaoSenha'
            onChange={(event) => handleForm(event)}
            placeholder='********'
          ></input>

          <button className="margin-t-38 button-small width-236 center"
            type='button'
            onClick={(e) => updateProfile(e)}>Confirmar</button>
        </form>
      </div>
    </div>
  );
}

export default ModalProfile;
