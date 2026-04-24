import api from "./axios";

export const getEventAnalytics = () => api.get("/admin/analytics/events");
export const getRevenueAnalytics = () => api.get("/admin/analytics/revenue");
export const cancelBookingByAdmin = (id) =>
  api.post(`/admin/bookings/${id}/cancel`);