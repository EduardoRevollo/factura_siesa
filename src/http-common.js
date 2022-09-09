import axios from "axios";
import authHeader from "./services/auth-header";

const encabezado = authHeader();

export default axios.create({
  baseURL: "https://integracioneseco.co/ApiFacturas/api",
  headers: encabezado
});