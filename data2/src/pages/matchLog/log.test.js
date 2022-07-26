const url = "http://localhost:3000/matches/6672429701/log"; 

const puppeteer = require('puppeteer')
const { configureToMatchImageSnapshot } = require('jest-image-snapshot')


const toMatchImageSnapshot = configureToMatchImageSnapshot({
    failureThreshold: 0.01,
    failureThresholdType: 'percent',
});
expect.extend({toMatchImageSnapshot})

describe('Match Log', () => {
  beforeAll(async () => {
    await page.goto(url);
  });

  it('should display correct heros in filter', async () => {
    
    await page.waitForSelector('#root > div > div > main > div > div.MuiBox-root.css-1ale11u > div.MuiBox-root.css-9fd512 > div');          
    const filter = await page.$('#root > div > div > main > div > div.MuiBox-root.css-1ale11u > div.MuiBox-root.css-9fd512 > div'); 
    const image = await filter.screenshot()

    expect(image).toMatchImageSnapshot()
  });
  
  it('correctly load hero log', async () => {
    await expect(page).toClick('#root > div > div > main > div > div.MuiBox-root.css-1ale11u > div.MuiBox-root.css-9fd512 > div > div.MuiBox-root.css-60jmly > div.MuiBox-root.css-170j1pp > div:nth-child(1) > img')
    
    await page.waitForSelector('#root > div > div > main > div > div.MuiBox-root.css-1ale11u > div.MuiBox-root.css-vki1n0');
    const log_list = await page.$('#root > div > div > main > div > div.MuiBox-root.css-1ale11u > div.MuiBox-root.css-vki1n0'); 
    const image = await log_list.screenshot()
    expect(image).toMatchImageSnapshot()
  });

  it('correctly clears from filter', async () => {
    await expect(page).toClick('#root > div > div > main > div > div.MuiBox-root.css-1ale11u > div.MuiBox-root.css-9fd512 > div > div.MuiBox-root.css-60jmly > div.MuiBox-root.css-170j1pp > div:nth-child(1) > img')
    await expect(page).toClick('#root > div > div > main > div > div.MuiBox-root.css-1ale11u > div.MuiBox-root.css-9fd512 > div > div.MuiBox-root.css-60jmly > div.MuiBox-root.css-1uix7wp > div:nth-child(1) > img')
    
    await expect(page).toClick('#root > div > div > main > div > div.MuiBox-root.css-1ale11u > div.MuiBox-root.css-9fd512 > div > div.MuiBox-root.css-ip6ejr > button')
    
    await page.waitForSelector('#root > div > div > main > div > div.MuiBox-root.css-1ale11u > div.MuiBox-root.css-vki1n0');          // Method to ensure that the element is loaded
    const log_list_after_clear = await page.$('#root > div > div > main > div > div.MuiBox-root.css-1ale11u > div.MuiBox-root.css-vki1n0'); 
    const image = await log_list_after_clear.screenshot()
    expect(image).toMatchImageSnapshot()

  });
});