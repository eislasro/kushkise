

// Main Js File
$(document).ready(function () {
    'use strict';    
    loadRandomProducts('all', 'new-all-tab-products');
    loadRandomProducts('Camaras Digitales', 'new-camera-tab-products');
    loadRandomProducts('Tablets', 'new-tablets-tab-products');
    loadRandomProducts('Audio', 'new-audio-tab-products');
    loadRandomProducts('Televisores', 'new-tv-tab-products');
    loadRandomProducts('Computador & Portatil', 'new-computers-tab-products');
    loadRandomProducts('Celulares', 'new-phones-tab-products');
    loadRandomProducts('Smart Watches', 'new-watches-tab-products');
    loadRandomProducts('Accesorios', 'new-acc-tab-products');
    loadRandomProducts('all', 'trending-top-tab-products');
    loadRandomProducts('all', 'trending-best-tab-products');
    loadRandomProducts('all', 'trending-sale-tab-products');
    
    $('#brands-carousel').html(loadBrandsIcons())
    
    owlCarousels();

});
