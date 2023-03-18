import { useState } from 'react';
import { parseISO } from 'date-fns';
import Down from "../../assets/down.png";
import Up from "../../assets/up.png";
import './style.css';



function DashboardRegister({ lines, setLines, down, setDown }) {

  function order() {
    setDown(!down);
  }


  return (
    <div className="dashboard-table width-100">
      <table className="width-100">
        <thead>
          <tr className="dashboard-display-header flex-row justify-between align-center span-display bold">
            <th className="data width-15 text-left">
              <div className="flex-row align-center justify-start" onClick={() => order()}>
                <span>Data</span> <img src={down ? Down : Up} alt='seta' />
              </div>
            </th>
            <th className="dia-da-semana width-15">
              <span>Dia da semana</span>
            </th>
            <th className="descrição width-30">
              <span>Descrição</span>
            </th>
            <th className="categoria width-15">
              <span>Categoria</span>
            </th>
            <th className="valor width-15">
              <span>Valor</span>
            </th>
            <th className="icons width-10">
              <span>  </span>
            </th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  );
}

export default DashboardRegister;
