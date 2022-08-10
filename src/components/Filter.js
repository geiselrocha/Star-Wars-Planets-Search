import React, { useContext } from 'react';
import tableContext from '../context/tableContext';

function Filter() {
  const { setFilter, columnFilter, filterList, handleChange,
    handleClickFilter, handleClickRemove, handleSortClick } = useContext(tableContext);

  return (
    <>
      <label htmlFor="name-filter">
        Search
        <input
          type="text"
          name="filterName"
          data-testid="name-filter"
          value={ setFilter.filterName }
          onChange={ handleChange }
          placeholder="Search Planets By Name"
        />
      </label>
      <label htmlFor="column-filter">
        Column
        <select
          name="column_filter"
          data-testid="column-filter"
          value={ setFilter.column_filter }
          onChange={ handleChange }
        >
          {columnFilter.map((index) => (
            <option key={ index } value={ index }>{index}</option>
          )) }
        </select>
      </label>
      <label htmlFor="comparison-filter">
        Comparison
        <select
          name="comparison_filter"
          data-testid="comparison-filter"
          value={ setFilter.comparison_filter }
          onChange={ handleChange }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <input
        type="number"
        id="value-filter"
        name="value_filter"
        data-testid="value-filter"
        value={ setFilter.value_filter }
        onChange={ handleChange }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClickFilter }
        disabled={ filterList }
      >
        Filter Value
      </button>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ handleClickRemove }
      >
        Remove Filters
      </button>
      <label htmlFor="column_sort">
        Sort
        <select
          id="column_filter"
          name="column_filter"
          data-testid="column-sort"
          value={ setFilter.column_filter }
          onChange={ handleChange }
        >
          {columnFilter.map((index) => (
            <option key={ index } value={ index }>{index}</option>
          )) }
        </select>
      </label>
      <label htmlFor="ascending">
        Ascending
        <input
          type="radio"
          id="ascending"
          name="sort"
          value="asc"
          data-testid="column-sort-input-asc"
          checked={ setFilter.ascending }
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="downward">
        Downward
        <input
          type="radio"
          id="downward"
          name="sort"
          value="desc"
          data-testid="column-sort-input-desc"
          checked={ setFilter.downward }
          onChange={ handleChange }
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ handleSortClick }
      >
        Sort
      </button>
    </>
  );
}

export default Filter;
