import './style.css';
import Editar from '../../assets/editar.svg';
import Apagar from '../../assets/apagar.svg';
import api from './../../services/api';
import { useEffect, useState } from 'react';
import { getItem } from '../../utils/storage';
import { parseISO, getDay, getMonth, getYear, getDate } from 'date-fns';
import DeleteBalloon from "../DeleteBalloon";

function Register({ data, descricao, categoria, valor, tipo, setIsModalEditRegister, idRegisters, deleteRegister, id, setIdRegisters, categorias }) {
  let dt;
  let formatedDate;
  let dayOfTheWeek;
  const [categoryDescription, setCategoryDescription] = useState('');
  const [showDeleteBalloon, setShowDeleteBalloon] = useState(false);
  const token = getItem('token');

  function formatDate(data) {
    dt = parseISO(data);
    formatedDate = `${getDate(dt)}/${getMonth(dt) + 1}/${getYear(dt)}`

    const daysOfTheWeek = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    dayOfTheWeek = daysOfTheWeek[getDay(dt)];
  }

  formatDate(data);

  function getIdForDelete(id) {
    setIdRegisters(id);
    setShowDeleteBalloon(true);
  }

  function getIdForEdit(id) {
    setIdRegisters(id);
    setIsModalEditRegister(true);
  }

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
      getCategoryRegister()
    } catch (error) {
      console.log(error.message);
    }
  };

  function getCategoryRegister() {
    const indexCategory = categorias.findIndex(item => categoria === item.id);
    setCategoryDescription(categorias[indexCategory].descricao);
  }

  return (
    <tr className="register-display flex-row justify-between align-center span-display" >
      <td className="data width-15">
        <span className="bold flex-row align-center justify-start">{formatedDate}</span>
      </td>
      <td className="dia-da-semana width-15">
        <span>{dayOfTheWeek}</span>
      </td>
      <td className="descrição width-30">
        <span>{descricao}</span>
      </td>
      <td className="categoria width-15">
        <span>{categoryDescription}</span>
      </td>
      <td className="valor bold width-15">
        <span className={tipo}>R$ {(valor / 100).toFixed((2))}</span>
      </td>
      <td className="icons flex-row width-10">
        <img src={Editar} alt='Editar' onClick={() => getIdForEdit(id)}></img>
        <img src={Apagar} alt='Apagar' onClick={() => getIdForDelete(id)}></img>
        {showDeleteBalloon && <DeleteBalloon setShowDeleteBalloon={setShowDeleteBalloon} deleteRegister={deleteRegister} idRegisters={idRegisters} />}
      </td>
    </tr>
  );
}

export default Register;
