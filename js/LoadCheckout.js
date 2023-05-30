var totalG = 0;
function loadCheckout(){

    var cartProducts = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
    const currency = localStorage.getItem('currency') ?? 'CLP';
    var prodsHtml = '';
    var total = 0;
     cartProducts.forEach(product => {
        let prodFilter = products().filter((ele)=> ele.reference == product.reference)[0]
        let subtotal = product.quantity * prodFilter[currency] * 0.81;
        total += product.quantity * prodFilter[currency]

        prodsHtml += `<tr>
                    <td><a href="product.html?reference=${product.reference}">${prodFilter.name}</a></td>
                    <td>${currency} ${formatNumber(subtotal.toFixed(2))}</td>
                    </tr>`
    totalG = 0 + total;
    })

    var html = `${prodsHtml}
            <tr class="summary-subtotal">
                <td>Subtotal:</td>
                <td>${currency} ${formatNumber((total * 0.81).toFixed(2))}</td>
            </tr><!-- End .summary-subtotal -->
            <tr>
                <td>IVA:</td>
                <td>${currency} ${formatNumber((total * 0.19).toFixed(2))}</td>
            </tr>
            <tr>
                <td>Shipping:</td>
                <td>Free shipping</td>
            </tr>
            <tr class="summary-total">
                <td>Total:</td>
                <td>${currency} ${formatNumber((total).toFixed(2))}</td>
            </tr><!-- End .summary-total -->`

    $('#products-list').html(html);
}


