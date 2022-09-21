import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../context/AppContext';

export default function Table() {
  const { filterByName, setFilterByName, setFilterButton, filterButton,
    filterColumn, setFilterColumn, filterByNumericValues, setFilterByNumericValues,
    planetsList, setFilterPlanets } = useContext(AppContext);

  const [selectOrderControl, setSelectOrderControl] = useState({
    order: 'population',
    radio: '',
  });

  const handleSelectOrderControl = ({ target }) => {
    setSelectOrderControl((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleFilterByName = ({ target }) => setFilterByName(target.value);

  const [selectControl, setSelectControl] = useState({
    column: filterColumn[0],
    comparison: 'maior que',
    value: 0,
  });

  const handleSelectControl = ({ target }) => {
    setSelectControl((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleFilterByNumericValues = () => {
    const newFilter = selectControl;
    setFilterByNumericValues((prevState) => ([
      ...prevState,
      newFilter,
    ]));
    setFilterButton(!filterButton);
  };

  const updateColumnOptions = () => setFilterColumn(filterColumn
    .filter((column) => column !== selectControl.column));

  const removeFilter = (column) => {
    setFilterColumn((prevState) => [...prevState, column]);
    setFilterByNumericValues(filterByNumericValues.filter((e) => e.column !== column));
    setFilterButton(!filterButton);
  };

  const removeAllFilter = () => {
    setFilterByNumericValues([]);
    setFilterButton(!filterButton);
  };

  useEffect(() => setSelectControl({
    column: filterColumn[0],
    comparison: 'maior que',
    value: 0,
  }), [filterButton, filterColumn]);

  const handleFilter = () => {
    updateColumnOptions();
    handleFilterByNumericValues();
  };

  const handleOrder = () => {
    if (selectOrderControl.order === 'population') {
      const knownPopulation = planetsList
        .filter((planet) => planet.population !== 'unknown');
      const unknownPopulation = planetsList
        .filter((planet) => planet.population === 'unknown');
      const { order } = selectOrderControl;
      if (selectOrderControl.radio === 'ASC') {
        return setFilterPlanets([
          ...knownPopulation.sort((a, b) => a[order] - b[order]),
          ...unknownPopulation]);
      }
      return setFilterPlanets([
        ...knownPopulation.sort((a, b) => b[order] - a[order]),
        ...unknownPopulation]);
    }
    const { order } = selectOrderControl;
    setFilterPlanets([]);
    if (selectOrderControl.radio === 'ASC') {
      setFilterPlanets([...planetsList.sort((a, b) => a[order] - b[order])]);
    } else {
      setFilterPlanets([...planetsList.sort((a, b) => b[order] - a[order])]);
    }
  };

  const orderOptions = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];

  const comparisonOptions = ['maior que', 'menor que', 'igual a'];

  return (
    <>
      <div className="input-group mb-3">
        <span className="input-group-text">
          <i className="fa-solid fa-magnifying-glass" />
        </span>
        <input
          type="text"
          name="filterByName"
          placeholder="Search planet by name"
          className="form-control"
          value={ filterByName }
          onChange={ handleFilterByName }
          data-testid="name-filter"
        />
      </div>
      <div className="mb-3 row">
        <label htmlFor="column" className="form-label col-2">
          <b>Column</b>
          <select
            name="column"
            className="form-select"
            data-testid="column-filter"
            value={ selectControl.column }
            onChange={ handleSelectControl }
          >
            {filterColumn.map((column) => (
              <option key={ column } value={ column }>{column}</option>
            ))}
          </select>
        </label>
        <label htmlFor="comparison" className="form-label col-2">
          <b>Comparison</b>
          <select
            name="comparison"
            className="form-select"
            data-testid="comparison-filter"
            value={ selectControl.comparison }
            onChange={ handleSelectControl }
          >
            {comparisonOptions.map((e) => <option key={ e } value={ e }>{e}</option>)}
          </select>
        </label>
        <label htmlFor="value" className="form-label col-1">
          <b>Number</b>
          <input
            type="number"
            name="value"
            className="form-control"
            value={ selectControl.value }
            onChange={ handleSelectControl }
            data-testid="value-filter"
          />
        </label>
        <button
          type="button"
          className="col-1 btn btn-md btn-dark me-4"
          onClick={ handleFilter }
          data-testid="button-filter"
        >
          Filter
        </button>
        <label htmlFor="order" className="form-label col-2">
          <b>Order</b>
          <select
            name="order"
            className="form-select"
            value={ selectOrderControl.order }
            onChange={ handleSelectOrderControl }
            data-testid="column-sort"
          >
            {orderOptions.map((opt) => <option key={ opt } value={ opt }>{opt}</option>)}
          </select>
        </label>
        <div className="col-2" style={ { maxWidth: '100px' } }>
          <label className="form-check-label mx-2 mt-3" htmlFor="ASC">
            ASC
            <input
              className="form-check-input ms-1"
              type="radio"
              name="radio"
              value="ASC"
              onChange={ handleSelectOrderControl }
              data-testid="column-sort-input-asc"
            />
          </label>
          <br />
          <label className="form-check-label mx-2" htmlFor="DESC">
            DESC
            <input
              className="form-check-input ms-1"
              type="radio"
              name="radio"
              value="DESC"
              onChange={ handleSelectOrderControl }
              data-testid="column-sort-input-desc"
            />
          </label>
        </div>
        <button
          type="button"
          className="col-1 btn btn-md btn-dark me-4 border"
          onClick={ handleOrder }
          data-testid="column-sort-button"
        >
          Order
        </button>
      </div>
      <ul className="list-group-flush">
        <li className="list-group-item active" aria-current="true">
          {filterByNumericValues.length > 0 && <b>Active Filters</b>}
        </li>
        {filterByNumericValues.map((e) => (
          <li key={ e.column } className="list-group-item my-2">
            <div className="row align-items-center" data-testid="filter">
              <div className="col-1" style={ { maxWidth: '50px' } }>
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={ () => removeFilter(e.column) }
                >
                  <i className="fa-solid fa-xmark" />
                </button>
              </div>
              <div className="col-4">{`${e.column} ${e.comparison} ${e.value}`}</div>
            </div>
          </li>))}
        <li className="list-group-item" aria-current="true">
          {filterByNumericValues.length > 0 && (
            <div className="row align-items-center" data-testid="filter">
              <div className="col-3 text-center mt-2">
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={ removeAllFilter }
                  data-testid="button-remove-filters"
                >
                  <i className="fa-solid fa-trash me-2" />
                  Remove All Filters
                </button>
              </div>
            </div>
          )}
        </li>
      </ul>
    </>
  );
}
