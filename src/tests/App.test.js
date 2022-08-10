import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import testData from '../../cypress/mocks/testData';

beforeEach(()=>{
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: ()=> testData
  })
})

// test('I am your test', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/Hello, App!/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('Testa a cobertura da aplicação', async() => {
  render(<App />);

  const tatooine = await screen.findByText(/tatooine/i)
  const columnHeader = await screen.findAllByRole('columnheader')
  const name = await screen.findByRole('columnheader', {name: /name/i})
  const hoth = await screen.findByText('Hoth')
  const columnFilter = screen.getByTestId('column-filter')
  const comparisonFilter = screen.getByTestId('comparison-filter')
  const valueFilter = screen.getByTestId('value-filter')
  const buttonFilter = screen.getByTestId('button-filter')
  
  expect(tatooine).toBeInTheDocument();
  expect(columnHeader).toHaveLength(13);
  expect(name).toBeInTheDocument();
  userEvent.click(buttonFilter)
  expect(hoth).not.toBeInTheDocument()
  
  userEvent.selectOptions(columnFilter, 'rotation_period')
  userEvent.selectOptions(comparisonFilter, 'maior que')
  userEvent.type(valueFilter, '10')
  userEvent.click(buttonFilter)
    
  userEvent.selectOptions(columnFilter, 'diameter')
  userEvent.selectOptions(comparisonFilter, 'menor que')
  userEvent.type(valueFilter, '5000')
  userEvent.click(buttonFilter)

  userEvent.selectOptions(columnFilter, 'surface_water')
  userEvent.selectOptions(comparisonFilter, 'igual a')
  userEvent.type(valueFilter, '40')
  userEvent.click(buttonFilter)
})

test('O input de ordenar por ascendente', async () => {
  render(<App />);
    
  const planetName = ['Yavin IV', 'Tatooine', 'Bespin', 'Endor', 'Kamino', 'Alderaan', 'Naboo', 'Coruscant', 'Dagobah', 'Hoth'];
  const columnSortButton = await screen.findByTestId('column-sort-button', '', {timeout: 3500})
  const columnSort = screen.getByTestId('column-sort')
  const columnSortInputAsc = screen.getByTestId('column-sort-input-asc')
  userEvent.selectOptions(columnSort, 'population')
  userEvent.click(columnSortInputAsc)
  userEvent.click(columnSortButton)
  const planets = await screen.findAllByTestId('planet-name', '', {timeout: 3500})
  expect(planets).toHaveLength(10)
  planets.forEach((planet, index) => expect(planet).toHaveTextContent(planetName[index]))
}, 35000)
    
test('O input de ordenar por descendente', async () => {
  render(<App />);
    
  const planetName = ['Coruscant', 'Naboo', 'Alderaan', 'Kamino', 'Endor', 'Bespin', 'Tatooine', 'Yavin IV', 'Dagobah', 'Hoth'];
  const columnSortButton = await screen.findByTestId('column-sort-button', '', {timeout: 3500})
  const columnSort = screen.getByTestId('column-sort')
  const columnSortInputAsc = screen.getByTestId('column-sort-input-desc')
  userEvent.selectOptions(columnSort, 'population')
  userEvent.click(columnSortInputAsc)
  userEvent.click(columnSortButton)
  const planets = await screen.findAllByTestId('planet-name', '', {timeout: 3500})
  expect(planets).toHaveLength(10)
  planets.forEach((planet, index) => expect(planet).toHaveTextContent(planetName[index]))
}, 35000)

test('Se ordena os filtros', async () => {
  render(<App />);

  const columnFilter = screen.getByTestId('column-filter');
  const valueFilter = screen.getByTestId('value-filter');
  const buttonFilter = screen.getByTestId('button-filter');
  const removeFilters = screen.getByRole('button', { name: /remove filters/i });

  expect(columnFilter).toHaveValue('population');
  expect(valueFilter).toHaveValue(0);
  expect(removeFilters).toBeInTheDocument();

  userEvent.selectOptions(columnFilter, 'diameter');
  userEvent.type(valueFilter, '10000');
  userEvent.click(buttonFilter);
  userEvent.click(removeFilters);
})
  
test('Se remove filtro individual', async () => {
  render(<App />);

  const buttonFilter = await screen.findByTestId('button-filter', '', {timeout: 5000})
  userEvent.click(buttonFilter)
  const removeAll = screen.getByRole('button', { name: /X/i })
  expect(removeAll).toBeDefined()
  userEvent.click(removeAll)
  expect(removeAll).toBeTruthy()
})
  