import './style.css';

function DeleteBalloon({ setShowDeleteBalloon, deleteRegister, idRegisters }) {
  function closeBallon() {
    setShowDeleteBalloon(false)
  }

  function erase(idRegisters) {
    deleteRegister(idRegisters);
  }
  return (
    <div className=''>
      <div className="balloon flex-column align-center justify-center">
        <div className=''>
          <span className='text'>Apagar item?</span>
        </div>
        <div className='btns flex-row align-center justify-center'>
          <button className='btn btn-blue' onClick={() => erase(idRegisters)}>Sim</button>
          <button className='btn btn-red' onClick={() => closeBallon()}>Não</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteBalloon;
