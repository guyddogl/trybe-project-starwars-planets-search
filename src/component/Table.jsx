import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import Filters from './Filters';

export default function Table() {
  const {
    isLoading,
    // filterPlanets,
    filteredPlanetList,
  } = useContext(AppContext);

  const formatDate = (param) => {
    const date = new Date(param);
    const year = date.getFullYear();
    const setZero = 10;
    const month = (date.getMonth() + 1) < setZero
      ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const day = date.getDate() < setZero
      ? `0${date.getDate()}` : date.getDate();
    return `${month}/${day}/${year}`;
  };

  return (
    <section className="row mt-4">
      <Filters />
      {isLoading && (
        <div className="spinner-border text-primary" role="status" />
      )}

      <table className="table table-sm table-hover caption-top">
        {/* <caption>StarWars Planets</caption> */}
        <thead className="table-secondary">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Rotation Period</th>
            <th scope="col">Orbital Period</th>
            <th scope="col">Diameter</th>
            <th scope="col">Climate</th>
            <th scope="col">Gravity</th>
            <th scope="col">Terrain</th>
            <th scope="col">Surface Water</th>
            <th scope="col">Population</th>
            <th scope="col">Films</th>
            <th scope="col">Created</th>
            <th scope="col">Edited</th>
            <th scope="col">URL</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {filteredPlanetList.map((planet, index) => (
            <tr key={ index }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              {/* <td>
                {planet.films.map((film) => (
                  <p key={ film }>{film}</p>
                ))}
              </td> */}
              <td>{planet.films.length}</td>
              {/* <td>{planet.created}</td>
              <td>{planet.edited}</td> */}
              <td>{formatDate(planet.created)}</td>
              <td>{formatDate(planet.edited)}</td>
              <td><a href={ planet.url } target="_blank" rel="noreferrer">Link</a></td>
            </tr>))}
        </tbody>
      </table>
    </section>
  );
}
