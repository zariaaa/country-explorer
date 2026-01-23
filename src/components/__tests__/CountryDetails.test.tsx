import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CountryDetails from '../CountryDetails';
import type { Country } from '../../interfaces/Country.interface';

describe('CountryDetails', () => {
    const mockCountry: Country = {
        name: {
            common: 'Test Country',
            official: 'Test Country Official',
            nativeName: {
                eng: {
                    official: 'Test Country Official',
                    common: 'Test Country',
                },
            },
        },
        region: 'Test Region',
        flags: {
            png: 'test.png',
            svg: 'test.svg',
            alt: 'Test Flag',
        },
        capital: ['Test Capital'],
        cca3: 'TST',
        population: 1000000,
    };

    const mockOnClose = vi.fn();

    beforeEach(() => {
        mockOnClose.mockClear();
    });

    it('should render country details correctly', () => {
        render(
            <CountryDetails
                country={mockCountry}
                open={true}
                onClose={mockOnClose}
            />
        );

        expect(screen.getByTestId('dialog-title')).toHaveTextContent('Test Country Official');
        expect(screen.getByText('Test Capital')).toBeInTheDocument();
        expect(screen.getByText('1000000')).toBeInTheDocument();
        expect(screen.getAllByText('N/A').length).toBeGreaterThan(0); // Languages & Currencies
        expect(screen.getByTestId('dialog-flag')).toHaveAttribute('src', 'test.svg');
    });

    it('should close dialog when close button is clicked', () => {
        render(
            <CountryDetails
                country={mockCountry}
                open={true}
                onClose={mockOnClose}
            />
        );

        const closeButton = screen.getByTestId('dialog-close-button');
        fireEvent.click(closeButton);

        expect(mockOnClose).toHaveBeenCalled();
    });

    it('should not render when country is null', () => {
        const { container } = render(
            <CountryDetails
                country={null}
                open={true}
                onClose={mockOnClose}
            />
        );

        expect(container.firstChild).toBeNull();
    });

    it('should display N/A for missing capital', () => {
        const countryWithoutCapital: Country = {
            ...mockCountry,
            capital: [],
        };

        render(
            <CountryDetails
                country={countryWithoutCapital}
                open={true}
                onClose={mockOnClose}
            />
        );

        const capitalElements = screen.getAllByText('N/A');
        expect(capitalElements.length).toBeGreaterThan(0);
    });
});
