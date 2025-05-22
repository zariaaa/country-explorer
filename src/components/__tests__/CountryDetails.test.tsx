import { describe, it, expect, vi } from 'vitest';
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

    const mockFavourites = {
        'Test Country Official': 'Test note',
    };

    const mockOnClose = vi.fn();
    const mockUpdateNote = vi.fn();

    it('should render country details correctly', () => {
        render(
            <CountryDetails
                country={mockCountry}
                open={true}
                onClose={mockOnClose}
                favourites={mockFavourites}
                updateNote={mockUpdateNote}
            />
        );

        expect(screen.getByText('Test Country Official')).toBeInTheDocument();
        expect(screen.getByText(/Region:\s*Test Region/)).toBeInTheDocument();
        expect(screen.getByText(/Capital:\s*Test Capital/)).toBeInTheDocument();
        expect(screen.getByText(/Population:\s*1000000/)).toBeInTheDocument();
        expect(screen.getByText(/Languages:\s*N\/A/)).toBeInTheDocument();
        expect(screen.getByAltText('Country flag')).toHaveAttribute('src', 'test.png');
    });

    it('should handle note updates', () => {
        render(
            <CountryDetails
                country={mockCountry}
                open={true}
                onClose={mockOnClose}
                favourites={mockFavourites}
                updateNote={mockUpdateNote}
            />
        );

        const noteInput = screen.getByRole('textbox');
        fireEvent.change(noteInput, { target: { value: 'New test note' } });
        fireEvent.blur(noteInput);

        expect(mockUpdateNote).toHaveBeenCalledWith('Test Country Official', 'New test note');
    });

    it('should close dialog when close button is clicked', () => {
        render(
            <CountryDetails
                country={mockCountry}
                open={true}
                onClose={mockOnClose}
                favourites={mockFavourites}
                updateNote={mockUpdateNote}
            />
        );

        const closeButton = screen.getByRole('button', { name: /close/i });
        fireEvent.click(closeButton);

        expect(mockOnClose).toHaveBeenCalled();
    });
});
