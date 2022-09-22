class AuthService {  

  login(username, password) {    
    localStorage.setItem("user", JSON.stringify({"username": username, "password": password}));
  }
  
  getToken() {

    const url = 'https://integracioneseco.co/ApiFacturas/api/login/authenticate';
    //const url = 'http://localhost/ApiFacturas/api/login/authenticate';
    
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
    
    
  getFolio(codigo, nit, token) {
    const url = 'https://integracioneseco.co/ApiFacturas/api/facturas/getConsultaFacturas?f_id_cia=' + codigo +'&f_nit=' + nit;
    //const url = 'http://localhost/ApiFacturas/api/facturas/getConsultaFacturas?f_id_cia=' + codigo +'&f_nit=' + nit;
  
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
  
  getFactura(folio, token) {
    const url = 'https://integracioneseco.co/ApiFacturas/api/facturas/postConsultaDocumentoPDF';
    //const url = 'http://localhost/ApiFacturas/api/facturas/postConsultaDocumentoPDF';
    //console.log("Url: " + url);
  
    var raw = JSON.stringify({
      "f_id_cia": 1,
      "f_tipo_documento": "1",
      "f_folio": folio
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

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
