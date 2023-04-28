// Main Js File
$(document).ready(function () {
    loadCheckout()
    var merchantKey = credentials();
  const kushki = new Kushki({
      merchantId: merchantKey, 
      inTestEnvironment: true,
    });
    var callback = function(response) {
        if(!response.code){
          console.log(response);
          var select = $('#transfer-bank')
          response.forEach((element, index) => {
            if(index>0){
                var option = $("<option>");
                  option.val(element.code);
                  option.text(element.name);
                  select.append(option);
            }
          });
        } else {
          console.error('Error: ',response.error, 'Code: ', response.code, 'Message: ',response.message);
        }
      }
      
      kushki.requestBankList(callback);
});