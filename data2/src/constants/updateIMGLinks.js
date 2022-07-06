export function updateImages(heroes){
    console.log(heroes)
    var hero_list = Object.entries(heroes)
    hero_list.forEach(hero => {
        var name = hero[1].localized_name
        if(name.includes(" ")){
            name = name.replace(" ", "_")
        }
        hero[1]["img"] = `${name}_icon.png`
        hero[1]["icon"] = `${name}_minimap_icon.png`
    });
    console.log(Object.fromEntries(hero_list))
}