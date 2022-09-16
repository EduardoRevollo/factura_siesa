export function getToken() {
  const url = 'https://integracioneseco.co/ApiFacturas/api/login/authenticate';
  console.log("Url: " + url);

  var raw = JSON.stringify({
    "Username": "ecocapital_pst",
    "Password": "FactInt22+*"
  });

  var requestOptions = {
  method: 'POST',
  body: raw,
  headers: {"Content-Type": "application/json"},
  redirect: 'follow'
  };

  return fetch(url, requestOptions)
    .then(response => 
      {
        response.json();
        
        //if (response.data.accessToken) {
          //localStorage.setItem("user", JSON.stringify(response.data));
        //}
        localStorage.setItem("user", "Conectado");
      }
    )
    .then(respuesta => respuesta.toString())
    .catch(error => console.log('error', error));
}

export function getFolio(codigo, nit, token) {
  const url = 'https://integracioneseco.co/ApiFacturas/api/facturas/getConsultaFacturas?f_id_cia=' + codigo +'&f_nit=' + nit;

  //console.log("Url: " + url);

  let autorization = "Bearer " + token;

  var requestOptions = {
  method: 'GET',
  headers: {"Authorization": autorization},
  redirect: 'follow'
  };

  return fetch(url, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));
}


export function getFactura(folio, token) {
  const url = 'https://integracioneseco.co/ApiFacturas/api/facturas/postConsultaDocumentoPDF';
  //console.log("Url: " + url);

  var raw = JSON.stringify({
    "f_id_cia": 1,
    "f_tipo_documento": "1",
    "f_folio": "FVE20843"
  });

  var autorization = "Bearer " + token;

  var requestOptions = {
  method: 'POST',
  body: raw,
  headers: {"Authorization": autorization,"Content-Type": "application/json"},
  redirect: 'follow'
  };

  return fetch(url, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));
}