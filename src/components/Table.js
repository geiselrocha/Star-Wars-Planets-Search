import React, { useContext, useState } from 'react';
import tableContext from '../context/tableContext';

function Table() {
  const { contextValue:
    { data, filter, setFilter, columnOptions, deleteColumn } } = useContext(tableContext);
  const [filterName, setFiltersName] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  return (
    <>
      <label htmlFor="name-filter">
        Search
        <input
          type="text"
          id="name-filter"
          data-testid="name-filter"
          onChange={ (e) => setFiltersName(e.target.value) }
        />
      </label>
      <select
        data-testid="column-filter"
        onChange={ (e) => setColumn(e.target.value) }
      >
        { columnOptions.map((option, index) => (
          <option key={ index } value={ option }>{ option }</option>
        )) }
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ (e) => setComparison(e.target.value) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <label htmlFor="value-filter">
        Filter Value
        <input
          type="number"
          id="value-filter"
          data-testid="value-filter"
          value={ value }
          onChange={ (e) => setValue(e.target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => {
          setFilter({
            ...filter,
            filters: {
              filterByNumericValues: [{ column, comparison, value }],
            },
          });
          deleteColumn(column);
        } }
      >
        Filter
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((planet) => {
              const numericValues = filter.filters.filterByNumericValues[0];
              let filteredValue = [];
              if (numericValues.comparison === 'maior que') {
                filteredValue = Number(planet[numericValues.column])
                  > Number(numericValues.value);
              } else if (numericValues.comparison === 'menor que') {
                filteredValue = Number(planet[numericValues.column])
                  < Number(numericValues.value);
              } else if (numericValues.comparison === 'igual a') {
                filteredValue = Number(planet[numericValues.column])
                  === Number(numericValues.value);
              } return filteredValue;
            }).filter((planet) => planet.name.toLowerCase()
              .includes(filterName.toLowerCase()))
            .map((e) => (
              <tr key={ e.name }>
                <td>{e.name}</td>
                <td>{e.rotation_period}</td>
                <td>{e.orbital_period}</td>
                <td>{e.diameter}</td>
                <td>{e.climate}</td>
                <td>{e.gravity}</td>
                <td>{e.terrain}</td>
                <td>{e.surface_water}</td>
                <td>{e.population}</td>
                <td>{e.films}</td>
                <td>{e.created}</td>
                <td>{e.edited}</td>
                <td>{e.url}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
