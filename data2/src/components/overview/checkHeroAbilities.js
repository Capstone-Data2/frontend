import hero_abilities_json from "../../constants/hero_abilities.json";
import ability_ids_json from "../../constants/ability_ids.json";
import heroes_json from "../../constants/heroes.json";

export function checkHeroAbilities(hero) {
    var hero_ab = hero_abilities_json[heroes_json[hero.hero_id].name];
    var upgrade_arr = [];
    var ultiCount = 0;
    var talentCount = 0;
    var count = 0;
    while (25 > count) {
      if (count < hero.ability_upgrades_arr.length) {
        var element = hero.ability_upgrades_arr[count];
        var length = upgrade_arr.length;
        if (
          ability_ids_json[element] ===
          hero_ab.abilities[hero_ab.abilities.length - 1]
        ) {
          if (length >= 5 && ultiCount === 0) {
            ultiCount++;
            count++;
            upgrade_arr.push(element);
          } else if (length >= 11 && ultiCount === 1) {
            ultiCount++;
            count++;
            upgrade_arr.push(element);
          } else if (length >= 17) {
            ultiCount++;
            count++;
            upgrade_arr.push(element);
          } else {
            upgrade_arr.push(undefined);
          }
        } else if (ability_ids_json[element].split("_")[0] === "special") {
          if(ability_ids_json[element] === "special_bonus_attributes"){
            upgrade_arr.push(element)
            count++
          }
          else if (length >= 9 && talentCount === 0) {
            talentCount++;
            count++;
            upgrade_arr.push(element);
          } else if (length >= 14 && talentCount === 1) {
            talentCount++;
            count++;
            upgrade_arr.push(element);
          } else if (length >= 19) {
            talentCount++;
            count++;
            upgrade_arr.push(element);
          } else {
            upgrade_arr.push(undefined);
          }
        } else {
          count++;
          upgrade_arr.push(element);
        }
      } else {
        count++;
        upgrade_arr.push(undefined);
      }
    }
    return upgrade_arr
  }