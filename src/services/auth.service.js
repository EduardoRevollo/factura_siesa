export function getToken() {

  const url = 'https://integracioneseco.co/ApiFacturas/api/login/authenticate';
  
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
    .then(response => response.text())
    .catch(error => console.log('error', error));    
}
