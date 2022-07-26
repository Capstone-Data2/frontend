const { configureToMatchImageSnapshot } = require('jest-image-snapshot');

const toMatchImageSnapshot = configureToMatchImageSnapshot({
    failureThreshold: 0.01,
    failureThresholdType: 'percent',
});

expect.extend({ toMatchImageSnapshot });

describe('matchOverview.js', () => {
    beforeEach(async () => {
        await page.goto("http://localhost:3000/matches/6674090917/graphs");
    });

    it('should display correct xp and gold graph', async () => {
        await page.waitForSelector('#root > div > div > main > div > div.MuiBox-root.css-jac81b > div > div > div:nth-child(2) > div > div > svg > g:nth-child(7) > path')
        await new Promise((r) => setTimeout(r, 500));
        let xpgoldgraph = await page.$('#root > div > div > main > div > div.MuiBox-root.css-jac81b > div > div > div:nth-child(2)')
        const screenshot = await xpgoldgraph.screenshot()
        expect(screenshot).toMatchImageSnapshot()
    })

    it('should display correct gold graph', async () => {
        await page.waitForSelector('#root > div > div > main > div > div.MuiBox-root.css-jac81b > div > div > div:nth-child(4) > div > div > svg > g:nth-child(11) > path')
        await new Promise((r) => setTimeout(r, 500));
        let goldgraph = await page.$('#root > div > div > main > div > div.MuiBox-root.css-jac81b > div > div > div:nth-child(4)')
        const screenshot = await goldgraph.screenshot()
        expect(screenshot).toMatchImageSnapshot()
    })

    it('should display correct xp graph', async () => {
        await page.waitForSelector('#root > div > div > main > div > div.MuiBox-root.css-jac81b > div > div > div:nth-child(6) > div > div > svg > g:nth-child(14) > path')
        await new Promise((r) => setTimeout(r, 500));
        let xpgraph = await page.$('#root > div > div > main > div > div.MuiBox-root.css-jac81b > div > div > div:nth-child(6)')
        const screenshot = await xpgraph.screenshot()
        expect(screenshot).toMatchImageSnapshot()
    })

    it('should display correct last hits graph', async () => {
        await page.waitForSelector('#root > div > div > main > div > div.MuiBox-root.css-jac81b > div > div > div:nth-child(8) > div > div > svg > g:nth-child(10) > path')
        await new Promise((r) => setTimeout(r, 500));
        let lasthitsgraph = await page.$('#root > div > div > main > div > div.MuiBox-root.css-jac81b > div > div > div:nth-child(8)')
        const screenshot = await lasthitsgraph.screenshot()
        expect(screenshot).toMatchImageSnapshot()
    })

});