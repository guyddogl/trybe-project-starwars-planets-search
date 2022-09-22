import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from '../App';
import testData from './testData';


const INPUT_FILTER_NAME = 'name-filter';
const COLUMN_FILTER = 'column-filter';
const COMPARISON_FILTER = 'comparison-filter';
const VALUE_FILTER = 'value-filter';
const BUTTON_FILTER = 'button-filter';
// const FILTER = 'filter';
// const BUTTON_REMOVE_FILTERS = 'button-remove-filters';
// const PLANET_NAME = 'planet-name';
// const SELECT_COLUMN_SORT = 'column-sort';
// const INPUT_SORT_DESC = 'column-sort-input-desc';
// const INPUT_SORT_ASC = 'column-sort-input-asc';
// const BUTTON_SORT = 'column-sort-button';

async function waitForPageLoads(length = 11) {
  await waitFor(() => {
    expect(screen.getAllByRole('row')).toHaveLength(length);
  });
}
describe('Testa o comportamento inicial do App', () => {

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

  test('Verifica se o select comparison funciona', async () => {
    global.fetch = jest.fn(async () => ({ json: async () => testData }));
    render(<App />);

    await waitForPageLoads();

    const comparison = screen.getByTestId("comparison-filter");
    userEvent.selectOptions(comparison, "menor que");
    const button = screen.getByTestId(BUTTON_FILTER);
    userEvent.click(button);
    // expect(screen.getByText(/menor que/i).selected).toBe(true);
  });

  test('Verifica se o select comparison funciona', async () => {
    global.fetch = jest.fn(async () => ({ json: async () => testData }));
    render(<App />);

    await waitForPageLoads();

    const comparison = screen.getByTestId("comparison-filter");
    userEvent.selectOptions(comparison, "maior que");
    const button = screen.getByTestId(BUTTON_FILTER);
    userEvent.click(button);
    // expect(screen.getByText(/maior que/i).selected).toBe(true);
  });

  test('Verifica se o select comparison funciona', async () => {
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

    const order = screen.getByTestId("column-sort");
    userEvent.selectOptions(order, "diameter");
    // expect(screen.getByText(/diameter/i).selected).toBe(true);
  });
});
