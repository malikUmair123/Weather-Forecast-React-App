// src/components/HourlyForecast.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import HourlyForecast from './HourlyForecast';
import '@testing-library/jest-dom';

test('renders HourlyForecast component', () => {
    render(<HourlyForecast location="London" unit="C" />);
    expect(screen.getByText(/Hourly Forecast/i)).toBeInTheDocument();
});
