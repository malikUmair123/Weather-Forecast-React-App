import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // or appropriate router component

import App from './App';

test('renders learn react link', () => {
    render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
});
