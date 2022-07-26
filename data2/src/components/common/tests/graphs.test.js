const { configureToMatchImageSnapshot } = require('jest-image-snapshot');

const toMatchImageSnapshot = configureToMatchImageSnapshot({
    failureThreshold: 0.01,
    failureThresholdType: 'percent',
});

expect.extend({ toMatchImageSnapshot });

describe('graph tooltips', () => {
    beforeEach(async () => {
        await page.goto("http://localhost:3000/matches/6674091014/graphs");
    });

    it('should display correct tooltip', async () => {
        await page.waitForSelector('#root > div > div > main > div > div.MuiBox-root.css-jac81b > div > div > div:nth-child(2) > div > div > svg > g:nth-child(6) > path')
        await page.hover('#root > div > div > main > div > div.MuiBox-root.css-jac81b > div > div > div:nth-child(2) > div > div > svg > g:nth-child(6) > path')
        let tooltip = await page.$('#root > div > div > main > div > div.MuiBox-root.css-jac81b > div > div > div:nth-child(2) > div > div > div.recharts-tooltip-wrapper')
        let text = await tooltip.evaluate(node => node.innerText.split("·"))
        let expected = `18:00·
        Radiant:··
        4422 Gold·
        Radiant:··
        4722 Experience`
        expected = expected.split("·")
        expect(text[0]).toMatch(expected[0])
    })

});