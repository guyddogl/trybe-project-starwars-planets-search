import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import Filters from './Filters';

export default function Table() {
  const {
    isLoading,
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

  const tableHead = ['Name', ' Rotation Period', 'Orbital Period', 'Diameter',
    'Climate', 'Gravity', 'Terrain', 'Surface Water', 'Population', 'Films',
    'Created', 'Edited', 'URL'];

  return (
    <section className="row mt-4">
      <Filters />
      {isLoading ? (
        <div className="col-12 text-center">
          <button className="btn btn-light btn-lg" type="button" disabled>
            <span className="spinner-border spinner-border-sm me-2" />
            Loading...
          </button>
        </div>
      ) : (
        <table className="table table-sm table-hover">
          <thead className="table-secondary">
            <tr>
              {tableHead.map((head) => <th key={ head } scope="col">{head}</th>)}
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {filteredPlanetList.map((planet, index) => (
              <tr key={ index }>
                <td data-testid="planet-name">{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films.length}</td>
                <td>{formatDate(planet.created)}</td>
                <td>{formatDate(planet.edited)}</td>
                <td><a href={ planet.url } target="_blank" rel="noreferrer">Link</a></td>
              </tr>))}
          </tbody>
        </table>)}
    </section>
  );
}