function validarTarjeta(cardNumber) {
    // Verifica que la longitud del número de tarjeta sea correcta
    if (cardNumber.length > 16 || cardNumber.length < 14 || !/^\d+$/.test(cardNumber)) {
        $('#validateCardNumTxt').show()
        $("#credit-card-number").removeClass("is-valid");
        $("#credit-card-number").addClass("is-invalid");
      return false;
    }
  
    $("#credit-card-number").removeClass("is-invalid");
    $("#credit-card-number").addClass("is-valid");
    $('#validateCardNumTxt').hide()
    return true;
  }
  
  function validarCvv(cardNumber) {
    // Verifica que la longitud del número de tarjeta sea correcta
    if (cardNumber.length == 3 || cardNumber.length == 4 ) {
        $("#card-cvv").removeClass("is-invalid");
        $("#card-cvv").addClass("is-valid");
        $('#validateCvvTxt').hide()
    } else {
        $('#validateCvvTxt').show()
        $("#card-cvv").removeClass("is-valid");
        $("#card-cvv").addClass("is-invalid");
    }
  
  }

  function validateDate() {
    var inputDate = $('#card-date').val()
    var currentDate = new Date();
    var currentMonth = currentDate.getMonth() + 1; // Agregamos 1 porque los meses comienzan desde 0
    var currentYear = currentDate.getFullYear() % 100; // Obtenemos solo los últimos 2 dígitos del año
  
    // Validamos que el formato de fecha sea correcto (MM/AA)
    if (!/^\d{2}\/\d{2}$/.test(inputDate)) {
        $('#validateDateTxt').show()
        $("#card-date").removeClass("is-valid");
        $("#card-date").addClass("is-invalid");
      return false;
    }
  
    // Separamos el mes y el año ingresados por el usuario
    var parts = inputDate.split("/");
    var month = parseInt(parts[0]);
    var year = parseInt(parts[1]);
  
    // Validamos que la fecha ingresada sea mayor que la actual
    if (year < currentYear || (year == currentYear && month <= currentMonth)) {
        $('#validateDateTxt').show()
        $("#card-date").removeClass("is-valid");
        $("#card-date").addClass("is-invalid");
      return false;
    }
  
    $("#card-date").removeClass("is-invalid");
    $("#card-date").addClass("is-valid");
    $('#validateDateTxt').hide()
    return true;
  }

  function mostrarIconoTarjeta(bin_tarjeta) {
    if (bin_tarjeta.startsWith("4")) {
        $("#card-master").addClass("card-img--unselected");
        $("#card-amex").addClass("card-img--unselected");
        $("#card-diners").addClass("card-img--unselected");
        $("#card-visa").removeClass("card-img--unselected");
    } else if (bin_tarjeta.startsWith("5")) {
        $("#card-visa").addClass("card-img--unselected");
        $("#card-amex").addClass("card-img--unselected");
        $("#card-diners").addClass("card-img--unselected");
        $("#card-master").removeClass("card-img--unselected");
    } else if (bin_tarjeta.startsWith("37")) {
        $("#card-visa").addClass("card-img--unselected");
        $("#card-master").addClass("card-img--unselected");
        $("#card-diners").addClass("card-img--unselected");
        $("#card-amex").removeClass("card-img--unselected");
    } else if(bin_tarjeta != ''){
        $("#card-visa").addClass("card-img--unselected");
        $("#card-master").addClass("card-img--unselected");
        $("#card-amex").addClass("card-img--unselected");
        $("#card-diners").removeClass("card-img--unselected");
    } else {
        $("#card-visa").removeClass("card-img--unselected");
        $("#card-master").removeClass("card-img--unselected");
        $("#card-amex").removeClass("card-img--unselected");
        $("#card-diners").removeClass("card-img--unselected");
    }
  }
  
  var cardContent = ''

  function validateNumbers(evt) {
    var key = evt.key;
    if (key >= 0 && key <= 9 || key == 'Backspace' || key == 'Delete') {
      return true;
    }
    return false;
    
  }

  function validateCardNumbers(evt) {
    evt.preventDefault()
    var key = evt.key;
    if ((key >= 0 && key <= 9) || key == 'Backspace') {
      if(key >= 0 && key <= 9){
        cardContent += key
        let longitud = cardContent.length;
        let masked = longitud > 4 ?  "*".repeat(longitud - 4) + cardContent.slice(-4) : "*".repeat(longitud)
        $('#credit-card-number').val(masked)
      } else if(key == 'Backspace'){
        let longitud = cardContent.length;
        cardContent = cardContent.slice(0,longitud-1)
        longitud = longitud -1;
        let masked = longitud > 4 ?  "*".repeat(longitud - 4) + cardContent.slice(-4) : "*".repeat(longitud)
        $('#credit-card-number').val(masked)
      }
      console.log(cardContent);
      mostrarIconoTarjeta(cardContent)
      validarTarjeta(cardContent);
      //return true;
    }
    //return false;
    
  }

  var inputElement = document.getElementById('credit-card-number')

  inputElement.addEventListener('input', (event) => {
    if(event.inputType == 'insertText'){
      var key = event.data;
      if(key >= 0 && key <= 9){
        cardContent += key
        let longitud = cardContent.length;
        let masked = longitud > 4 ?  "*".repeat(longitud - 4) + cardContent.slice(-4) : "*".repeat(longitud)
        inputElement.value = masked
      }
    } else if(event.inputType == 'deleteContentBackward') {
      let longitud = cardContent.length;
      cardContent = cardContent.slice(0,longitud-1)
      longitud = longitud -1;
      let masked = longitud > 4 ?  "*".repeat(longitud - 4) + cardContent.slice(-4) : "*".repeat(longitud)
      inputElement.value = masked
    } else {
      var value = event.target.value
      if(/^\d+$/.test(value)){
        cardContent = value;
        let longitud = cardContent.length;
        let masked = longitud > 4 ?  "*".repeat(longitud - 4) + cardContent.slice(-4) : "*".repeat(longitud)
        inputElement.value = masked
      } else {
        inputElement.value = ''
      }
    }
    mostrarIconoTarjeta(cardContent)
    validarTarjeta(cardContent);
  });

  function validateInputCvv() {
    var value = $('#card-cvv').val();
    validarCvv(value);
  }

  function oneTimePay() {
    $("#credit-card-form").off("submit");
    $("#credit-card-form").submit(function(event) {
      event.preventDefault(); // Prevent default form submission
      if(validateCardInputs()){
          swal.fire({
              title: 'Procesando ...',
              didOpen () {
                swal.showLoading()
              },
              didClose () {
                swal.hideLoading()
              },
              allowOutsideClick: false,
              allowEscapeKey: false,
              allowEnterKey: false
            })
          var merchantKey = credentials();
          const currency = localStorage.getItem('currency') ?? 'CLP';
          const kushki = new Kushki({
              merchantId: merchantKey, 
              inTestEnvironment: true,
            });
          kushki.requestToken({
              amount: totalG,
              currency: currency,
              card: {
                  name: $('#credit-card-name').val(),
                  number: cardContent,
                  cvc: $('#card-cvv').val(),
                  expiryMonth:  $('#card-date').val().split('/')[0],
                  expiryYear: $('#card-date').val().split('/')[1],
              },
              }, (response) => {
                  swal.close();
                  if(response.token){
  var jsonHtml = `
//Respuestas
  
  String TOKEN = ${response.token}
  Float SUBTOTALIVA = ${(totalG * 0.81).toFixed(2)}
  Float SUBTOTALIVA0 = 0
  Float IVA = ${(totalG * 0.19).toFixed(2)}
  String CURRENCY = ${currency}
  

// CODIGO
  const kushki = new Kushki({
      merchantId: '${merchantKey}', 
      inTestEnvironment: true,
  });  
  kushki.requestToken({
      amount: ${totalG},
      currency: '${currency}',
      card: {
          name: '${$('#credit-card-name').val()}',
          number: '${$('#credit-card-number').val()}',
          cvc: '***',
          expiryMonth:  '${$('#card-date').val().split('/')[0]}',
          expiryYear: '${$('#card-date').val().split('/')[1]}',
      },
      }, (response) => {
      if(response.code){
          console.log(response);
          // Submit your code to your back-end
      } else {
          console.error('Error: ',response.error, 'Code: ', response.code, 'Message: ',response.message);
      }
  });
  
  
  `
                      $('#toggle-modal').click()
                      $('#jscode').html(jsonHtml)
                      hljs.highlightAll();
                      console.log(response);
  
                  // Submit your code to your back-end
              } else {
                  Swal.fire({
                      icon: 'error',
                      title: 'Hubo un error',
                      text: response.message,
                      showConfirmButton: true
                  })
                  console.error('Error: ',response.error, 'Code: ', response.code, 'Message: ',response.message);
              }
          });
      }
    })
  }

  function suscribePay() {
    $("#credit-card-form").off("submit");
    $("#credit-card-form").submit(function(event) {
      event.preventDefault(); // Prevent default form submission
      if( validateCardInputs() ){
          swal.fire({
              title: 'Procesando ...',
              didOpen () {
                swal.showLoading()
              },
              didClose () {
                swal.hideLoading()
              },
              allowOutsideClick: false,
              allowEscapeKey: false,
              allowEnterKey: false
            })
          var merchantKey = credentials();
          const currency = localStorage.getItem('currency') ?? 'CLP';
          const kushki = new Kushki({
              merchantId: merchantKey, 
              inTestEnvironment: true,
            });
          kushki.requestSubscriptionToken({
              currency: currency,
              card: {
                  name: $('#credit-card-name').val(),
                  number: cardContent,
                  cvc: $('#card-cvv').val(),
                  expiryMonth:  $('#card-date').val().split('/')[0],
                  expiryYear: $('#card-date').val().split('/')[1],
              },
              }, (response) => {
                  swal.close();
                  if(response.token){
  var jsonHtml = `
//Respuestas
  
  String TOKEN = ${response.token}
  Float SUBTOTALIVA = ${(totalG * 0.81).toFixed(2)}
  Float SUBTOTALIVA0 = 0
  Float IVA = ${(totalG * 0.19).toFixed(2)}
  String CURRENCY = ${currency}
 


// CODIGO
  const kushki = new Kushki({
      merchantId: '${merchantKey}', 
      inTestEnvironment: true,
  });  
  kushki.requestSubscriptionToken({
      currency: '${currency}',
      card: {
          name: '${$('#credit-card-name').val()}',
          number: '${$('#credit-card-number').val()}',
          cvc: '***',
          expiryMonth:  '${$('#card-date').val().split('/')[0]}',
          expiryYear: '${$('#card-date').val().split('/')[1]}',
      },
      }, (response) => {
      if(response.code){
          console.log(response);
          // Submit your code to your back-end
      } else {
          console.error('Error: ',response.error, 'Code: ', response.code, 'Message: ',response.message);
      }
  });
  
  
  `
                      $('#toggle-modal').click()
                      $('#jscode').html(jsonHtml)
                      hljs.highlightAll();
                      console.log(response);
  
                  // Submit your code to your back-end
              } else {
                  Swal.fire({
                      icon: 'error',
                      title: 'Hubo un error',
                      text: response.message,
                      showConfirmButton: true
                  })
                  console.error('Error: ',response.error, 'Code: ', response.code, 'Message: ',response.message);
              }
          });
      }
    });
  }

  function validateCardInputs() {
    var validated = true;
    if($('#credit-card-number').hasClass('is-invalid') || $('#card-cvv').hasClass('is-invalid')
            || $('#card-date').hasClass('is-invalid')){
        Swal.fire({
            icon: 'error',
            title: 'Hay campos con error',
            showConfirmButton: true
          })
          validated = false;
    }
    return validated;
  }


