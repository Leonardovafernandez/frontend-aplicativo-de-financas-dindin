import './style.css';
import CloseIcon from './../../assets/close-icon.svg';
import { useState, useEffect } from 'react';
import { getItem } from '../../utils/storage';
import api from './../../services/api';
import { checkValidFormRegister } from '../../utils/general';

function ModalRegister({ isModalAddRegister, setIsModalAddRegister, isModalEditRegister, setIsModalEditRegister, idRegisters, setIdRegisters }) {
  const [isEntrada, setIsEntrada] = useState(false);
  const [category, setCategory] = useState([]);
  const categorias = [];
  const [form, setForm] = useState(
    {
      tipo: isEntrada ? 'entrada' : 'saida',
      valor: '',
      categoria: '',
      data: '',
      descricao: '',
      categoria_id: '',
      usuario_id: ''
    }
  );

  const token = getItem('token');

  useEffect(() => {
    readCategorias();
  }, [])

  async function readCategorias() {
    try {
      const responseCategorias = await api.get('/categoria', { headers: { Authorization: `Bearer ${token}` } });
      for (const categoriaResponse of responseCategorias.data) {
        let search = categorias.find(categoria => categoriaResponse.descricao == categoria.descricao)

        if (!search) {
          categorias.push(categoriaResponse);
        }
      }

      setCategory([...categorias]);
      setForm({ ...form, categoria: categorias[0].descricao, categoria_id: categorias[0].id })
    } catch (error) {
      console.log(error.message);
    }
  };

  function handleForm(event) {
    const value = event.target.value;
    setForm({ ...form, [event.target.name]: value })
  }

  async function createRegister() {
    const categoryDescription = form.categoria;

    const categoryIndex = category.findIndex(categoria => categoria.descricao == categoryDescription);

    const categoryId = category[categoryIndex].id;

    setForm({ ...form, categoria_id: categoryId });

    const register = {
      descricao: form.descricao,
      valor: form.valor,
      data: form.data,
      categoria_id: categoryId,
      tipo: isEntrada ? 'entrada' : 'saida'
    };

    if (!checkValidFormRegister(register)) {
      console.log('formulario invalido')
      return;
    }

    try {
      const response = await api.post('/transacao', register, { headers: { Authorization: `Bearer ${token}` } });

      if (response.status == 200) {
        console.log('usuario atualizado')
        closeModal();
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  function closeModal() {
    setIsModalAddRegister(false);
  }

  return (
    <div className="modal">
      <div className="modal_card center">
        <form className="form">
          <div className="flex-row justify-between">
            <span className="tittle-modal align-self">{isModalAddRegister ? 'Adicionar Registro' : 'Editar Registro'}</span>
            <img className='close-icon' src={CloseIcon} alt="Close modal" onClick={closeModal} />
          </ div>
          <div className="button-type flex-row align-center margin-t-52">
            <button className={isEntrada ? "entrada flex-row align-center justify-center white bold bg-blue" : "entrada flex-row align-center justify-center bold white"} type='button' onClick={() => setIsEntrada(true)}>Entrada</button>
            <button className={isEntrada ? "entrada flex-row align-center justify-center bold white" : "entrada flex-row align-center justify-center bold white bg-red"} type='button' onClick={() => setIsEntrada(false)}>Saída</button>
          </div>

          <label className="margin-t-42 label-modal align-self"
            htmlFor='valor'
          >Valor</label>
          <input className="margin-t-8 input"
            type='number'
            name='valor'
            value={form.valor}
            onChange={(event) => handleForm(event)}
            onClick={(event) => event.stopPropagation()}
          ></input>

          <label className="margin-t-26 label-modal align-self"
            htmlFor='categoria'
          >Categoria</label>
          <select className="margin-t-8 input" name="categoria"
            onChange={(event) => handleForm(event)}>
            {category.map((categoria) => (<option key={Number(categoria.id)} value={categoria.descricao} >{categoria.descricao}</option>))}
          </select>

          <label className="margin-t-26 label-modal align-self"
            htmlFor='data'
          >Data</label>
          <input className="margin-t-8 input"
            type='date'
            name='data'
            value={form.data}
            onChange={(event) => handleForm(event)}
            onClick={(event) => event.stopPropagation()}
          ></input>

          <label className="margin-t-26 label-modal align-self"
            htmlFor='descricao'
          >Descrição</label>
          <input className="margin-t-8 input"
            type='text'
            name='descricao'
            value={form.descricao}
            onChange={(event) => handleForm(event)}
            onClick={(event) => event.stopPropagation()}
          ></input>

          <button className="margin-t-43 button-small width-236 center"
            type='button'
            onClick={() => createRegister()}
          >Confirmar</button>
        </form>
      </div>
    </div>
  );
}

export default ModalRegister;
