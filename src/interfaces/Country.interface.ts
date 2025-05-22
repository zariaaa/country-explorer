export interface Country {
    name: {
        common: string;
        official: string;
        nativeName: {
            [key: string]: {
                official: string;
                common: string;
            };
        };
    };
    tld?: string[];
    cca2?: string;
    ccn3?: string;
    cioc?: string;
    independent?: boolean;
    status?: string;
    unMember?: boolean;
    currencies?: {
        [key: string]: {
            name: string;
            symbol: string;
        };
    };
    idd?: {
        root?: string;
        suffixes?: string[];
    };
    capital: string[];
    altSpellings?: string[];
    region: string;
    subregion?: string;
    languages?: {
        [key: string]: string;
    };
    latlng?: number[];
    landlocked?: boolean;
    borders?: string[];
    area?: number;
    demonyms?: {
        eng?: { f: string; m: string };
        fra?: { f: string; m: string };
    };
    cca3: string;
    translations?: Record<string, { official: string; common: string } | undefined>;
    flag?: string;
    maps?: {
        googleMaps?: string;
        openStreetMaps?: string;
    };
    population: number;
    gini?: Record<string, number | undefined>;
    fifa?: string;
    car?: {
        signs?: string[];
        side?: string;
    };
    timezones?: string[];
    continents?: string[];
    flags: {
        png: string;
        svg: string;
        alt: string;
    };
    coatOfArms?: {
        png?: string;
        svg?: string;
    };
    startOfWeek?: string;
    capitalInfo?: {
        latlng?: number[];
    };
    postalCode?: {
        format?: string | null;
        regex?: string | null;
    };
}

export interface SearchBarProps {
    setSearchTerm: (term: string) => void;
    setSelectedRegion: (region: string) => void;
    regions: string[];
    selectedRegion: string;
}

export interface CountriesListProps {
    listOfData: Country[];
    loading: boolean;
    onCountryClick?: (country: Country) => void;
}

export interface ErrorBannerProps {
    error: string;
    onRetry: () => void;
}

export interface CountryDetailsProps {
    country: Country;
    onClose: () => void;
    isFavourite: boolean;
    onToggleFavourite: (countryName: string) => void;
    note?: string;
    onUpdateNote?: (countryName: string, note: string) => void;
}
