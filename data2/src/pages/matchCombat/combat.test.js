const url = "http://localhost:3000/matches/6672429701/combat"; 

const puppeteer = require('puppeteer')
const { configureToMatchImageSnapshot } = require('jest-image-snapshot');


const toMatchImageSnapshot = configureToMatchImageSnapshot({
    failureThreshold: 0.05,
    failureThresholdType: 'percent',
});
expect.extend({toMatchImageSnapshot})

describe('Match Combat', () => {
    beforeAll(async () => {
        await page.goto(url);
    });

    it('should select fight and display map', async () => {
        await expect(page).toClick('#root > div > div > main > div.MuiBox-root.css-1ale11u > div > div > div > div > div > div:nth-child(5)', {timeout: 12000})

        await page.waitForSelector('#root > div > div > main > div.MuiBox-root.css-1ale11u > div > div > div > div.MuiBox-root.css-1u3uooj > div.MuiBox-root.css-9x99iy > div.MuiBox-root.css-t4hrbr > div > div > img');          
        const fight_map = await page.$('#root > div > div > main > div.MuiBox-root.css-1ale11u > div > div > div > div.MuiBox-root.css-1u3uooj > div.MuiBox-root.css-9x99iy > div.MuiBox-root.css-t4hrbr > div > div > img'); 
        const map_image = await fight_map.screenshot()
        
        expect(map_image).toMatchImageSnapshot()
    });

    it('should select fight and display graph', async () => {
        await expect(page).toClick('#root > div > div > main > div.MuiBox-root.css-1ale11u > div > div > div > div > div > div:nth-child(5)', {timeout: 12000})

        await page.waitForSelector('#root > div > div > main > div.MuiBox-root.css-1ale11u > div > div > div > div.MuiBox-root.css-1u3uooj > div.MuiBox-root.css-9x99iy > div.MuiBox-root.css-8r15po > div > div > svg');  
        await new Promise((r) => setTimeout(r, 500))        
        const fight_graph= await page.$('#root > div > div > main > div.MuiBox-root.css-1ale11u > div > div > div > div.MuiBox-root.css-1u3uooj > div.MuiBox-root.css-9x99iy > div.MuiBox-root.css-8r15po > div > div > svg'); 
        const graph_image = await fight_graph.screenshot()
        expect(graph_image).toMatchImageSnapshot()
    });
    it('should select fight and team radiant table', async () => {
        await expect(page).toClick('#root > div > div > main > div.MuiBox-root.css-1ale11u > div > div > div > div > div > div:nth-child(5)', {timeout: 12000})

        await page.waitForSelector('#root > div > div > main > div.MuiBox-root.css-1ale11u > div > div > div > div.MuiBox-root.css-1u3uooj > div.MuiBox-root.css-k008qs > div.MuiBox-root.css-rumjh > table');        
        const radiant_table = await page.$('#root > div > div > main > div.MuiBox-root.css-1ale11u > div > div > div > div.MuiBox-root.css-1u3uooj > div.MuiBox-root.css-k008qs > div.MuiBox-root.css-rumjh > table'); 
        const table_image = await radiant_table.screenshot()
        expect(table_image).toMatchImageSnapshot()
    });
    it('should select fight and team dire table', async () => {
        await expect(page).toClick('#root > div > div > main > div.MuiBox-root.css-1ale11u > div > div > div > div > div > div:nth-child(5)', {timeout: 12000})

        await page.waitForSelector('#root > div > div > main > div.MuiBox-root.css-1ale11u > div > div > div > div.MuiBox-root.css-1u3uooj > div.MuiBox-root.css-k008qs > div.MuiBox-root.css-8rl55y > table');        
        const dire_table = await page.$('#root > div > div > main > div.MuiBox-root.css-1ale11u > div > div > div > div.MuiBox-root.css-1u3uooj > div.MuiBox-root.css-k008qs > div.MuiBox-root.css-8rl55y > table'); 
        const table_image = await dire_table.screenshot()
        expect(table_image).toMatchImageSnapshot()
    });
    it('should press combat overview and load correct hero', async () => {
        await expect(page).toClick('#root > div > div > main > div.MuiBox-root.css-1ale11u > button', {timeout: 12000})

        await page.waitForSelector('#root > div > div > main > div.MuiBox-root.css-1ale11u > div > div > div > div.MuiBox-root.css-16kb86n > table > thead > tr > th:nth-child(2) > img');        
        const hero_icon = await page.$('#root > div > div > main > div.MuiBox-root.css-1ale11u > div > div > div > div.MuiBox-root.css-16kb86n > table > thead > tr > th:nth-child(2) > img'); 
        const hero_image = await hero_icon.screenshot()
        expect(hero_image).toMatchImageSnapshot()
    });
    
    it('should press combat overview and load correct abilities radiant', async () => {
        await page.waitForSelector('#root > div > div > main > div.MuiBox-root.css-1ale11u > div > div > div > div:nth-child(3) > table > tbody > tr:nth-child(1) > td:nth-child(2) > div > div > div:nth-child(1)');            
        const abilities_radiant = await page.$('#root > div > div > main > div.MuiBox-root.css-1ale11u > div > div > div > div:nth-child(3) > table > tbody > tr:nth-child(1) > td:nth-child(2) > div > div > div:nth-child(1)'); 
        const ability_image_radiant = await abilities_radiant.screenshot()
        expect(ability_image_radiant).toMatchImageSnapshot()
    });
    it('should press combat overview and load correct abilities dire', async () => {
        await page.waitForSelector('#root > div > div > main > div.MuiBox-root.css-1ale11u > div > div > div > div:nth-child(5) > table > tbody > tr:nth-child(1) > td:nth-child(3) > div');            
        const abilities_dire = await page.$('#root > div > div > main > div.MuiBox-root.css-1ale11u > div > div > div > div:nth-child(5) > table > tbody > tr:nth-child(1) > td:nth-child(3) > div'); 
        const ability_image_dire = await abilities_dire.screenshot()
        expect(ability_image_dire).toMatchImageSnapshot()
    });

})

