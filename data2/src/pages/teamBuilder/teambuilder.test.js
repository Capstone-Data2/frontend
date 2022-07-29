const url = "http://localhost:3000/teambuilder"; 

const puppeteer = require('puppeteer')
const { configureToMatchImageSnapshot } = require('jest-image-snapshot')


const toMatchImageSnapshot = configureToMatchImageSnapshot({
    failureThreshold: 0.05,
    failureThresholdType: 'percent',
});
expect.extend({toMatchImageSnapshot})

describe('Team Builder', () => {
  beforeEach(async () => {
    await page.goto(url);
    await page.setViewport({width:1200, height: 800})
  });

  it('should display all hereos', async () => {
    await page.waitForSelector('#all-hero-images');          
    const all_heroes = await page.$('#all-hero-images'); 
    const image = await all_heroes.screenshot()

    expect(image).toMatchImageSnapshot()
  });
  it('should not add the same twice in same team', async () => {
    await expect(page).toClick('#hero-image-1')
    await expect(page).toClick('#dire-button-popup')

    await expect(page).toClick('#hero-image-1')
    await expect(page).toClick('#dire-button-popup')
    
    await page.waitForSelector('#dire-heroes');  
    const dire_selection = await page.$('#dire-heroes'); 
    const image = await dire_selection.screenshot()

    expect(image).toMatchImageSnapshot()
  });
  
  it('should not add the same twice in different team', async () => {
    await expect(page).toClick('#hero-image-1')
    await expect(page).toClick('#dire-button-popup')

    await expect(page).toClick('#hero-image-1')
    await expect(page).toClick('#radiant-button-popup')
    
    await page.waitForSelector('#radiant-heroes');  
    const radiant_selection = await page.$('#radiant-heroes'); 
    const image = await radiant_selection.screenshot()

    expect(image).toMatchImageSnapshot()
  });
  it('should not add more than five heroes in a team', async () => {
    await expect(page).toClick('#hero-image-7')
    await expect(page).toClick('#dire-button-popup')
    await new Promise((r) => setTimeout(r, 500));
    await expect(page).toClick('#hero-image-2')
    await expect(page).toClick('#dire-button-popup')
    await new Promise((r) => setTimeout(r, 500));
    await expect(page).toClick('#hero-image-3')
    await expect(page).toClick('#dire-button-popup')
    await new Promise((r) => setTimeout(r, 500));
    await expect(page).toClick('#hero-image-4')
    await expect(page).toClick('#dire-button-popup')
    await new Promise((r) => setTimeout(r, 500));
    await expect(page).toClick('#hero-image-5')
    await expect(page).toClick('#dire-button-popup')
    await new Promise((r) => setTimeout(r, 500));
    await expect(page).toClick('#hero-image-6')
    await expect(page).toClick('#dire-button-popup')
    await new Promise((r) => setTimeout(r, 500));
    await page.waitForSelector('#dire-heroes');  
    const dire_selection_5 = await page.$('#dire-heroes'); 
    const image = await dire_selection_5.screenshot()

    expect(image).toMatchImageSnapshot()
  });
  it('should display stats when heroes selected', async () => {
    
    await expect(page).toClick('#hero-image-7')
    await expect(page).toClick('#dire-button-popup')

    await expect(page).toClick('#hero-image-6')
    await expect(page).toClick('#dire-button-popup')

    await page.waitForSelector('#dire-stats');  
    const dire_stats = await page.$('#dire-stats'); 
    const image = await dire_stats.screenshot()

    expect(image).toMatchImageSnapshot()
  });
  it('should display hero name in popup', async() =>{
    await expect(page).toClick('#hero-image-7')
    const element = await page.waitForSelector('#alert-dialog-title');
    const value = await element.evaluate(el => el.textContent);
    expect(value).toBe('Earthshaker')
  });
  it('should remove hero from selection', async() =>{
    await expect(page).toClick('#hero-image-7')
    await expect(page).toClick('#dire-button-popup')
    await new Promise((r) => setTimeout(r, 500));
    await expect(page).toClick('#hero_selection_0')

    await page.waitForSelector('#dire-heroes');  
    const dire_selection_empty = await page.$('#dire-heroes'); 
    const image = await dire_selection_empty.screenshot()
    expect(image).toMatchImageSnapshot()
  });


})