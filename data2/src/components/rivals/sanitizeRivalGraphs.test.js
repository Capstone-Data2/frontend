const { sanitizeGoldXP, sanitizeLastHits, getHeroNames } = require('./sanitizeRivalGraphs');

const players = [{hero_id: 11, gold_t: [5], xp_t: [4], lh_t: [3]}, {hero_id: 82, gold_t: [6], xp_t: [2], lh_t: [7]}]
const names = ["Shadow Fiend", "Meepo"]

describe('sanitizeRivalGraphs.js', () => {

    it('should get correct data from sanitizeGoldXP', async () => {
        expect(sanitizeGoldXP(players, names)).toStrictEqual([{"Meepo Gold": 6, "Meepo XP": 2, "Shadow Fiend Gold": 5, "Shadow Fiend XP": 4, "name": 0}])

    })

    it('should get correct data from sanitizeLastHits', async () => {
        expect(sanitizeLastHits(players, names)).toStrictEqual([{"Meepo Last Hits": 7, "Shadow Fiend Last Hits": 3, "name": 0}])

    })

    it('should get correct data from sanitizeGoldXP', async () => {
        expect(getHeroNames(players)).toStrictEqual(["Shadow Fiend", "Meepo"])

    })
});