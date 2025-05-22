import { test, expect, Page, Locator } from '@playwright/test';

test.describe('Favorites functionality', () => {
    const getCountryCard = async (page: Page, index = 0) => {
        const card = await page.locator('[data-testid^="country-card-"]').nth(index);
        const countryId = await card.getAttribute('data-testid');
        if (!countryId) {
            throw new Error('Country ID not found');
        }
        return { card, countryId: countryId.replace('country-card-', '') };
    };

    const getFavoriteButton = (card: Locator, countryId: string) => {
        return card.locator(`[data-testid="favorite-button-${countryId}"]`);
    };

    const getNoteButton = (card: Locator, countryId: string) => {
        return card.locator(`[data-testid="note-button-${countryId}"]`);
    };

    const getDialog = (page: Page, countryId: string) => {
        return page.locator(`[data-testid="country-dialog-${countryId}"]`);
    };

    const getNoteInput = (page: Page) => {
        return page.locator('[data-testid="note-input"]');
    };

    test('should persist favorites and notes after reload', async ({ page }) => {
        // Large timeout for this specific test
        test.setTimeout(60000);

        await page.goto('http://localhost:5173');
        console.log('Navigated to app');

        // Waiting for countries to load
        await page.waitForSelector('[data-testid="countries-container"]', { timeout: 10000 });
        console.log('Main container loaded');

        const { card: firstCountry, countryId } = await getCountryCard(page);
        console.log('Found first country card:', countryId);

        // Add to favorites functionality
        const favoriteButton = getFavoriteButton(firstCountry, countryId);
        await favoriteButton.waitFor({ state: 'visible', timeout: 10000 });
        console.log('Favorite button is visible');
        await favoriteButton.click();
        console.log('Clicked favorite button');

        await page.waitForSelector(`[data-testid="star-filled-${countryId}"]`, { timeout: 10000 });
        console.log('Star is now filled');

        // Add a note
        const addNoteButton = getNoteButton(firstCountry, countryId);
        await addNoteButton.waitFor({ state: 'visible', timeout: 10000 });
        console.log('Note button is visible');
        await addNoteButton.click();
        console.log('Clicked note button');

        // Dialog visibility after note is added
        const dialog = getDialog(page, countryId);
        await dialog.waitFor({ state: 'visible', timeout: 10000 });
        console.log('Dialog is visible');

        const noteInput = getNoteInput(page);
        await noteInput.waitFor({ state: 'visible', timeout: 10000 });
        console.log('Note input is visible');

        const testNote = 'Test note for E2E testing';
        await noteInput.fill(testNote);
        console.log('Filled note input');

        await page.locator('[data-testid="dialog-close-button"]').click();
        console.log('Clicked close button');

        await page.reload();
        console.log('Page reloaded');

        // Wait for countries to load again
        await page.waitForSelector('[data-testid="countries-container"]', { timeout: 10000 });
        console.log('Main container loaded after reload');

        // Check if  the favorite is still marked
        const { card: reloadedFirstCountry, countryId: reloadedCountryId } = await getCountryCard(
            page
        );
        await expect(
            reloadedFirstCountry.locator(`[data-testid="star-filled-${reloadedCountryId}"]`)
        ).toBeVisible();
        console.log('Star icon is visible after reload');

        // Open the note dialog again
        const reloadedAddNoteButton = getNoteButton(reloadedFirstCountry, reloadedCountryId);
        await reloadedAddNoteButton.waitFor({ state: 'visible', timeout: 10000 });
        console.log('Note button is visible after reload');

        await reloadedAddNoteButton.click();
        console.log('Clicked note button after reload');

        // Verify the note is still there
        const reloadedDialog = getDialog(page, reloadedCountryId);
        await reloadedDialog.waitFor({ state: 'visible', timeout: 10000 });
        console.log('Dialog is visible after reload');

        const reloadedNoteInput = getNoteInput(page);
        await expect(reloadedNoteInput).toHaveValue(testNote);
        console.log('Note value verified after reload');
    });
});
