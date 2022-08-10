import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import tableContext from './tableContext';

function TableProvider({ children }) {
  const [data, setData] = useState([]);
  const [defaultData, setDefaultData] = useState([]);
  const [setFilter, setDataFilter] = useState({
    filterName: '',
    value_filter: '0',
    column_filter: 'population',
    comparison_filter: 'maior que',
    ascending: false,
    downward: false });
  const [columnFilter, setColumnFilter] = useState([]);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const filterByNumericValue = {
    value_filter: setFilter.value_filter,
    column_filter: setFilter.column_filter,
    comparison_filter: setFilter.comparison_filter };
  const [filterList, setFilterList] = useState(false);

  const handleChange = ({ target }) => {
    if (target.id === 'ascending') {
      setDataFilter((elem) => ({ ...elem, [target.id]: true, downward: false })); return;
    } if (target.id === 'downward') {
      setDataFilter((elem) => ({ ...elem, [target.id]: true, ascending: false })); return;
    } setDataFilter((elem) => ({ ...elem, [target.name]: target.value }));
  };

  useEffect(() => {
    const fetchApiData = async () => {
      const { results } = await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
        .then((elem) => elem.json());
      const sortResuts = results.sort((a, b) => {
        if (a.name.toLowerCase() === b.name.toLowerCase()) return 0;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        const MINUS_ONE = -1;
        return MINUS_ONE;
      });
      setData(sortResuts);
      setDefaultData(results);
    };
    fetchApiData();

    setColumnFilter(
      ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
    );
  }, []);

  const handleClickFilter = () => {
    const filters = data.filter((elem) => {
      if (setFilter.comparison_filter === 'maior que') {
        return +elem[setFilter.column_filter] > +setFilter.value_filter;
      } if (setFilter.comparison_filter === 'menor que') {
        return +elem[setFilter.column_filter] < +setFilter.value_filter;
      } return +elem[setFilter.column_filter] === +setFilter.value_filter;
    });

    if (filterByNumericValues.length < 1) {
      setFilterByNumericValues([filterByNumericValue]);
    } else {
      setFilterByNumericValues((elem) => [...elem, filterByNumericValue]);
    } setData(filters);

    const setRepeatFilter = (
      columnFilter.filter((elem) => elem !== setFilter.column_filter));
    setColumnFilter(setRepeatFilter);
    setDataFilter((elem) => ({ ...elem, column_filter: setRepeatFilter[0] }));
    if (columnFilter.length <= 1) { setFilterList(true); }
  };

  const removeFilter = ({ target: { name } }) => {
    if (filterByNumericValues.length === 1) {
      setDataFilter((elem) => ({
        ...elem, column_filter: filterByNumericValues[0].column_filter }));
      setColumnFilter([filterByNumericValues[0].column_filter, ...columnFilter]);
      setFilterByNumericValues([]);
      return setData(defaultData);
    }

    const setNewFilter = filterByNumericValues
      .filter((elem) => elem.column_filter !== name);
    setFilterByNumericValues(setNewFilter);
    setNewFilter.forEach((elem) => {
      setData(defaultData
        .filter((index) => +index[elem.column_filter] > +elem.value_filter));
    });
    setColumnFilter((elem) => ([name, ...elem]));
  };

  const handleClickRemove = () => {
    setDataFilter((elem) => (
      { ...elem, column_filter: filterByNumericValues[0].column_filter }));
    filterByNumericValues.forEach((elem) => {
      setColumnFilter((index) => [...index, elem.column_filter]);
      setFilterByNumericValues([]);
      setData(defaultData);
    });
    setFilterList(false);
  };

  const handleSortClick = () => {
    if (setFilter.column_filter === 'population') {
      if (setFilter.ascending) {
        setData([...(data.filter((elem) => elem.population !== 'unknown')),
          ...(data.filter((elem) => elem.population === 'unknown'))]
          .sort((elem, index) => +(elem.population) - +(index.population)));
        return;
      } setData([...(data.filter((elem) => elem.population !== 'unknown'))
        .sort((elem, index) => elem.population - index.population).reverse(),
      ...(data.filter((elem) => elem.population === 'unknown'))]);
    }
    if (setFilter.ascending && setFilter.column_filter !== 'population') {
      const ASC = [];
      data.forEach((elem) => {
        ASC.push(elem);
        ASC.sort((a, b) => (a[setFilter.column_filter] - b[setFilter.column_filter]));
      });
      setData(ASC);
      return;
    }
    if (setFilter.downward && setFilter.column_filter !== 'population') {
      const DESC = [];
      data.forEach((elem) => {
        DESC.push(elem);
        DESC.sort((a, b) => (-a[setFilter.column_filter] - -b[setFilter.column_filter]));
      });
      setData(DESC);
    }
  };

  return (
    <tableContext.Provider
      value={
        { data,
          defaultData,
          setFilter,
          columnFilter,
          filterByNumericValues,
          filterList,
          handleChange,
          handleClickFilter,
          removeFilter,
          handleClickRemove,
          handleSortClick }
      }
    >
      {children}
    </tableContext.Provider>
  );
}
TableProvider.propTypes = { children: PropTypes.oneOfType(
  [PropTypes.arrayOf(PropTypes.node), PropTypes.node],
).isRequired };

export default TableProvider;
