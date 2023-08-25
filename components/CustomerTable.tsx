"use client";
// use client is for client page, because the data on this page is dynamic

import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { useLayoutEffect, useRef, useState } from "react";
import { ConfigProvider } from "antd";
import enUS from "antd/locale/en_US";
import { CustomerModel } from "@/model";
import { getCustomers } from "@/api";
import CustomerDetailDrawer from "./CustomerDetailDrawer";

function CustomerTable() {
  // Create ref for easy to control
  const actionRef = useRef<ActionType>();

  // Shelf Data Architecture for Creating Tables
  const columns: ProColumns<CustomerModel>[] = [
    {
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "Contact LastName", // Table item Title
      dataIndex: "contactLastName", // Table item data index is for render data in which object name
      copyable: false, // Copy Button
      ellipsis: false, // Can be ellipsis
      hideInTable: true, // No need to be displayed in a table
    },
    {
      title: "Contact FirstName",
      dataIndex: "contactFirstName",
      copyable: false,
      ellipsis: false,
      hideInTable: true, 
    },
    {
      title: "Customer Number",
      dataIndex: "customerNumber",
      copyable: false,
      ellipsis: false,
      hideInSearch: true,
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      copyable: false,
      ellipsis: false,
    },
    {
      title: "Address Line",
      dataIndex: "addressLine1",
      copyable: false,
      ellipsis: true,
      hideInSearch: true,
      // Customize render method
      // Customize what to render
      render(dom, entity, index, action, schema) {
        return (
          <p>{entity.addressLine1 + " - " + (entity.addressLine2 ?? "")}</p>
        );
      },
    },
    {
      title: "Country",
      dataIndex: "country",
      copyable: false,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: "Credit Limit",
      dataIndex: "creditLimit",
      copyable: false,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: "Action",
      valueType: "option",
      key: "option",
      width: 100,
      // Render the component, and past the id value
      render: (_text, record, _, _action) => [
        <CustomerDetailDrawer key={0} id={record.customerNumber} />,
      ],
    },
  ];

  // Create the state value
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  // This useEffect will only run once, during the first render
  useLayoutEffect(() => {
    // Updating a state causes a re-render
    setInitialRenderComplete(true);
  }, []);

  if (initialRenderComplete)
    return (
      <div className="">
        <ConfigProvider locale={enUS}>
          <ProTable<CustomerModel>
            columns={columns}
            actionRef={actionRef}
            cardBordered
            // Get data from server
            request={async (_params, _sort, _filter) => {
              const response = await getCustomers({
                customerName:
                  _params.customerName == "" ? undefined : _params.customerName,
                contactLastName:
                  _params.contactLastName == ""
                    ? undefined
                    : _params.contactLastName,
                contactFirstName:
                  _params.contactFirstName == ""
                    ? undefined
                    : _params.contactFirstName,
              });
              // return the data
              return {
                data: response.data.data,
              };
            }}
            // Set each table item key
            rowKey="customerNumber"
            // Set the number of items per page
            pagination={{
              pageSize: 10,
            }}
            dateFormatter="string"
            headerTitle={
              <div className="text-xl font-bold">Customers List</div>
            }
            // Suitable for mobile view
            scroll={{
              x: "max-content",
            }}
            // Setting the text length of the query field
            search={{
              labelWidth: 150,
            }}
          />
        </ConfigProvider>
      </div>
    );
}

export default CustomerTable;