function cashPay(event) {
  event.preventDefault()
  swal.fire({
      title: 'Procesando ...',
      didOpen () {
        swal.showLoading()
      },
      didClose () {
        swal.hideLoading()
      },
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false
    })
  var merchantKey = credentials();
  const currency = localStorage.getItem('currency') ?? 'CLP';
  const kushki = new Kushki({
      merchantId: merchantKey, 
      inTestEnvironment: true,
    });
  kushki.requestCashToken({
      name: $('#cash-name').val(),
      lastName: $('#cash-lastname').val(),
      identification: $('#cash-document').val(),
      documentType: documentType(),
      email: $('#cash-email').val(),
      totalAmount: totalG,
      currency: currency,
      description: `Compra por ${currency} ${formatNumber(totalG)} en Kushki Store`,
      }, (response) => {
          swal.close();
          if(response.token){
var jsonHtml = `

//Respuestas

Float SUBTOTALIVA = ${(totalG * 0.81).toFixed(2)}
Float SUBTOTALIVA0 = 0
Float IVA = ${(totalG * 0.19).toFixed(2)}
String CURRENCY = ${currency}
String TOKEN = ${response.token}

// CODIGO
const kushki = new Kushki({
    merchantId: '${merchantKey}', 
    inTestEnvironment: true,
});  
kushki.requestCashToken({
      name: '${$('#cash-name').val()}','
      lastName: '${$('#cash-lastname').val()},
      identification: '${$('#cash-document').val()}',
      documentType: '${documentType()}',
      email: '${$('#cash-email').val()}',
      totalAmount: ${totalG},
      currency: '${currency}',
      description: 'Compra por ${currency} ${formatNumber(totalG)} en Kushki Store',
    },
    }, (response) => {
    if(response.code){
        console.log(response);
        // Submit your code to your back-end
    } else {
        console.error('Error: ',response.error, 'Code: ', response.code, 'Message: ',response.message);
    }
});


`
              $('#toggle-modal').click()
              $('#jscode').html(jsonHtml)
              hljs.highlightAll();
              console.log(response);

          // Submit your code to your back-end
      } else {
          Swal.fire({
              icon: 'error',
              title: 'Hubo un error',
              text: response.message,
              showConfirmButton: true
          })
          console.error('Error: ',response.error, 'Code: ', response.code, 'Message: ',response.message);
      }
  });
    
}


