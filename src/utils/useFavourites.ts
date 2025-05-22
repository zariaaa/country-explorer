import { useEffect, useState } from 'react';

export function useFavourites() {
    const [favourites, setFavourites] = useState<{ [key: string]: string }>(() => {
        try {
            const saved = localStorage.getItem('favourites');
            return saved ? JSON.parse(saved) : {};
        } catch {
            return {};
        }
    });

    useEffect(() => {
        localStorage.setItem('favourites', JSON.stringify(favourites));
    }, [favourites]);

    const toggleFavourite = (countryName: string) => {
        setFavourites((prev) => {
            const copy = { ...prev };
            if (countryName in copy) {
                delete copy[countryName];
            } else {
                copy[countryName] = '';
            }
            return copy;
        });
    };

    const updateNote = (countryName: string, note: string) => {
        setFavourites((prev) => ({
            ...prev,
            [countryName]: note,
        }));
    };

    return {
        favourites,
        toggleFavourite,
        updateNote,
    };
}
