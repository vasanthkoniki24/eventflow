import api from "./axios";

export const createPaymentSession = (data) =>
  api.post("/payments/create-session", data);