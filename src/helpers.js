const orderPlanetList = (order, radio, planetsList, setFilterPlanets) => {
  if (order === 'population') {
    const knownPopulation = planetsList
      .filter((planet) => planet.population !== 'unknown');
    const unknownPopulation = planetsList
      .filter((planet) => planet.population === 'unknown');
    if (radio === 'ASC') {
      return setFilterPlanets([
        ...knownPopulation.sort((a, b) => a[order] - b[order]),
        ...unknownPopulation]);
    }
    return setFilterPlanets([
      ...knownPopulation.sort((a, b) => b[order] - a[order]),
      ...unknownPopulation]);
  }
  if (radio === 'ASC') {
    return setFilterPlanets([...planetsList.sort((a, b) => a[order] - b[order])]);
  }
  setFilterPlanets([...planetsList.sort((a, b) => b[order] - a[order])]);
};

export default orderPlanetList;
