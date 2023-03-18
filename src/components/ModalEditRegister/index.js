import './style.css';
import CloseIcon from './../../assets/close-icon.svg';
import { useState, useEffect } from 'react';
import { getItem } from '../../utils/storage';
import api from './../../services/api';
import { checkValidFormRegister } from '../../utils/general';
import { parseISO, getMonth, getYear, getDate } from 'date-fns';
import { IMaskInput } from "react-imask";

function ModalEditRegister({ isModalEditRegister, setIsModalEditRegister, idRegisters, setIdRegisters }) {
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
  let registerDetail = {};

  const token = getItem('token');

  useEffect(() => {
    getRegisterDetail(idRegisters);
    readCategorias();
  }, []);

  async function updateRegister(idRegisters) {

    const categoryDescription = form.categoria;

    const categoryIndex = category.findIndex(categoria => categoria.descricao == categoryDescription);

    const categoryId = category[categoryIndex].id;

    setForm({ ...form, categoria_id: categoryId });

    const register = {
      descricao: form.descricao,
      valor: form.valor,
      data: form.data,
      categoria_id: categoryId.toString(),
      tipo: isEntrada ? 'entrada' : 'saida',
      categoria_nome: categoryDescription
    };

    console.log(register)

    if (!checkValidFormRegister(register)) {
      return;
    }
    console.log(idRegisters);
    try {
      const responseUpdate = await api.put(`/transacao/${idRegisters}`, register, { headers: { Authorization: `Bearer ${token}` } });

      if (responseUpdate.status === 200) {
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  }


  async function getRegisterDetail(idRegisters) {
    try {
      const response = await api.get(`/transacao/${idRegisters}`, { headers: { Authorization: `Bearer ${token}` } });
      registerDetail = { ...response.data };
      if (registerDetail.tipo === 'entrada') {
        setIsEntrada(true);
      }
      let dt = parseISO(registerDetail.data);
      let month = getMonth(dt);
      const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
      const day = getDate(dt);
      const days = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];

      let formatedDate = `${getYear(dt)}-${months[month]}-${days[day]}`;

      setForm({
        tipo: registerDetail.tipo,
        valor: registerDetail.valor,
        categoria: registerDetail.categoria_nome,
        data: formatedDate,
        descricao: registerDetail.descricao,
        categoria_id: registerDetail.categoria_id,
        usuario_id: registerDetail.usuario_id
      });
    } catch (error) {
      console.log(error.message);
    }
  }

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

  function closeModal() {
    setIsModalEditRegister(false);
  }

  return (
    <div className="modal">
      <div className="modal_card center">
        <form className="form">
          <div className="flex-row justify-between">
            <span className="tittle-modal align-self">Editar Registro</span>
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
          <select className="margin-t-8 input" name="categoria" value={form.categoria}
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
            placeholder={form.data}
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
            onClick={() => updateRegister(idRegisters)}
          >Confirmar</button>
        </form>
      </div>
    </div>
  );
}

export default ModalEditRegister;


//${getYear(dt)}-${getMonth(dt) + 1}-${getDate(dt)}