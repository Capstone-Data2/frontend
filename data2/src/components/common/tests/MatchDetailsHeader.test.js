const { configureToMatchImageSnapshot } = require('jest-image-snapshot');
const { globals } = require('../../../../jest.config');

const toMatchImageSnapshot = configureToMatchImageSnapshot({
    failureThreshold: 0.01,
    failureThresholdType: 'percent',
});

expect.extend({ toMatchImageSnapshot });

describe('matchDetailsHeader.js', () => {
    beforeEach(async () => {
        await page.goto("http://localhost:3000/matches/6674090917/overview");
    });

    it('should display overview button in orange', async () => {
        await page.waitForSelector('#root > div > div > main > div > div.MuiBox-root.css-19vqeem > div.MuiBox-root.css-1fubwcw > button.MuiButton-root.MuiButton-main.MuiButton-mainMain.MuiButton-sizeMedium.MuiButton-mainSizeMedium.MuiButtonBase-root.css-1svd5gi-MuiButtonBase-root-MuiButton-root')
        let button = await page.$('#root > div > div > main > div > div.MuiBox-root.css-19vqeem > div.MuiBox-root.css-1fubwcw > button.MuiButton-root.MuiButton-main.MuiButton-mainMain.MuiButton-sizeMedium.MuiButton-mainSizeMedium.MuiButtonBase-root.css-1svd5gi-MuiButtonBase-root-MuiButton-root')
        let color = await button.evaluate(node => window.getComputedStyle(node).getPropertyValue("background-color"))
        expect(color).toMatch("rgb(255, 167, 80)")
        let second_button = await page.$('#root > div > div > main > div > div.MuiBox-root.css-19vqeem > div.MuiBox-root.css-1fubwcw > button:nth-child(2)')
        let second_color = await second_button.evaluate(node => window.getComputedStyle(node).getPropertyValue("background-color"))
        expect(second_color).toMatch("rgb(255, 255, 228)")
    })

    it('should display performance button in orange', async () => {
        await page.waitForSelector('#root > div > div > main > div > div.MuiBox-root.css-19vqeem > div.MuiBox-root.css-1fubwcw > button:nth-child(2)')
        await expect(page).toClick('#root > div > div > main > div > div.MuiBox-root.css-19vqeem > div.MuiBox-root.css-1fubwcw > button:nth-child(2)', { timeout: 6000 })
        let button = await page.$('#root > div > div > main > div > div.MuiBox-root.css-19vqeem > div.MuiBox-root.css-1fubwcw > button.MuiButton-root.MuiButton-main.MuiButton-mainMain.MuiButton-sizeMedium.MuiButton-mainSizeMedium.MuiButtonBase-root.css-1svd5gi-MuiButtonBase-root-MuiButton-root')
        let color = await button.evaluate(node => window.getComputedStyle(node).getPropertyValue("background-color"))
        expect(color).toMatch("rgb(255, 167, 80)")
        let second_button = await page.$('#root > div > div > main > div > div.MuiBox-root.css-19vqeem > div.MuiBox-root.css-1fubwcw > button:nth-child(1)')
        let second_color = await second_button.evaluate(node => window.getComputedStyle(node).getPropertyValue("background-color"))
        expect(second_color).toMatch("rgb(255, 255, 228)")
    })

    it('should display correct header information', async () => {
        await page.waitForSelector('#root > div > div > main > div > div.MuiBox-root.css-19vqeem')
        let header = await page.$('#root > div > div > main > div > div.MuiBox-root.css-19vqeem')
        let screenshot = await header.screenshot()
        expect(screenshot).toMatchImageSnapshot()
    })

});