function transferPay(event) {
  event.preventDefault()
  swal.fire({
      title: 'Procesando ...',
      didOpen () {
        swal.showLoading()
      },
      didClose () {
        swal.hideLoading()
      },
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false
    })
  var merchantKey = credentials();
  const currency = localStorage.getItem('currency') ?? 'CLP';
  const kushki = new Kushki({
      merchantId: merchantKey, 
      inTestEnvironment: true,
    });
  kushki.requestTransferToken({
      bankId: $('#transfer-bank').val(), 
      callbackUrl: 'http://www.testcallbackurl.com/', 
      userType: $('#transfer-userType').val(),
      documentType: documentType(),
      documentNumber: $('#transfer-document').val(),
      paymentDesc: `Compra por ${currency} ${formatNumber(totalG)} en Kushki Store`,
      email: $('#transfer-email').val(),
      currency: currency,
      amount: {
        subtotalIva: parseFloat((totalG * 0.81).toFixed(2)),
        subtotalIva0: 0,
        iva: parseFloat((totalG * 0.19).toFixed(2)),
        }
      }, (response) => {
          swal.close();
          if(response.token){
var jsonHtml = `

//Respuestas

Float SUBTOTALIVA = ${(totalG * 0.81).toFixed(2)}
Float SUBTOTALIVA0 = 0
Float IVA = ${(totalG * 0.19).toFixed(2)}
String CURRENCY = ${currency}
String TOKEN = ${response.token}

// CODIGO
const kushki = new Kushki({
    merchantId: '${merchantKey}', 
    inTestEnvironment: true,
});  

//Lista de bancos
var callback = function(response) {
  if(!response.code){
    console.log(response);
    });
  } else {
    console.error('Error: ',response.error, 'Code: ', response.code, 'Message: ',response.message);
  }
}

kushki.requestBankList(callback);

// Token
kushki.requestTransferToken({
    bankId: '${$('#transfer-bank').val()}',
    callbackUrl: 'http://www.testcallbackurl.com/', 
    userType: '${$('#transfer-userType').val()}',
    documentType: '${documentType()}',
    documentNumber: '${$('#transfer-document').val()}',
    paymentDesc: 'Compra por ${currency} ${formatNumber(totalG)} en Kushki Store',
    email: '${$('#transfer-email').val()}',
    currency: '${currency}',
    amount: {
      subtotalIva: ${(totalG * 0.81).toFixed(2)},
      subtotalIva0: 0,
      iva: ${(totalG * 0.19).toFixed(2)},
      },
    }, (response) => {
    if(response.code){
        console.log(response);
        // Submit your code to your back-end
    } else {
        console.error('Error: ',response.error, 'Code: ', response.code, 'Message: ',response.message);
    }
});


`
              $('#toggle-modal').click()
              $('#jscode').html(jsonHtml)
              hljs.highlightAll();
              console.log(response);

          // Submit your code to your back-end
      } else {
          Swal.fire({
              icon: 'error',
              title: 'Hubo un error',
              text: response.message,
              showConfirmButton: true
          })
          console.error('Error: ',response.error, 'Code: ', response.code, 'Message: ',response.message);
      }
  });
    
}

function finish() {
  const min = 1000; 
  const max = 999999;
  const rango = max - min + 1;
  var randomId = Math.floor(Math.random() * rango) + min;
  Swal.fire({
    icon: 'success',
    title: 'Tu compra ha finalizado con éxito',
    text: `Id de compra: ${randomId}`,
    showConfirmButton: true,
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
}).then((result) => {
  localStorage.removeItem('cart')
  window.location.href = 'index.html'
})
}
