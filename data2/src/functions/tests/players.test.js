const { getPlayerDetails, teamHeroIds, findHeroNames } = require('../players');

describe('players.js', () => {

    it('should get correct data from getPlayerDetails', async () => {
        const players = [{ hero: 1, is_radiant: true }, { hero: 2, is_radiant: false }]
        var resp = getPlayerDetails(players)
        expect(resp).toStrictEqual({ "dire": [{ "hero": 2, "is_radiant": false }], "radiant": [{ "hero": 1, "is_radiant": true }] })
    })

    it('should get correct data from teamHeroIds', async () => {
        const picks_bans = [{ hero_id: 1, is_pick: true, team: 0 }, { hero_id: 2, is_pick: false, team: 0 }, { hero_id: 3, is_pick: true, team: 1 }]
        var resp = teamHeroIds(picks_bans)
        expect(resp).toStrictEqual([["1"], ["3"]])
    })

    it('should get correct data from findHeroNames', async () => {
        const players = { radiant: [{ hero_id: 1, is_radiant: true, gold_t: 5, xp_t: 2, lh_t: 3 }], dire: [{ hero_id: 2, is_radiant: false, gold_t: 5, xp_t: 2, lh_t: 3 }] }
        var resp = findHeroNames(players)
        var expected = [{
            "color": "#3375FF",
            "gold_t": 5,
            "lh_t": 3,
            "name": "Anti-Mage",
            "team": "radiant",
            "xp_t": 2,
        },
        {
            "color": "#FE86C2",
            "gold_t": 5,
            "lh_t": 3,
            "name": "Axe",
            "team": "dire",
            "xp_t": 2,
        }]
        expect(resp).toStrictEqual(expected)
    })

});