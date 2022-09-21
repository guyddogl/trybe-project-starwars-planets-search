import React from 'react';
import { render, screen } from '@testing-library/react';
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

describe('Testa o comportamento inicial do App', () => {

  test('Verifica se a api é chamada corretamente', async () => {
    global.fetch = jest.fn(async () => ({ json: async () => testData }));
    render(<App />);
    const endpoint = 'https://swapi.dev/api/planets';
    const planet = await screen.findByText(/Tatooine/i);
    expect(planet).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(endpoint);
  });

  test('Verifica se a tabela é exibida', async () => {
    render(<App />);
    const table = await screen.findByRole('table');
    expect(table).toBeInTheDocument();
  });

  test('Verifica as opções de filtros', () => {
    render(<App />);
    const input = screen.getByTestId(INPUT_FILTER_NAME);
    const column = screen.getByTestId(COLUMN_FILTER);
    const comparison = screen.getByTestId(COMPARISON_FILTER);
    const value = screen.getByTestId(VALUE_FILTER);
    const button = screen.getByTestId(BUTTON_FILTER);
    expect(input).toBeInTheDocument();
    expect(column).toBeInTheDocument();
    expect(comparison).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('Verifica se é possível filtrar pelo nome', async () => {
    global.fetch = jest.fn(async () => ({ json: async () => testData }));
    render(<App />);
    const input = screen.getByTestId(INPUT_FILTER_NAME);
    userEvent.type(input, 'Tat');
    const planet = await screen.findByText(/Tatooine/i);
    expect(planet).toBeInTheDocument();
  });

  test('Verifica se o botão filter funciona', async () => {
    global.fetch = jest.fn(async () => ({ json: async () => testData }));
    render(<App />);
    const value = screen.getByTestId(VALUE_FILTER);
    userEvent.type(value, '1000');
    const button = screen.getByTestId(BUTTON_FILTER);
    userEvent.click(button);
    const planet = await screen.findByText(/Yavin/i);
    expect(planet).not.toBeInTheDocument();
  });

  test('Verifica se o select comparison funciona', async () => {
    global.fetch = jest.fn(async () => ({ json: async () => testData }));
    render(<App />);
    const comparison = screen.getByTestId("comparison-filter");
    userEvent.selectOptions(comparison, "menor que");
    const button = screen.getByTestId(BUTTON_FILTER);
    userEvent.click(button);
    expect(screen.getByText(/menor que/i).selected).toBe(true);
  });

  test('Verifica se o select order funciona', async () => {
    global.fetch = jest.fn(async () => ({ json: async () => testData }));
    render(<App />);
    const order = screen.getByTestId("column-sort");
    userEvent.selectOptions(order, "diameter");
    expect(screen.getByText(/diameter/i).selected).toBe(true);
  });

  test('Verifica se o botão remover todos os filtros aparece na tela', async () => {
    global.fetch = jest.fn(async () => ({ json: async () => testData }));
    render(<App />);
    const comparison = screen.getByTestId("comparison-filter");
    userEvent.selectOptions(comparison, "menor que");
    const button = screen.getByTestId('button-remove-filters');
    userEvent.click(button);
  });

});
