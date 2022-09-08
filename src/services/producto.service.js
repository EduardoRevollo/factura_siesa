import http from "../http-common";


class ProductoDataService {  
  getFolio(codigo,nit) {
    return http.get(`/facturas/getConsultaFacturas?f_id_cia=${codigo}&f_nit=${nit}`);
  }

  getPdf(id_cia,tipDoc,folio) {
    return http.post('/facturas/postConsultaDocumentoPDF',{"f_id_cia": id_cia,"f_tipo_documento": tipDoc,"f_folio": folio});
  }

}

export default new ProductoDataService();