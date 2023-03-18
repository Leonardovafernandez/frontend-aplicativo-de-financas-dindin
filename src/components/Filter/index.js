import './style.css';
import Filter from '../../assets/Filter.png';
import { useState, useEffect } from 'react';
import { getItem, setItem, remove } from '../../utils/storage';
import api from './../../services/api';
import FilterButton from '../Filter Button';

function ButtonFilter({ selectFilter, setSelectFilter }) {
  const [apply, setApply] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [onFilter, setOnFilter] = useState(false);
  const [filtro, setFiltro] = useState([]);
  const categorias = [];
  const [category, setCategory] = useState([]);
  const token = getItem('token');


  function applyFilter() {
    setSelectFilter([...filtro]);
    setOnFilter(false);
  }

  function clearFilter() {
    setSelectFilter([]);
    setOnFilter(true);
  }

  useEffect(() => {
    readCategorias();
  }, []);

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
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="btn-filter flex-column">
      <button className="button-filter align-self" type='button' onClick={() => setHidden(!hidden)}><img src={Filter}></img>Filtrar</button>
      <div className={hidden ? 'filter-content hidden' : 'filter-content'}>
        <div className='category-container flex-column justify-between align-start'>
          <div>
            <span className='category-tittle'>Categoria</span>
          </div>
          <div className='category-content margin-t-20 flex-column'>
            {category.map((categoria) => (<FilterButton key={Number(categoria.id)} apply={apply} setApply={setApply} descricao={categoria.descricao} filtro={filtro} setFiltro={setFiltro} clearFilter={clearFilter} />))}
          </div>
          <div className='category-confirm flex-row margin-t-16 '>
            <button className='clear' onClick={() => clearFilter()}>Limpar Filtros</button>
            <button className='apply white' onClick={() => applyFilter()}>Aplicar Filtros</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ButtonFilter;



{/* <button key={Number(categoria.id)} descricao={categoria.descricao}
  onClick={() => { }}
  className={'button-category black'}
><span>{categoria.descricao}</span><img src={add} alt='Add' /></button > */}

//<FilterButton key={Number(categoria.id)} descricao={categoria.descricao} />