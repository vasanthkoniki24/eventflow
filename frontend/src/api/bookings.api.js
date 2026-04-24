import api from "./axios";

export const createBooking = (data) => api.post("/bookings", data);
export const getMyBookings = () => api.get("/my-bookings");
export const getAllBookings = () => api.get("/bookings");
export const getBooking = (id) => api.get(`/bookings/${id}`);