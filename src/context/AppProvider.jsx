import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

export default function AppProvider({ children }) {
  const [planetList, setPlanetList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getPlanetList = async () => {
      try {
        const URL = 'https://swapi.dev/api/planets';
        const response = await fetch(URL);
        const data = await response.json();
        const removeResidents = [];
        data.results.map((planet) => removeResidents.push({
          name: planet.name,
          rotation_period: planet.rotation_period,
          orbital_period: planet.orbital_period,
          diameter: planet.diameter,
          climate: planet.climate,
          gravity: planet.gravity,
          terrain: planet.terrain,
          surface_water: planet.surface_water,
          population: planet.population,
          films: planet.films,
          created: planet.created,
          edited: planet.edited,
          url: planet.url,
        }));
        setPlanetList(removeResidents);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    getPlanetList();
  }, []);

  const contextValue = {
    planetList,
    isLoading,
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
