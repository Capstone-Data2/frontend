const { configureToMatchImageSnapshot } = require('jest-image-snapshot');

const toMatchImageSnapshot = configureToMatchImageSnapshot({
    failureThreshold: 0.01,
    failureThresholdType: 'percent',
});

expect.extend({ toMatchImageSnapshot });

describe('matchPerformance.js', () => {
    beforeEach(async () => {
        await page.goto("http://localhost:3000/matches/6674090917/rivals");
    });

    it('should display correct default page', async () => {
        await page.waitForSelector('#root > div > div > main > div > div.MuiBox-root.css-jac81b')
        let default_page = await page.$('#root > div > div > main > div > div.MuiBox-root.css-jac81b')
        const screenshot = await default_page.screenshot()
        expect(screenshot).toMatchImageSnapshot()
    })

    it('should display correct player rivals when clicked', async () => {
        await page.waitForSelector('#root > div > div > main > div > div.MuiBox-root.css-jac81b > div > div > div.MuiBox-root.css-60jmly > div.MuiBox-root.css-170j1pp > div:nth-child(5) > img')
        await expect(page).toClick('#root > div > div > main > div > div.MuiBox-root.css-jac81b > div > div > div.MuiBox-root.css-60jmly > div.MuiBox-root.css-170j1pp > div:nth-child(5) > img', { timeout: 6000 })
        await page.waitForSelector('#root > div > div > main > div > div.MuiBox-root.css-jac81b > div > div.MuiBox-root.css-k008qs')
        let rivals_data = await page.$('#root > div > div > main > div > div.MuiBox-root.css-jac81b > div > div.MuiBox-root.css-k008qs')
        const screenshot = await rivals_data.screenshot()
        expect(screenshot).toMatchImageSnapshot()
    })

    it('should display click a player but clear data', async () => {
        await page.waitForSelector('#root > div > div > main > div > div.MuiBox-root.css-jac81b > div > div > div.MuiBox-root.css-60jmly > div.MuiBox-root.css-170j1pp > div:nth-child(5) > img')
        await expect(page).toClick('#root > div > div > main > div > div.MuiBox-root.css-jac81b > div > div > div.MuiBox-root.css-60jmly > div.MuiBox-root.css-170j1pp > div:nth-child(5) > img', { timeout: 6000 })
        await page.waitForSelector('#root > div > div > main > div > div.MuiBox-root.css-jac81b > div > div.MuiBox-root.css-k008qs')
        await expect(page).toClick('#root > div > div > main > div > div.MuiBox-root.css-jac81b > div > div > div.MuiBox-root.css-ip6ejr > button', { timeout: 12000 })
        await page.waitForSelector('#root > div > div > main > div > div.MuiBox-root.css-jac81b')
        let rivals_page = await page.$('#root > div > div > main > div > div.MuiBox-root.css-jac81b')
        const screenshot = await rivals_page.screenshot()
        expect(screenshot).toMatchImageSnapshot()
    })

});