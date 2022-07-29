const { configureToMatchImageSnapshot } = require('jest-image-snapshot');
const { globals } = require('../../../jest.config');

const toMatchImageSnapshot = configureToMatchImageSnapshot({
    failureThreshold: 0.01,
    failureThresholdType: 'percent',
});

expect.extend({ toMatchImageSnapshot });

describe('meta.js', () => {
    beforeEach(async () => {
        await page.goto("http://localhost:3000/meta/professional");
    });

    it('should get to meta page', async () => { 
        await page.setViewport({ width: 1200, height: 800 })
        await page.waitForSelector('#propb')
        await expect(page).toClick('#propb')
        await expect(page).toClick('#hero_id')
        let hero_name = await page.$('#hero-name')
        let text = await hero_name.evaluate(node => node.innerText)
        expect(text).toBe("Anti-Mage")
    });
    it('should get to public meta page', async () => { 
        await page.setViewport({ width: 1200, height: 800 })
        await page.waitForSelector('#public')
        await expect(page).toClick('#public')
        let overallp = await page.$('#overallp')
        let text = await overallp.evaluate(node => node.innerText)
        expect(text).toBe("OVERALL P%")
    });

});