import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import axios from 'axios';
import { useCountries } from '../useCountries';
import type { Country } from '../../interfaces/Country.interface';

vi.mock('axios');

describe('useCountries', () => {
    const mockCountries: Country[] = [
        {
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
                png: 'test-flag.png',
                svg: 'test-flag.svg',
                alt: 'Test Flag',
            },
            capital: ['Test Capital'],
            cca3: 'TST',
            population: 1000000,
        },
    ];

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should fetch countries successfully', async () => {
        (axios.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ data: mockCountries });

        const { result } = renderHook(() => useCountries());

        expect(result.current.loading).toBe(true);

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.countries).toEqual(mockCountries);
        expect(result.current.error).toBeNull();
    });

    it('should handle fetch error', async () => {
        const errorMessage = 'Failed to fetch countries';
        (axios.get as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error(errorMessage));

        const { result } = renderHook(() => useCountries());

        expect(result.current.loading).toBe(true);

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.countries).toEqual([]);
        expect(result.current.error?.message).toBe(errorMessage);
    });

    it('should refetch countries successfully', async () => {
        (axios.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ data: mockCountries });

        const { result } = renderHook(() => useCountries());

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });

        (axios.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
            data: [...mockCountries, ...mockCountries],
        });

        await act(async () => {
            result.current.refetch();
            await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(result.current.countries).toEqual([...mockCountries, ...mockCountries]);
        expect(result.current.error).toBeNull();
    });
});
