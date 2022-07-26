const { sanitizeGraph } = require('../sanitizeGraph');

const players = { 
    radiant: [
        { 
            "gold_t": 5, 
            "lh_t": 2, 
            "xp_t": 3 
        }
    ],
    dire: [
        { 
            "gold_t": 7, 
            "lh_t": 4, 
            "xp_t": 6 
        }
    ] 
}

const heroes = [
    {
        name: "Shadow Fiend",
        gold_t: [5],
        lh_t: [2],
        xp_t: [3]
    }, 
    {
        name: "Meepo",
        gold_t: [7],
        lh_t: [4],
        xp_t: [6],
    }
]

describe('sanitizeGraph.js', () => {

    it('should get correct data for gold_t', async () => {
        var resp = sanitizeGraph(players, heroes, "gold_t")
        expect(resp).toStrictEqual([{"Meepo": 7, "Shadow Fiend": 5, "name": "0:00"}])
    })

    it('should get correct data for xp_t', async () => {
        var resp = sanitizeGraph(players, heroes, "xp_t")
        expect(resp).toStrictEqual([{"Meepo": 6, "Shadow Fiend": 3, "name": "0:00"}])
    })

    it('should get correct data for lh_t', async () => {
        var resp = sanitizeGraph(players, heroes, "lh_t")
        expect(resp).toStrictEqual([{"Meepo": 4, "Shadow Fiend": 2, "name": "0:00"}])
    })

});