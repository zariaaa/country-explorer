import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CountriesList from '../CountriesList';
import { useFavourites } from '../../utils/useFavourites';
import type { Country } from '../../interfaces/Country.interface';

vi.mock('../../utils/useFavourites', () => ({
    useFavourites: vi.fn(),
}));

describe('CountriesList', () => {
    const mockCountries: Country[] = [
        {
            name: {
                common: 'Test Country 1',
                official: 'Test Country 1',
                nativeName: {
                    eng: {
                        official: 'Test Country 1',
                        common: 'Test Country 1',
                    },
                },
            },
            region: 'Test Region',
            flags: {
                png: 'test1.png',
                svg: 'test1.svg',
                alt: 'Test Flag 1',
            },
            capital: ['Test Capital'],
            cca3: 'TST',
            population: 1000000,
        },
    ];

    beforeEach(() => {
        (useFavourites as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            favourites: {},
            toggleFavourite: vi.fn(),
            updateNote: vi.fn(),
        });
    });

    it('should render loading state', () => {
        render(<CountriesList listOfData={[]} loading={true} />);
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('should render empty state', () => {
        render(<CountriesList listOfData={[]} loading={false} />);
        expect(screen.getByText('No countries found')).toBeInTheDocument();
    });

    it('should render country card with correct data', () => {
        render(<CountriesList listOfData={mockCountries} loading={false} />);

        expect(screen.getByText('Test Country 1')).toBeInTheDocument();
        expect(screen.getByText('Test Region')).toBeInTheDocument();
        expect(screen.getByAltText('Test Flag 1')).toBeInTheDocument();
    });

    it('should handle favorite toggle', () => {
        const mockToggleFavourite = vi.fn();
        (useFavourites as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            favourites: {},
            toggleFavourite: mockToggleFavourite,
            updateNote: vi.fn(),
        });

        render(<CountriesList listOfData={mockCountries} loading={false} />);

        const favoriteButton = screen.getByRole('button', { name: /add to favorites/i });
        fireEvent.click(favoriteButton);

        expect(mockToggleFavourite).toHaveBeenCalledWith('Test Country 1');
    });
});
