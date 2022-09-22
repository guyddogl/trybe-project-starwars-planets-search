import orderPlanetList from "../helpers";

const array = ['star', 'wars', 'planets'];

test('Verifica se os planetas são ordenados', () => {
  orderPlanetList('population', 'ASC', array, jest.fn());
  orderPlanetList('population', 'DESC', array, jest.fn());
  orderPlanetList('diameter', 'ASC', array, jest.fn());
  orderPlanetList('diameter', 'DESC', array, jest.fn());
});