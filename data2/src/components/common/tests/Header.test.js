const { configureToMatchImageSnapshot } = require('jest-image-snapshot');
const { globals } = require('../../../../jest.config');

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
        await page.waitForSelector('#navbar')
        let header = await page.$('#navbar')
        const screenshot = await header.screenshot()
        expect(screenshot).toMatchImageSnapshot()
    })
    it('should get to meta page', async () => { 
        await page.waitForSelector('#meta')
        await expect(page).toClick('#meta')
        expect(page.url()).toMatch(`${globals.ip}/meta`);
    });
    it('should get to teambuilder page', async () => { 
        await page.waitForSelector('#teambuilder')
        await expect(page).toClick('#teambuilder')
        expect(page.url()).toMatch(`${globals.ip}/teambuilder`);
    });
    it('should get back to matches page', async () => { 
        await page.waitForSelector('#meta')
        await expect(page).toClick('#meta')
        await expect(page).toClick('#matches')
        expect(page.url()).toMatch(`${globals.ip}/matches/professional`);
    });

});