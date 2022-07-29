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
        await page.waitForSelector('#overview')
        let button = await page.$('#overview')
        let color = await button.evaluate(node => window.getComputedStyle(node).getPropertyValue("background-color"))
        expect(color).toMatch("rgb(255, 167, 80)")
        let second_button = await page.$('#performance')
        let second_color = await second_button.evaluate(node => window.getComputedStyle(node).getPropertyValue("background-color"))
        expect(second_color).toMatch("rgb(255, 255, 228)")
    })

    it('should display performance button in orange', async () => {
        await page.waitForSelector('#performance')
        await expect(page).toClick('#performance', { timeout: 6000 })
        await page.hover('#combat', { timeout: 6000 })
        await new Promise((r) => setTimeout(r, 1000));
        let button = await page.$('#performance')
        let color = await button.evaluate(node => window.getComputedStyle(node).getPropertyValue("background-color"))
        expect(color).toMatch("rgb(255, 167, 80)")
        let second_button = await page.$('#overview')
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