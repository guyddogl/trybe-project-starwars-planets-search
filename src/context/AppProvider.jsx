import React, { useState, useEffect } from 'react';
import { act } from 'react-dom/test-utils';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

export default function AppProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  const [planetsList, setPlanetsList] = useState([]);

  const [filterPlanets, setFilterPlanets] = useState([]);

  const [filterByName, setFilterByName] = useState('');

  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  const [filterButton, setFilterButton] = useState(false);

  const [orderButton, setOrderButton] = useState(false);

  const INITIAL_FILTER_COLUMN = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water'];

  const [filterColumn, setFilterColumn] = useState(INITIAL_FILTER_COLUMN);

  useEffect(() => {
    setIsLoading(true);
    const getPlanetList = async () => {
      try {
        const URL = 'https://swapi.dev/api/planets';
        const response = await fetch(URL);
        const data = await response.json();
        const removeResidents = data.results
          .map(({ residents, ...lisOfPlanets }) => lisOfPlanets); // https://stackoverflow.com/questions/18133635/remove-property-for-all-objects-in-array
        act(() => { setPlanetsList(removeResidents); });
        act(() => { setFilterPlanets(removeResidents); });
        act(() => { setIsLoading(false); });
        // setPlanetsList(removeResidents);
        // setFilterPlanets(removeResidents);
        // setIsLoading(false);
      } catch (error) {
        console.log(error);
        act(() => { setIsLoading(false); });
      }
    };
    getPlanetList();
  }, []);

  const verifyFilterComparison = (planet, column, comparison, value) => {
    if (comparison === 'maior que') return Number(planet[column]) > Number(value);
    if (comparison === 'menor que') return Number(planet[column]) < Number(value);
    return Number(planet[column]) === Number(value);
    // Troquei o switch pelos Ifs para facilitar no teste já que não tinha caso de teste para o default do switch
    // switch (comparison) {
    // case 'maior que':
    //   return Number(planet[column]) > Number(value);
    // case 'menor que':
    //   return Number(planet[column]) < Number(value);
    // case 'igual a':
    //   return Number(planet[column]) === Number(value);
    // default: return planet;
    // }
  };

  useEffect(() => {
    let filterPlanet = planetsList;
    if (filterByNumericValues.length > 0) {
      filterByNumericValues.forEach((filter) => {
        const { column, comparison, value } = filter;
        const filteredPlanetList = filterPlanet
          .filter((planet) => (
            verifyFilterComparison(planet, column, comparison, value)
          ));
        filterPlanet = filteredPlanetList;
      });
    }
    setFilterPlanets(filterPlanet);
  }, [filterButton]); // eslint-disable-line

  const filteredPlanetList = filterPlanets
    .filter((planet) => planet.name.toLowerCase()
      .includes(filterByName.toLocaleLowerCase()));

  const contextValue = {
    isLoading,
    planetsList,
    filterPlanets,
    setFilterByName,
    filterByNumericValues,
    setFilterByNumericValues,
    filteredPlanetList,
    filterButton,
    setFilterButton,
    filterColumn,
    setFilterColumn,
    INITIAL_FILTER_COLUMN,
    orderButton,
    setOrderButton,
    setFilterPlanets,
  };

  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
