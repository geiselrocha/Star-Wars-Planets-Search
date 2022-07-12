import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import tableContext from './tableContext';

function TableProvider({ children }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchApiData = async () => {
      const endpoint = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const { results } = await endpoint.json();
      results.filter((e) => delete e.residents);
      return setData(results);
    };
    fetchApiData();
  }, []);
  return (
    <tableContext.Provider value={ { data } }>
      {children}
    </tableContext.Provider>
  );
}

TableProvider.propTypes = { children: PropTypes.node }.isRequired;

export default TableProvider;
