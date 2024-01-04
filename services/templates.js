import AXIOS from "@/middleware/axios";

export const TEMPLATES = {
  async categories() {
    return await AXIOS.get(`categories`);
  },
  async template(id) {
    return await AXIOS.get(`template?id=${id && id}`);
  },
  async variables() {
    return await AXIOS.get(`variables`);
  },
  async openAi(userData) {
    return await AXIOS.post(`open-ai`, userData);
  },
  async language() {
    return await AXIOS.get(`languages`);
  },
  async history() {
    return await AXIOS.get(`histories`);
  },
  async addon() {
    return await AXIOS.get(`addons`);
  },
  async purchaseAddons(data) {
    return await AXIOS.post(`purchase/addon`, data);
  },
  async purchaseAddonsSuccess(data) {
    return await AXIOS.post(`addon/payment/success`, data);
  },
};
