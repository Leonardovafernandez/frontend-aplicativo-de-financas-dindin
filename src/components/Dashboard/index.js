import './style.css';
import DashboardRegister from '../DashboardRegister';
import DashboardResume from '../DashboardResume';
import api from './../../services/api';
import { getItem } from '../../utils/storage';
import DeleteBalloon from '../../components/DeleteBalloon';
import { useState, useEffect } from 'react';
import ButtonFilter from '../Filter';
import Register from '../Register';
import { parseISO } from 'date-fns';

function Dashboard({ isModalAddRegister, setIsModalAddRegister, isModalEditRegister, setIsModalEditRegister, idRegisters, setIdRegisters }) {
  const [lines, setLines] = useState([{}]);
  const registers = [];
  const token = getItem('token');
  const [showDeleteBalloon, setShowDeleteBalloon] = useState(false);
  const categorias = [];
  const [selectFilter, setSelectFilter] = useState([]);
  const [down, setDown] = useState(true);



  let query;

  function creatQuery() {
    const queryFilter = []

    for (let i = 0; i < selectFilter.length; i++) {
      const filterEdit = `filtro[]=${selectFilter[i]}`;
      queryFilter.push(filterEdit);
    }

    query = queryFilter.join("&");
  }

  creatQuery()

  async function readregisters() {

    try {
      const responseRegisters = await api.get(`/transacao?${query}`, { headers: { Authorization: `Bearer ${token}` } });
      registers.push(responseRegisters.data);
      if (down) {
        responseRegisters.data.sort((x, y) => {

          return parseISO(x.data) - parseISO(y.data)
        });
      }
      if (!down) {
        responseRegisters.data.sort((x, y) => {
          return parseISO(y.data) - parseISO(x.data)
        });
      }

      setLines(responseRegisters.data);
    } catch (error) {
      console.log(error.message);
    }
  }


  useEffect(() => {
    readregisters();
    readCategorias();
  }, [showDeleteBalloon, lines, idRegisters]);

  async function deleteRegister(id) {
    try {
      const responseDelete = await api.delete(`/transacao/${id}`, { headers: { Authorization: `Bearer ${token}` } });

      if (responseDelete.status === 200) {
        setShowDeleteBalloon(false);
      }
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
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="dashboard">

      <div className="dashboard-box flex-row">

        <div className="dashboard-register flex-column">

          <ButtonFilter selectFilter={selectFilter} setSelectFilter={setSelectFilter}></ButtonFilter>
          <div className='flex-column justify-start'>
            <DashboardRegister isModalEditRegister={isModalEditRegister} setIsModalEditRegister={setIsModalEditRegister}
              lines={lines} setLines={setLines} down={down} setDown={setDown}
            ></DashboardRegister>
            {lines.map((line) => (
              <Register key={Number(line.id)} data={line.data} descricao={line.descricao}
                categoria={line.categoria_id} valor={line.valor} tipo={line.tipo === 'entrada' ? "violet" : "orange"}
                isModalEditRegister={isModalEditRegister} setIsModalEditRegister={setIsModalEditRegister}
                id={line.id} idRegisters={idRegisters} setIdRegisters={setIdRegisters} deleteRegister={deleteRegister}
                setShowDeleteBalloon={setShowDeleteBalloon} categorias={categorias}
              ></Register>
            ))}
          </div>

          {showDeleteBalloon && <DeleteBalloon setShowDeleteBalloon={setShowDeleteBalloon} deleteRegister={deleteRegister} idRegisters={idRegisters} />}
        </div>

        <div className="dashboard-card">
          <DashboardResume
            isModalAddRegister={isModalAddRegister}
            setIsModalAddRegister={setIsModalAddRegister}
          ></DashboardResume>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
