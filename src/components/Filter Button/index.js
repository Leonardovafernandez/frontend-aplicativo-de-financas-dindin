import { useState } from 'react';
import './style.css';
import add from '../../assets/add.png';
import buttonClose from '../../assets/buttonClose.png'

function FilterButton({ descricao, filtro, setFiltro, unSelect, onFilter, setOnFilter, clearFilter }) {
  const [apply, setApply] = useState(false);
  const localFiltro = [...filtro];

  function unSelect() {
    if (onFilter) {
      clearFilter()
      setOnFilter(false);
      setApply(false);
    }
  }

  unSelect();

  function selectButton() {
    setApply(!apply);

    const isFilter = localFiltro.find(filt => descricao === filt)
    if (!isFilter) {
      localFiltro.push(descricao);
      setFiltro(localFiltro);
    }

    if (isFilter) {
      const filterIndex = filtro.findIndex(filt => descricao === filt)
      localFiltro.splice(filterIndex, 1);
      setFiltro(localFiltro);
    }

    console.log(localFiltro);
  }

  return (
    <button onClick={() => selectButton()}
      className={apply ? 'button-onclick white' : 'button-category black'}
    ><span>{descricao}</span><img src={apply ? buttonClose : add} alt='Add' /></button>
  );
}

export default FilterButton;
