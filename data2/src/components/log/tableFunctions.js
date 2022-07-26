export function getTowerName(rawName) {
    var array_name = rawName.split('_')
    var team = ''
    var tower = ''
    var tier = ''
    if (array_name.length === 5) {
        if (array_name[2] === 'goodguys') {
            team = 'Radiant '
        }
        else {
            team = 'Dire '
        }
        tier = 'Tier ' + array_name[3][5]
        tower = array_name[4]
        return (team + tier + ' ' + tower)
    }
    else if (array_name.length === 6) {
        if (array_name[2] === 'goodguys') {
            team = 'Radiant '
        }
        else {
            team = 'Dire '
        }

        tier = array_name[3] + ' Barracks'
        tower = array_name[5]
        return (team + tier + ' ' + tower)
    }
    else if (array_name.length === 4) {
        if (array_name[2] === 'goodguys') {
            team = 'Radiant '
        }
        else {
            team = 'Dire '
        }

        if (array_name[3][5] === '4') {
            tier = 'Tier ' + array_name[3][5]
        }
        else {
            tier = 'Ancient'
        }
        return (team + tier)
    }
}

export function creepIsRadiant(buildingInfo) {
    var team = buildingInfo.unit.split('_')
    if (team[3] === 'badguys') {
        return false
    }
    else {
        return true
    }
}

export function sortResponseByTime(res, time_in_seconds) {
    for (var i = 0; i < time_in_seconds.length; i++) {
        for (var j = 0; j < (time_in_seconds.length - i - 1); j++) {
            if (time_in_seconds[j] > time_in_seconds[j + 1]) {

                var temp = time_in_seconds[j]
                time_in_seconds[j] = time_in_seconds[j + 1]
                time_in_seconds[j + 1] = temp

                var resTemp = res[j]
                res[j] = res[j + 1]
                res[j + 1] = resTemp
            }
        }
    }
    return res
}

export function isSelected(hero_id, array_players) {
    
    for (var o = 0; o <= array_players.length - 1; o++) {
        
        if (array_players[o] === String(hero_id)) {
            
            return true
        }
    }
    return false
}

export function runeName(key){
    if(key==='0'){
        return('Double Damage Rune')
    }
    else if(key==='1'){
        return('Haste Rune')
    }
    else if(key==='2'){
        return('Illusion Rune')
    }
    else if(key==='3'){
        return('Invisibility Rune')
    }
    else if(key==='4'){
        return('Regeneration Rune')
    }
    else if(key==='5'){
        return('Gold Rune')
    }
    else if(key==='6'){
        return('Arcane Rune')
    }
    else if(key==='7'){
        return('Water Rune')
    }
}
