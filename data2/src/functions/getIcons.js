export function importIcons() {
    const imgs = importImgs(
        require.context('../constants/icons', true, /\.(png|jpe?g|svg)$/)
    );
    var resp = {}
    Object.keys(imgs).forEach(image => {
        resp[image.split("/").at(-1)] = imgs[image]
    });
    return resp;
}

function importImgs(r) {
    let images = {};
    r.keys().map((item) => (images[item.replace("./", "")] = r(item)));
    return images;
}