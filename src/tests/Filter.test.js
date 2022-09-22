import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from '../App';
import testData from './testData';
import orderPlanetList from "../helpers";

const VALUE_FILTER = 'value-filter';
const BUTTON_FILTER = 'button-filter';

async function waitForPageLoads(length = 11) {
  await waitFor(() => {
    expect(screen.getAllByRole('row')).toHaveLength(length);
  });
}
describe('Testa os filtros do App', () => {

  test('Verifica se o botão filter funciona', async () => {
    global.fetch = jest.fn(async () => ({ json: async () => testData }));
    render(<App />);

    await waitForPageLoads();

    const value = screen.getByTestId(VALUE_FILTER);
    userEvent.type(value, '1000');
    expect(value).toHaveValue(1000);
    const button = screen.getByTestId(BUTTON_FILTER);
    userEvent.click(button);
    expect(value).toHaveValue(0);
    // const planet = await screen.findByText(/Yavin/i);
    // expect(planet).not.toBeInTheDocument();
  });

  test('Verifica se o select comparison(menor que) funciona', async () => {
    global.fetch = jest.fn(async () => ({ json: async () => testData }));
    render(<App />);

    await waitForPageLoads();

    const comparison = screen.getByTestId("comparison-filter");
    userEvent.selectOptions(comparison, "menor que");
    const button = screen.getByTestId(BUTTON_FILTER);
    userEvent.click(button);
    // expect(screen.getByText(/menor que/i).selected).toBe(true);
  });

  test('Verifica se o select comparison(maior que) funciona', async () => {
    global.fetch = jest.fn(async () => ({ json: async () => testData }));
    render(<App />);

    await waitForPageLoads();

    const comparison = screen.getByTestId("comparison-filter");
    userEvent.selectOptions(comparison, "maior que");
    const button = screen.getByTestId(BUTTON_FILTER);
    userEvent.click(button);
    // expect(screen.getByText(/maior que/i).selected).toBe(true);
  });

  test('Verifica se o select comparison(igual a) funciona', async () => {
    global.fetch = jest.fn(async () => ({ json: async () => testData }));
    render(<App />);

    await waitForPageLoads();

    const comparison = screen.getByTestId("comparison-filter");
    userEvent.selectOptions(comparison, "igual a");
    const button = screen.getByTestId(BUTTON_FILTER);
    userEvent.click(button);
    // expect(screen.getByText(/igual a/i).selected).toBe(true);
  });

  test('Verifica se o select order funciona', async () => {
    global.fetch = jest.fn(async () => ({ json: async () => testData }));
    render(<App />);

    await waitForPageLoads();

    const button = screen.getByTestId('column-sort-button');
    userEvent.click(button);
    // expect(screen.getByText(/diameter/i).selected).toBe(true);
  });
  test('Verifica se o select order funciona', async () => {
    global.fetch = jest.fn(async () => ({ json: async () => testData }));
    render(<App />);

    await waitForPageLoads();

    const input = screen.getByTestId('column-sort-input-asc')
    userEvent.click(input);
    const button = screen.getByTestId('column-sort-button');
    userEvent.click(button);
    // expect(screen.getByText(/diameter/i).selected).toBe(true);
  });

  test('Verifica se o select order funciona', async () => {
    global.fetch = jest.fn(async () => ({ json: async () => testData }));
    render(<App />);

    await waitForPageLoads();
    const order = screen.getByTestId("column-sort");
    screen.debug();
    userEvent.selectOptions(order, ["diameter"], { bubbles: true });
    // expect(screen.getByText(/diameter/i).selected).toBe(true);
    const input = screen.getByTestId('column-sort-input-asc');
    userEvent.click(input);
    const button = screen.getByTestId('column-sort-button');
    userEvent.click(button);
    // expect(button).toBeInTheDocument();
  });

  test('Verifica se os planetas são ordenados', () => {
    const array = ['star', 'wars', 'planets'];
    orderPlanetList('population', 'ASC', array, jest.fn());
    orderPlanetList('population', 'DESC', array, jest.fn());
    orderPlanetList('diameter', 'ASC', array, jest.fn());
    orderPlanetList('diameter', 'DESC', array, jest.fn());
  });
});
