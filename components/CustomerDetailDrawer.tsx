"use client";
import { FC } from "react";
import { Button, Form, message } from "antd";
import { getCustomerByNumber, updateCustomerByNumber } from "@/api";
import { CustomerModel, updateCustomersData } from "@/model";
import { DrawerForm, ProForm, ProFormText } from "@ant-design/pro-components";

const CustomerDetailDrawer: FC<{ id: string | number }> = ({ id }) => {
  // Create the form ref for easy control
  const [form] = Form.useForm<CustomerModel>();

  return (
    <>
      <DrawerForm<CustomerModel> // Set the form value type
        title="Customer Detail"
        resize={{
          maxWidth: window.innerWidth * 0.8,
          minWidth: 600,
        }}
        form={form} // Set the ref
        trigger={
          // Which Button can open this drawer
          <Button type="primary">View</Button>
        }
        autoFocusFirstInput
        // When leave this drawer will auto destroy
        drawerProps={{
          destroyOnClose: true,
        }}
        submitTimeout={2000}
        // Get data from server
        request={async (params) => {
          const response = await getCustomerByNumber(id);
          const data: CustomerModel = response.data.data;
          form.setFieldsValue(data);
          return data;
        }}
        // When Update Button is Click
        onFinish={async (values) => {
          const updateValue: updateCustomersData = {
            contactFirstName: values.contactFirstName,
            contactLastName: values.contactLastName,
            creditLimit: values.creditLimit,
          };
          updateCustomerByNumber(id, updateValue)
            .then((res) => {
              message.success("Update Successful");
            })
            .catch((err) => {
              message.success("Update Fail");
            });
        }}
        // Re-Set the button text by api
        submitter={{
          searchConfig: {
            resetText: "Cancel",
            submitText: "Update",
          },
        }}
      >
        <ProForm.Group>
          <ProFormText
            name="customerNumber"
            width="md"
            label="CustomerNumber"
            disabled
          />
          <ProFormText
            name="Customer Name"
            width="md"
            label="CustomerName"
            disabled
          />
          <ProFormText
            rules={[
              {
                required: true,
              },
            ]}
            width="md"
            name="contactLastName"
            label="Contact LastName"
            placeholder="Please input the last name"
          />
          <ProFormText
            rules={[
              {
                required: true,
              },
            ]}
            width="md"
            name="contactFirstName"
            label="Contact FirstName"
            placeholder="Please input the first name"
          />
          <ProFormText name="phone" width="md" label="Phone" disabled />
          <ProFormText
            name="addressLine1"
            width="md"
            label="Address Line1"
            disabled
          />
          <ProFormText
            name="addressLine2"
            width="md"
            label="Address Line2"
            disabled
          />
          <ProFormText name="city" width="md" label="City" disabled />
          <ProFormText name="state" width="md" label="State" disabled />
          <ProFormText
            name="postalCode"
            width="md"
            label="Postal Code"
            disabled
          />
          <ProFormText name="country" width="md" label="Country" disabled />
          <ProFormText
            name="salesRepEmployeeNumber"
            width="md"
            label="SalesRep Employee Number"
            disabled
          />
          <ProFormText
            name="creditLimit"
            width="md"
            label="CreditLimit"
            disabled
          />
        </ProForm.Group>
      </DrawerForm>
    </>
  );
};

export default CustomerDetailDrawer;
