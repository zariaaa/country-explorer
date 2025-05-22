# Country Explorer

A React application that allows users to explore countries, view their details, and save favorites with notes.

## Architecture

### Tech Stack

-   **Frontend**: React with TypeScript
-   **State Management**: React Context API
-   **Styling**: Material-UI (MUI)
-   **Testing**: Jest, React Testing Library, Playwright
-   **API**: REST Countries API (https://restcountries.com)

### Key Components

-   `App.tsx`: Main application component with routing and layout
-   `CountryList.tsx`: Displays the list of countries with search and filter functionality
-   `CountryDetails.tsx`: Shows detailed information about a selected country
-   `Favorites.tsx`: Manages favorite countries and their notes
-   `useCountries.ts`: Custom hook for fetching and managing country data

### Data Flow

1. `useCountries` hook fetches data from the REST Countries API
2. Data is stored in React Context for global state management
3. Components consume data through Context and update it through provided methods
4. Favorites and notes are persisted in localStorage

### What Was Implemented

-   ✅ Full country listing with search and filter
-   ✅ Detailed country view with all required information
-   ✅ Favorites system with notes
-   ✅ Responsive design
-   ✅ Comprehensive testing (unit, E2E)
-   ✅ TypeScript for type safety
-   ✅ Error handling and loading states

### What Could Be Improved Given More Time

1. **Performance Optimizations**

    - Implement virtual scrolling for large country lists (Optional)
    - Make the useCountries hook more dynamic and abstract, be able to pass url params and more.
    - Remove unnecessary requests.

2. **Enhanced Features**

    - Add sorting options for countries
    - Add more detailed country information
    - Implement translations

3. **User Experience**

    - Add animations for transitions
    - Implement keyboard navigation
    - Add more interactive features
    - Enhance mobile responsiveness

4. **Testing**
    - Add more edge cases in E2E tests
    - Implement performance testing
    - Add accessibility testing

## Getting Started

### Prerequisites

-   Node.js (v14 or higher)
-   npm

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/country-explorer.git
    cd country-explorer
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

### Running Tests

-   Unit and Integration Tests:

    ```bash
    npm test
    ```

-   End-to-End Tests:
    ```bash
    npm run test:e2e
    ```

## Project Structure

```
country-explorer/
├── src/
│   ├── components/     # React components
│   ├── contexts/       # React Context providers
│   ├── interfaces/     # TypeScript interfaces
│   ├── utils/         # Utility functions and hooks
│   └── App.tsx        # Main application component
├── tests/
│   ├── e2e/          # End-to-end tests
│   └── unit/         # Unit and integration tests
├── public/           # Static assets
└── package.json      # Project dependencies and scripts
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/test-branch`)
3. Commit your changes (`git commit -m 'Add some changes'`)
4. Push to the branch (`git push origin feature/test-branch`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
