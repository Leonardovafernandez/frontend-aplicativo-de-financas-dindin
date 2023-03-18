import './style.css';
import Header from '../../components/Header';
import Dashboard from '../../components/Dashboard';
import { useState } from 'react';
import ModalProfile from '../../components/ModalProfile';
import ModalRegister from '../../components/ModalRegister';
import { getItem } from '../../utils/storage';
import ModalEditRegister from '../../components/ModalEditRegister';



function Home() {
  const [isModalProfile, setIsModalProfile] = useState(false);
  const [isModalAddRegister, setIsModalAddRegister] = useState(false);
  const [isModalEditRegister, setIsModalEditRegister] = useState(false);
  const [idRegisters, setIdRegisters] = useState(0);
  const Registers = [];
  let usuario = {};
  const token = getItem('token');

  return (
    <div className="home">
      <Header isModalProfile={isModalProfile} setIsModalProfile={setIsModalProfile} token={token} usuario={usuario}
      ></Header>

      <Dashboard isModalAddRegister={isModalAddRegister} setIsModalAddRegister={setIsModalAddRegister}
        isModalEditRegister={isModalEditRegister} setIsModalEditRegister={setIsModalEditRegister}
        registers={Registers} token={token} idRegisters={idRegisters} setIdRegisters={setIdRegisters}
      />

      {isModalProfile && <ModalProfile isModalProfile={isModalProfile} setIsModalProfile={setIsModalProfile}
        token={token} usuario={usuario}
      />}

      {isModalAddRegister && <ModalRegister
        isModalAddRegister={isModalAddRegister} setIsModalAddRegister={setIsModalAddRegister}
        registers={Registers} token={token} idRegisters={idRegisters} setIdRegisters={setIdRegisters}
      />}
      {isModalEditRegister && <ModalEditRegister isModalEditRegister={isModalEditRegister} setIsModalEditRegister={setIsModalEditRegister}
        registers={Registers} token={token} idRegisters={idRegisters} setIdRegisters={setIdRegisters} />}

    </div>

  );
}

export default Home;
