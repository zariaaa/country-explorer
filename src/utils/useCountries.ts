import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Country } from '../interfaces/Country.interface';

const API_URL = 'https://restcountries.com/v3.1/all?fields=name,flags,capital,region,subregion,population,area,languages,currencies,cca3';

export function useCountries() {
    const [countries, setCountries] = useState<Country[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchCountries = async () => {
        try {
            setLoading(true);
            setError(null);
            const { data } = await axios.get<Country[]>(API_URL);
            setCountries(data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch countries'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    return {
        countries,
        error,
        loading,
        refetch: fetchCountries,
    };
}
