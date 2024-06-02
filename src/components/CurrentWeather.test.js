import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CurrentWeather from './CurrentWeather';
import { getCurrentWeather } from '../services/weatherService';

jest.mock('../services/weatherService', () => ({
    getCurrentWeather: jest.fn(),
}));

beforeEach(() => {
    getCurrentWeather.mockResolvedValue({
        current: {
            temp_c: 20,
            wind_kph: 10,
            precip_mm: 5,
            condition: {
                icon: 'sample-icon-url',
                text: 'Clear Sky',
            },
        },
        location: {
            name: 'Delhi',
            localtime: new Date().toISOString(),
        },
    });
});

test('renders CurrentWeather component and displays data correctly', async () => {
    const { getByText, getByAltText } = render(
        <BrowserRouter>
            <CurrentWeather location="Delhi" unit="C" />
        </BrowserRouter>
    );

    // Check if loading message is displayed
    expect(getByText('Loading...')).toBeInTheDocument();

    // Wait for the mocked getCurrentWeather promise to resolve and component to re-render
    await waitFor(() => {
        expect(getByText('Delhi')).toBeInTheDocument();
        expect(getByText(/Clear Sky/i)).toBeInTheDocument();
        expect(getByText('Wind Speed: 10 km/h')).toBeInTheDocument();
        expect(getByText('Precipitation: 5 mm')).toBeInTheDocument();
        expect(getByText('20' + String.fromCharCode(176) + 'C')).toBeInTheDocument();
        expect(getByAltText('Clear Sky')).toBeInTheDocument();
    });
});
