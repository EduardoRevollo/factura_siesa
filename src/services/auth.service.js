export function getToken() {
  const url = 'https://integracioneseco.co/ApiFacturas/api/login/authenticate';
  //console.log("Url: " + url);

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
    .then(response => response.json())
    .then(respuesta => respuesta.toString())
    .catch(error => console.log('error', error));
}
