function credentials() {
    var credentials = {
        CLP: 'cab1736fa5504f9baae97a1b4aa21642',
        COP: 'a192201dc05f4ab6807b866328d1f205',
        PEN: '1000000633845053099215659713079',
        MXN: 'd3cb9892638347cab519d963da45f8ce',
        USD: '2f31660c732f4ccc9c6133490cd09809'
    }
    const currency = localStorage.getItem('currency') ?? 'CLP';
    return currency ? credentials[currency] : '';
}

function documentType() {
    var documentType = {
        CLP: 'RUT',
        COP: 'CC',
        PEN: 'DNI',
        MXN: 'CURP',
        USD: 'CI'
    }
    const currency = localStorage.getItem('currency') ?? 'CLP';
    return currency ? documentType[currency] : '';
}
