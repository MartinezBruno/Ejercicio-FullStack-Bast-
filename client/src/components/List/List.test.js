/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import List from './List'

// Test for the List componenta
describe('renders List component', () => {
  it('should render the information correctly', () => {
    const cattle = [
      {
        id: '5d6ede6a0ba62570afcedd3a',
        idSenasa: 'sffsdhj453ed4rhm',
        animalType: 'toro',
        weight: 130,
        name: 'Fede',
        device: 'caravana',
        deviceNumber: '1235sd78',
      },
    ]
    render(<List cattle={cattle} />)
    const idSenasa = screen.getByText(cattle[0].idSenasa)
    const name = screen.getByText(cattle[0].name)
    const animal = screen.getByText(cattle[0].animalType.charAt(0).toUpperCase() + cattle[0].animalType.slice(1))
    const device = screen.getByText(cattle[0].device.charAt(0).toUpperCase() + cattle[0].device.slice(1))

    expect(idSenasa).toBeInTheDocument()
    expect(name).toBeInTheDocument()
    expect(animal).toBeInTheDocument()
    expect(device).toBeInTheDocument()
  })
  it('should render the same amount of elements as the amount of cattle', () => {
    const cattle = [
      {
        id: '5d6ede6a0ba62570afcedd3a',
        idSenasa: 'sffsdhj453ed4rhm',
        animalType: 'toro',
        weight: 130,
        name: 'Fede',
        device: 'caravana',
        deviceNumber: '1235sd78',
      },
      {
        id: '5d6ede6a0ba62570aucedd3a',
        idSenasa: 'sffsdhj453ed4rhm',
        animalType: 'toro',
        weight: 140,
        name: 'Pepe',
        device: 'caravana',
        deviceNumber: '1235sd78',
      },
    ]

    const { container } = render(<List cattle={cattle} />)
    const rows = container.querySelectorAll('tbody tr')

    expect(rows.length).toBe(cattle.length)
    
  })
})
