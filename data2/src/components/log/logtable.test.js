const { getTowerName, creepIsRadiant, sortResponseByTime, isSelected, runeName } = require("./tableFunctions");

test('gettowername returns correct tower name', () => {
    var name = getTowerName('npc_dota_goodguys_tower1_bot')
    var name2 = getTowerName('npc_dota_goodguys_fort')
    var name3 = getTowerName('npc_dota_goodguys_range_rax_bot')
    expect(name).toBe('Radiant Tier 1 bot');
    expect(name2).toBe('Radiant Ancient')
    expect(name3).toBe('Radiant range Barracks bot')
});

test('creep is radiant', () => {
    var isRadiant = creepIsRadiant({unit:'npc_dota_creep_goodguys_melee'})
    expect(isRadiant).toBe(true)
});

test('creep is not radiant', ()=>{
    var isNotRadiant = creepIsRadiant({unit:'npc_dota_creep_badguys_melee'})
    expect(isNotRadiant).toBe(false)
});

test('sorting array of events by time', () =>{
    var time_in_seconds = [ 433, 233, 133]
    var res = ['tower 1', 'tower 2', 'tower 3']
    var sorted_response = sortResponseByTime(res, time_in_seconds)
    expect(sorted_response).toStrictEqual(['tower 3', 'tower 2', 'tower 1'])
});

test('hero is selected', () =>{
    var heroIsSelected = isSelected(12, ['87', '43', '56', '12'])
    expect(heroIsSelected).toBe(true)
});
test('hero is not selected', () =>{
    var heroIsNotSelected = isSelected(12, ['87', '43', '56', '82'])
    expect(heroIsNotSelected).toBe(false)
});

test('rune names', ()=>{
    var regen = runeName('4')
    var haste = runeName('1')
    var invis = runeName('3')

    expect(regen).toBe('Regeneration Rune')
    expect(haste).toBe('Haste Rune')
    expect(invis).toBe('Invisibility Rune')
});


