const { configureToMatchImageSnapshot } = require('jest-image-snapshot');

const toMatchImageSnapshot = configureToMatchImageSnapshot({
    failureThreshold: 0.01,
    failureThresholdType: 'percent',
});

expect.extend({ toMatchImageSnapshot });

describe('matchOverview.js', () => {
    beforeEach(async () => {
        await page.goto("http://localhost:3000/matches/6674090917/overview");
    });

    it('should display correct table', async () => {
        await page.waitForSelector('#root > div > div > main > div > div.MuiBox-root.css-hmsb88 > div.MuiBox-root.css-w9zsqe > table')
        let match_table = await page.$('#root > div > div > main > div > div.MuiBox-root.css-hmsb88 > div.MuiBox-root.css-w9zsqe > table')
        const screenshot = await match_table.screenshot()
        expect(screenshot).toMatchImageSnapshot()
    })

    it('should display correct picks and bans', async () => {
        jest.setTimeout(6000)
        await page.waitForSelector('#root > div > div > main > div > div.MuiBox-root.css-hmsb88 > div.MuiBox-root.css-1qawiej > div')
        let picks_bans = await page.$('#root > div > div > main > div > div.MuiBox-root.css-hmsb88 > div.MuiBox-root.css-1qawiej > div')
        const screenshot = await picks_bans.screenshot()
        expect(screenshot).toMatchImageSnapshot()
    })

    it('should display correct ability table', async () => {
        await page.waitForSelector('#root > div > div > main > div > div.MuiBox-root.css-hmsb88 > div:nth-child(5) > table')
        let ability_table = await page.$('#root > div > div > main > div > div.MuiBox-root.css-hmsb88 > div:nth-child(5) > table')
        const screenshot = await ability_table.screenshot()
        expect(screenshot).toMatchImageSnapshot()
    })

    it('should display correct map', async () => {
        await page.waitForSelector('#root > div > div > main > div > div.MuiBox-root.css-hmsb88 > div:nth-child(7) > div.MuiBox-root.css-1ul83bd')
        let map = await page.$('#root > div > div > main > div > div.MuiBox-root.css-hmsb88 > div:nth-child(7) > div.MuiBox-root.css-1ul83bd')
        const screenshot = await map.screenshot()
        expect(screenshot).toMatchImageSnapshot()
    })
});