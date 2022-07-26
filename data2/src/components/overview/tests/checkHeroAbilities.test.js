const { checkHeroAbilities } = require('../checkHeroAbilities');

describe('checkHeroAbilities.js', () => {

    it('should get correct data from checkHeroAbilities', async () => {
        const hero = {
            hero_id: 73,
            ability_upgrades_arr: [
                5366,
                5368,
                5365,
                5368,
                5365,
                5369,
                5365,
                5365,
                5368,
                5368,
                6119,
                5369,
                5366,
                5366,
                5960,
                5366,
                5369,
                6801
            ]
        }
        const expected = [
            5366, 5368, 5365,
            5368, 5365, 5369,
            5365, 5365, 5368,
            5368, 6119, 5369,
            5366, 5366, 5960,
            5366, 5369, undefined,
            undefined, 6801, undefined,
            undefined, undefined, undefined,
            undefined, undefined, undefined
        ]
        expect(checkHeroAbilities(hero)).toStrictEqual(expected)

    })
});