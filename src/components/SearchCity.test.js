// src/components/SearchCity.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchCity from './SearchCity';
import '@testing-library/jest-dom';

test('renders SearchCity component and handles input', () => {
    const onCitySelect = jest.fn();
    render(<SearchCity onCitySelect={onCitySelect} />);

    const input = screen.getByPlaceholderText(/Search for a city/i);
    fireEvent.change(input, { target: { value: 'London' } });

    expect(input.value).toBe('London');
});
