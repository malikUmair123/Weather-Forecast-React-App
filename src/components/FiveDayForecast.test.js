// src/components/FiveDayForecast.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import FiveDayForecast from './FiveDayForecast';
import '@testing-library/jest-dom';

test('renders FiveDayForecast component', () => {
    render(<FiveDayForecast location="London" unit="C" />);
    expect(screen.getByText(/5-Day Forecast/i)).toBeInTheDocument();
});
