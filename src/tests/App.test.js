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

async function waitForPageLoads(length = 11) {
  await waitFor(() => {
    expect(screen.getAllByRole('row')).toHaveLength(length);
  });
}
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
    userEvent.type(input, 'aa');
    const planet = await screen.findByText(/Alderaan/i);
    expect(planet).toBeInTheDocument();
  });

  test('Verifica se o botão remover todos os filtros funciona', async () => {
    global.fetch = jest.fn(async () => ({ json: async () => testData }));
    render(<App />);
    const comparison = screen.getByTestId("comparison-filter");
    userEvent.selectOptions(comparison, "menor que");
    const buttonFilter = screen.getByTestId(BUTTON_FILTER);
    userEvent.click(buttonFilter);
    const button = screen.getByTestId('button-remove-filters');
    userEvent.click(button);
  });

  test('Verifica se o botão remover um filtro funciona', async () => {
    global.fetch = jest.fn(async () => ({ json: async () => testData }));
    render(<App />);
    const comparison = screen.getByTestId("comparison-filter");
    userEvent.selectOptions(comparison, "menor que");
    const buttonFilter = screen.getByTestId(BUTTON_FILTER);
    userEvent.click(buttonFilter);
    const button = screen.getByTestId('remove-filter');
    userEvent.click(button);
  });
});
