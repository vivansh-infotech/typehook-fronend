import AXIOS from "@/middleware/axios";

export const AUTH_SERVICE = {
  async login(userData) {
    return await AXIOS.post(`auth/login`, userData);
  },
  async register(userData) {
    return await AXIOS.post(`register`, userData);
  },
  async forgetPassword(userData) {
    return await AXIOS.post(`password/email`, userData);
  },
  async restPassword(userData) {
    return await AXIOS.post(`password/reset`, userData);
  },
  async changePassword(userData) {
    return await AXIOS.post(`password/change`, userData);
  },
  async verifyPayment(userData) {
    return await AXIOS.post(`payment-success`, userData);
  },
  async googleLogin(userData) {
    return await AXIOS.post(`auth/google`, userData);
  },
  async facebookLogin(userData) {
    return await AXIOS.post(`auth/facebook`, userData);
  },
  async stripeBilling() {
    return await AXIOS.get(`billing`);
  },
  async verifyToken() {
    return await AXIOS.get(`me`);
  },

  async logout() {
    return await AXIOS.post(`logout`, {});
  },
};
