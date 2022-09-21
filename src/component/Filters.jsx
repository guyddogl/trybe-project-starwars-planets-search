import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';

export default function Table() {
  const {
    filterByName,
    setFilterByName,
    setFilterButton,
    filterButton,
    // planetList,
    // setPlanetList,
    // filterByNumericValues,
    setFilterByNumericValues,
  } = useContext(AppContext);

  const [selectControl, setSelectControl] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const handleFilterByName = ({ target }) => setFilterByName(target.value);

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

  const handleFilter = () => {
    handleFilterByNumericValues();
    // console.log(filterByNumericValues[0].column);
    // const teste = filterByNumericValues[0].column;
    // const newFilter = planetList.planets
    //   .filter((planet) => planet[teste] === '12500');
    // setPlanetList((prevState) => ({
    //   ...prevState,
    //   filteredPlanets: newFilter,
    // }));
  };

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
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
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
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
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
          className="col-1 btn btn-md btn-dark"
          onClick={ handleFilter }
          data-testid="button-filter"
        >
          Filter
        </button>
      </div>
    </>
  );
}
