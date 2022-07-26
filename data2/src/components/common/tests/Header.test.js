const { configureToMatchImageSnapshot } = require('jest-image-snapshot');

const toMatchImageSnapshot = configureToMatchImageSnapshot({
    failureThreshold: 0.01,
    failureThresholdType: 'percent',
});

expect.extend({ toMatchImageSnapshot });

describe('header.js', () => {
    beforeEach(async () => {
        await page.goto("http://localhost:3000");
    });

    it('should display header', async () => {
        await page.waitForSelector('#root > div > div > div')
        let header = await page.$('#root > div > div > div')
        const screenshot = await header.screenshot()
        expect(screenshot).toMatchImageSnapshot()
    })

});