function loadBrandsIcons() {
    var html = ``;
    brands().forEach(brand => {
        html +=`<a href="category.html?brand=${brand.name}" class="brand">
                <img class="logo-icon" src="assets/images/logos/PNG/${brand.icon}.png" alt="${brand.name}">
            </a>`
    });
    return html;
}