import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import tableContext from './tableContext';

function TableProvider({ children }) {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({ filters: { filterByName: { name: '' },
    filterByNumericValues: [{ column: '', comparison: '', value: '' }] } });
  const [columnOptions, setColumnOptions] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);

  function deleteColumn(previousColumn) {
    const newColumn = [...columnOptions];
    newColumn.splice(newColumn.indexOf(previousColumn), 1); setColumnOptions(newColumn);
  }

  const contextValue = { data, filter, setFilter, columnOptions, deleteColumn };
  useEffect(() => {
    const fetchApiData = async () => {
      const endpoint = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const { results } = await endpoint.json();
      results.filter((e) => delete e.residents);
      setData(results);
    };
    fetchApiData();
  }, []);
  return (
    <tableContext.Provider value={ { contextValue } }>
      {children}
    </tableContext.Provider>
  );
}

TableProvider.propTypes = { children: PropTypes.node }.isRequired;

export default TableProvider;
