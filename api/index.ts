import {
  BaseResponse,
  CustomerModel,
  getCustomersFiler,
  updateCustomersData,
} from "@/model";
import axios, { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  timeout: 20000,
});

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
  return api.get("updateCustomerByNumber/" + id, { data: data });
}
