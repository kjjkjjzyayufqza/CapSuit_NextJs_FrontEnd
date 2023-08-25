"use client";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ConfigProvider } from "antd";
import enUS from "antd/locale/en_US";
import { CustomerModel } from "@/model";
import { getCustomers } from "@/api";
import CustomerDetailDrawer from "./CustomerDetailDrawer";

function CustomerTable() {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<CustomerModel>[] = [
    {
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
    },

    {
      title: "Contact LastName",
      dataIndex: "contactLastName",
      copyable: false,
      ellipsis: false,
      hideInTable: true,
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
      copyable: true,
      ellipsis: true,
      hideInSearch: true,
      render(dom, entity, index, action, schema) {
        return (
          <p>{entity.addressLine1 + " - " + (entity.addressLine2 ?? "")}</p>
        );
      },
    },
    {
      title: "Country",
      dataIndex: "country",
      copyable: true,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: "Credit Limit",
      dataIndex: "creditLimit",
      copyable: true,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: "Action",
      valueType: "option",
      key: "option",
      width: 100,
      render: (_text, record, _, _action) => [
        <CustomerDetailDrawer key={0} id={record.customerNumber} />,
      ],
    },
  ];

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
              return {
                data: response.data.data,
              };
            }}
            rowKey="customerNumber"
            pagination={{
              pageSize: 10,
            }}
            dateFormatter="string"
            headerTitle={
              <div className="text-xl font-bold">Customers List</div>
            }
            scroll={{
              x: "max-content",
            }}
            search={{
              labelWidth: 150,
            }}
          />
        </ConfigProvider>
      </div>
    );
}

export default CustomerTable;
