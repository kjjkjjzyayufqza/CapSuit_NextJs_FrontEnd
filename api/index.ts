import {
  BaseResponse,
  CustomerModel,
  getCustomersFiler,
  updateCustomersData,
} from "@/model";
import axios, { AxiosResponse } from "axios";

// Create the axios object
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  timeout: 20000,
});

// Create function getCustomers, can take 1 args, type is getCustomersFiler
// Response is Base on AxiosResponse type and custom CustomerModel
export function getCustomers(
  args?: getCustomersFiler
): Promise<AxiosResponse<BaseResponse<CustomerModel[]>>> {
  return api.get("getCustomers", {
    params: args,
  });
}

export function getCustomerByNumber(
  id: string | number
): Promise<AxiosResponse<BaseResponse<CustomerModel>>> {
  return api.get("getCustomerByNumber/" + id);
}

export function updateCustomerByNumber(
  id: string | number,
  data: updateCustomersData
): Promise<AxiosResponse<BaseResponse<CustomerModel>>> {
  return api.put("updateCustomerByNumber/" + id, data);
}
