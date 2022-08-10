import React, { useContext } from 'react';
import tableContext from '../context/tableContext';
import Filter from './Filter';

function Table() {
  const { data, setFilter: { filterName: name },
    filterByNumericValues, removeFilter } = useContext(tableContext);

  return (
    <>
      <Filter />
      { filterByNumericValues && filterByNumericValues.map((elem, index) => (
        <div key={ index } data-testid="filter">
          {`${elem.column_filter} ${elem.comparison_filter} ${elem.value_filter}`}
          <button
            type="button"
            name={ elem.column_filter }
            onClick={ removeFilter }
          >
            X
          </button>
        </div>
      )) }
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
          {data.filter((planet) => planet.name.toLowerCase().includes(name.toLowerCase()))
            .map((e) => (
              <tr key={ e.name }>
                <td data-testid="planet-name">{e.name}</td>
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
