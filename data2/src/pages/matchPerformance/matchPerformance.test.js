const { configureToMatchImageSnapshot } = require('jest-image-snapshot');

const toMatchImageSnapshot = configureToMatchImageSnapshot({
    failureThreshold: 0.01,
    failureThresholdType: 'percent',
});

expect.extend({ toMatchImageSnapshot });

describe('matchPerformance.js', () => {
    beforeEach(async () => {
        await page.goto("http://localhost:3000/matches/6674090917/performance");
    });

    it('should display correct radiant header', async () => {
        await page.waitForSelector('#root > div > div > main > div > div.MuiBox-root.css-hmsb88 > div:nth-child(1) > div')
        let rad_header = await page.$('#root > div > div > main > div > div.MuiBox-root.css-hmsb88 > div:nth-child(1) > div')
        const screenshot = await rad_header.screenshot()
        expect(screenshot).toMatchImageSnapshot()
    })

    it('should display correct radiant table', async () => {
        await page.waitForSelector('#root > div > div > main > div > div.MuiBox-root.css-hmsb88 > div:nth-child(1) > table')
        let rad_table = await page.$('#root > div > div > main > div > div.MuiBox-root.css-hmsb88 > div:nth-child(1) > table')
        const screenshot = await rad_table.screenshot()
        expect(screenshot).toMatchImageSnapshot()
    })

    it('should display correct dire table', async () => {
        await page.waitForSelector('#root > div > div > main > div > div.MuiBox-root.css-hmsb88 > div:nth-child(2) > table')
        let dire_table = await page.$('#root > div > div > main > div > div.MuiBox-root.css-hmsb88 > div:nth-child(2) > table')
        const screenshot = await dire_table.screenshot()
        expect(screenshot).toMatchImageSnapshot()
    })

    it('should display correct dire header', async () => {
        await page.waitForSelector('#root > div > div > main > div > div.MuiBox-root.css-hmsb88 > div:nth-child(2) > div')
        let dire_header = await page.$('#root > div > div > main > div > div.MuiBox-root.css-hmsb88 > div:nth-child(2) > div')
        const screenshot = await dire_header.screenshot()
        expect(screenshot).toMatchImageSnapshot()
    })

});