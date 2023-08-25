
export interface BaseResponse<T> {
  code: number;
  data: T;
}

export interface CustomerModel {
  customerNumber: number;
  customerName: string;
  contactLastName: string;
  contactFirstName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  salesRepEmployeeNumber: number;
  creditLimit: number;
}

export interface getCustomersFiler {
  customerName?: string;
  contactLastName?: string;
  contactFirstName?: string;
  creditLimitDesc?: boolean;
}

export interface updateCustomersData {
  contactFirstName: string;
  contactLastName: string;
  creditLimit: number;
}
