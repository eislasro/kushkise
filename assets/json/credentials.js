function credentials() {
    var credentials = {
        CLP: 'cab1736fa5504f9baae97a1b4aa21642',
        COP: 'a192201dc05f4ab6807b866328d1f205',
        PEN: '30498b00161447f29e7987ef77a2efdd',
        MXN: '9fbf716eff3343ebbd77390132d0bf5e',
        USD: '2f31660c732f4ccc9c6133490cd09809'
    }
    const currency = localStorage.getItem('currency') ?? 'CLP';
    return currency ? credentials[currency] : '';
}

function documentType() {
    var documentType = {
        CLP: 'RUT',
        COP: 'DNI',
        PEN: 'CC',
        MXN: 'CURP',
        USD: 'CI'
    }
    const currency = localStorage.getItem('currency') ?? 'CLP';
    return currency ? documentType[currency] : '';
}