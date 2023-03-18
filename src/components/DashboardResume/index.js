import './style.css';
import { useState, useEffect } from 'react';
import api from './../../services/api';
import { getItem } from '../../utils/storage';

function DashboardResume({ isModalAddRegister, setIsModalAddRegister }) {
  let received = 0;
  let spent = 0;
  let subtract;
  const [amountsReceived, setAmountsReceived] = useState(0);
  const [amountsSpent, setAmountsSpent] = useState(0);
  const [balance, setBalance] = useState(0);

  const token = getItem('token');
  let response;

  useEffect(() => {
    takeExtract();
  })


  function render() {
    received = received / 100;
    spent = spent / 100;

    subtract = received - spent;

    setBalance(subtract);
    setAmountsReceived(received);
    setAmountsSpent(spent);
  };

  async function takeExtract() {

    try {
      response = await api.get('/transacao/extrato', { headers: { Authorization: `Bearer ${token}` } });
      setAmountsReceived(received);
      setAmountsSpent(spent);

      received = response.data.entrada;
      spent = response.data.saida;

      setBalance(subtract);
      setAmountsReceived(received);
      setAmountsSpent(spent);
      render();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="dashboard-resume flex-column">
      <div className="resume flex-column justify-between">
        <div className="tittle-resume align-self"><span>Resumo</span>
        </div>
        <div>
          <div className="flex-row justify-between span-resume"><span >Entradas</span><span className="violet">R$ {amountsReceived.toFixed(2)}</span></div>
          <div className="flex-row justify-between span-resume margin-t-10"><span>Saídas</span><span className="orange">R$ {amountsSpent.toFixed(2)}</span></div>
        </div>
        <hr></hr>
        <div className="flex-row justify-between subtittle-resume"><span className="bold">Saldo</span><span className="blue">R$ {balance.toFixed(2)}</span></div>
      </div>
      <div className="button-small">
        <button className="button-small" type='button' onClick={() => setIsModalAddRegister(!isModalAddRegister)}>Adicionar Registro</button>
      </div>
    </div>
  );
}

export default DashboardResume;
