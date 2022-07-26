const { toMatchImageSnapshot } = require('jest-image-snapshot');
const { globals } = require('../../../jest.config');

expect.extend({ toMatchImageSnapshot });

describe('matchesList.js', () => {
    beforeEach(async () => {
        await page.goto(globals.ip);
    });

    it('should get to public matches', async () => { 
        await page.waitForSelector('#root > div > div > main > div > div.MuiBox-root.css-2bm4dc > button.MuiButton-root.MuiButton-main.MuiButton-mainMain.MuiButton-sizeMedium.MuiButton-mainSizeMedium.MuiButtonBase-root.css-1svd5gi-MuiButtonBase-root-MuiButton-root')
        await expect(page).toClick('button', { text: 'Public Matches' }, { timeout: 6000 })
        expect(page.url()).toMatch(`${globals.ip}/matches/public`);
    });

    it('should get to professional matches', async () => {
        jest.setTimeout(6000)
        await page.waitForSelector('#root > div > div > main > div > div.MuiBox-root.css-2bm4dc > button.MuiButton-root.MuiButton-main.MuiButton-mainMain.MuiButton-sizeMedium.MuiButton-mainSizeMedium.MuiButtonBase-root.css-1svd5gi-MuiButtonBase-root-MuiButton-root')
        await expect(page).toClick('button', { text: 'Public Matches' }, { timeout: 12000 })
        await page.waitForSelector('#root > div > div > main > div > div.MuiBox-root.css-2bm4dc > button.MuiButton-root.MuiButton-main.MuiButton-mainSecondary.MuiButton-sizeMedium.MuiButton-mainSizeMedium.MuiButtonBase-root.css-1y1b1k5-MuiButtonBase-root-MuiButton-root')
        await expect(page).toClick('button', { text: 'Professional' }, { timeout: 12000 })
        expect(page.url()).toMatch(`${globals.ip}/matches/professional`);
    });

    it('should filter by correct rank', async () => {
        await page.waitForSelector('#root > div > div > main > div > div.MuiBox-root.css-2bm4dc > button.MuiButton-root.MuiButton-main.MuiButton-mainMain.MuiButton-sizeMedium.MuiButton-mainSizeMedium.MuiButtonBase-root.css-1svd5gi-MuiButtonBase-root-MuiButton-root')
        await expect(page).toClick('button', { text: 'Public Matches' }, { timeout: 12000 })
        await page.waitForSelector('#root > div > div > main > div > div.MuiBox-root.css-epeuqd > ul > li:nth-child(9) > span > input')
        await expect(page).toClick('#root > div > div > main > div > div.MuiBox-root.css-epeuqd > ul > li:nth-child(9) > span > input', { timeout: 12000 })
        await page.waitForSelector('#root > div > div > main > div > table > tbody > tr:nth-child(1) > td:nth-child(2) > img')
        const rank = await page.$('#root > div > div > main > div > table > tbody > tr:nth-child(1) > td:nth-child(2) > img')
        const screenshot = await rank.screenshot()
        expect(screenshot).toMatchImageSnapshot()
    })

    it('should navigate to correct match_id page', async () => {
        await page.waitForSelector('#root > div > div > main > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > h6')
        let table_cell = await page.$('#root > div > div > main > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > h6')
        let match_id = await page.evaluate(el => el.textContent, table_cell)
        await expect(page).toClick('#root > div > div > main > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > h6', { timeout: 12000 })
        expect(page.url()).toMatch(`${globals.ip}/matches/${match_id}/overview`)

    })
});