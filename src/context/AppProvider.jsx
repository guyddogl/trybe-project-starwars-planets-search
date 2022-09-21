import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

export default function AppProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  const [planetsList, setPlanetsList] = useState([]);

  const [filterPlanets, setFilterPlanets] = useState([]);

  const [filterByName, setFilterByName] = useState('');

  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  const [filterButton, setFilterButton] = useState(false);

  const [filterColumn, setFilterColumn] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water']);

  useEffect(() => {
    setIsLoading(true);
    const getPlanetList = async () => {
      try {
        const URL = 'https://swapi.dev/api/planets';
        const response = await fetch(URL);
        const data = await response.json();
        const removeResidents = data.results
          .map(({ residents, ...lisOfPlanets }) => lisOfPlanets); // https://stackoverflow.com/questions/18133635/remove-property-for-all-objects-in-array
        setPlanetsList(removeResidents);
        setFilterPlanets(removeResidents);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    getPlanetList();
  }, []);

  const verifyFilterComparison = (planet, column, comparison, value) => {
    switch (comparison) {
    case 'maior que':
      return Number(planet[column]) > Number(value) && planet[column] !== 'unknown';
    case 'menor que':
      return Number(planet[column]) < Number(value);
    case 'igual a':
      return Number(planet[column]) === Number(value) && planet[column] !== 'unknown';
    default: return planet;
    }
  };

  useEffect(() => {
    if (filterByNumericValues.length > 0) {
      filterByNumericValues.forEach((filter) => {
        const { column, comparison, value } = filter;
        const filteredPlanetList = filterPlanets
          .filter((planet) => (
            verifyFilterComparison(planet, column, comparison, value)
          ));
        setFilterPlanets(filteredPlanetList);
      });
    }
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
