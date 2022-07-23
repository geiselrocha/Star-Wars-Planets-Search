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
  
  userEvent.selectOptions(columnFilter,
  screen.getByRole('option', { name: /rotation_period/}))
  userEvent.selectOptions(comparisonFilter,
  screen.getByRole('option', { name: 'maior que'}))
  userEvent.type(valueFilter, '500')
  userEvent.click(buttonFilter)
    
  userEvent.selectOptions(columnFilter,
  screen.getByRole('option', { name: /diameter/}))
  userEvent.selectOptions(comparisonFilter,
  screen.getByRole('option', { name: 'menor que'}))
  userEvent.type(valueFilter, '4500000000')
  userEvent.click(buttonFilter)
  
  userEvent.selectOptions(columnFilter,
  screen.getByRole('option', { name: /population/}))
  userEvent.selectOptions(comparisonFilter,
  screen.getByRole('option', { name: 'igual a'}))
  userEvent.type(valueFilter, '10465')
  userEvent.click(buttonFilter)
    
})
  