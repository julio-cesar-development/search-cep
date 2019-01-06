window.onload = () => {
  // variables
  const $ = (ele) => {
    return document.querySelector(ele);
  }

  const cepField = $('input[name="cep"]');
  const phoneField = $('input[name="phone"]');
  const addressField = $('input[name="address"]');
  const districtField = $('input[name="district"]');
  const cityField = $('input[name="city"]');
  const stateField = $('input[name="state"]');
  const ajax = new XMLHttpRequest();

  // functions
  const setMessage = (options) => {
    if(options.color && options.message){
      $('.message').style.display = 'unset';
      $('.message').style.backgroundColor = options.color;
      $('.message').innerHTML = options.message;
    }else{
      $('.message').style.display = 'none';
    }
  }

  const manageTypingPhone = (e) => {
    let phoneValue = phoneField.value.replace(/[^\d]+/g, '');
    if(phoneValue.length > 0){
      phoneValue = `(${phoneValue.substring(0)}`;
    }
    if(phoneValue.length > 3){
      phoneValue = `${phoneValue.substring(0,3)})${phoneValue.substring(3)}`;
    }
    if(phoneValue.length > 8){
      if(phoneValue.length <= 12){
        phoneValue = `${phoneValue.substring(0,8)}-${phoneValue.substring(8,12)}`;
      }else {
        phoneValue = `${phoneValue.substring(0,9)}-${phoneValue.substring(9,13)}`;
      }
    }
    e.target.value = phoneValue;
  }

  const manageTypingCep = (e) => {
    clearCEPFields();
    setMessage({ }); // to hide message instantly
    let cepValue = cepField.value.replace(/[^\d]+/g, '');
    cepValue = cepValue.length > 5 ? cepValue.substring(0, 5) + '-' + cepValue.substring(5, 8) : cepValue;
    if(cepValue.length == 9) {
      request(cepValue);
    };
    e.target.value = cepValue;
  }

  const setCEPFields = (data) => {
    addressField.value = data.address;
    districtField.value = data.district;
    cityField.value = data.city;
    stateField.value = data.state;
  }

  const fillCEPFields = () => {
    let data = parseData();
    if(data.status === 0) { // error
      data = null;
      clearCEPFields();
      setMessage({ message: 'CEP não encontrado', color: 'rgba(240, 0, 0, .5)' });
    }else{ // success
      setCEPFields(data);
      addressField.removeAttribute('disabled');
      districtField.removeAttribute('disabled');
      cityField.removeAttribute('disabled');
      stateField.removeAttribute('disabled');
      setMessage({ }); // to hide message instantly
    }
  }

  const clearCEPFields = () => {
    setCEPFields({ address: '', district: '', city: '', state: '' });
    addressField.setAttribute('disabled', 'disabled');
    districtField.setAttribute('disabled', 'disabled');
    cityField.setAttribute('disabled', 'disabled');
    stateField.setAttribute('disabled', 'disabled');
  }

  const parseData = () => {
    let result;
    try {
      result = JSON.parse(ajax.responseText);
    }
    catch(e) {
      result = null;
    }
    return result;
  }

  const isRequestOk = () => {
    return ajax.readyState === 4 && ajax.status === 200;
  }

  const handleReadyStateChange = () => {
    if(isRequestOk()) {
      fillCEPFields();
    }
  }

  const request = (cepCode) => {
    const url = `https://apps.widenet.com.br/busca-cep/api/cep.json?code=${cepCode}`;
    ajax.open('GET', url);
    ajax.send();
    setMessage({ message: 'Carregando...', color: 'rgba(9, 113, 240, .5)' }); // loading
    ajax.addEventListener('readystatechange', handleReadyStateChange);
  }

  // calls
  if(cepField) cepField.addEventListener('keyup', manageTypingCep);
  if(phoneField) phoneField.addEventListener('keyup', manageTypingPhone);

}