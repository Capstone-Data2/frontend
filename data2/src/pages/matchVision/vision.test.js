const url = "http://localhost:3000/matches/6672429701/vision"; 

const puppeteer = require('puppeteer')
const { configureToMatchImageSnapshot } = require('jest-image-snapshot');


const toMatchImageSnapshot = configureToMatchImageSnapshot({
    failureThreshold: 0.05,
    failureThresholdType: 'percent',
});
expect.extend({toMatchImageSnapshot})

describe('Match Vision', () => {
  beforeAll(async () => {
    await page.goto(url);
  });

    it('should load radiant table', async () => {

    await page.waitForSelector('#root > div > div > main > div.MuiBox-root.css-1sl3ujb > div.MuiBox-root.css-96n1b2 > div:nth-child(2) > table');          
    const radiant_table = await page.$('#root > div > div > main > div.MuiBox-root.css-1sl3ujb > div.MuiBox-root.css-96n1b2 > div:nth-child(2) > table'); 
    const image_radiant = await radiant_table.screenshot()

    expect(image_radiant).toMatchImageSnapshot()
    });

    it('should load dire table', async () => {
    
    await page.waitForSelector('#root > div > div > main > div.MuiBox-root.css-1sl3ujb > div.MuiBox-root.css-96n1b2 > div:nth-child(3) > table');          
    const dire_table = await page.$('#root > div > div > main > div.MuiBox-root.css-1sl3ujb > div.MuiBox-root.css-96n1b2 > div:nth-child(3) > table'); 
    const image_dire = await dire_table.screenshot()

    expect(image_dire).toMatchImageSnapshot()
    });
  
    it('should populate ward map', async () => {
        await page.waitForSelector('#root > div > div > main > div.MuiBox-root.css-1sl3ujb > div.MuiBox-root.css-10g2170 > div');          
        const ward_map = await page.$('#root > div > div > main > div.MuiBox-root.css-1sl3ujb > div.MuiBox-root.css-10g2170 > div'); 
        const map_image = await ward_map.screenshot()

        expect(map_image).toMatchImageSnapshot()
    });
});