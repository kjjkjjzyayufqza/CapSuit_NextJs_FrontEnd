"use client";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ConfigProvider } from "antd";
import enUS from "antd/locale/en_US";
import { StyleProvider } from "@ant-design/cssinjs";
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
      title: "customerNumber",
      dataIndex: "customerNumber",
      copyable: true,
      ellipsis: true,
    },
    {
      title: "addressLine1",
      dataIndex: "addressLine1",
      copyable: true,
      ellipsis: true,
    },
    {
      title: "addressLine2",
      dataIndex: "addressLine2",
      copyable: true,
      ellipsis: true,
    },
    {
      title: "country",
      dataIndex: "country",
      copyable: true,
      ellipsis: true,
    },
    {
      title: "creditLimit",
      dataIndex: "creditLimit",
      copyable: true,
      ellipsis: true,
    },
    {
      title: "Action",
      valueType: "option",
      key: "option",
      width: 100,
      render: (_text, record, _, _action) => [
        <CustomerDetailDrawer key={1} id={record.customerNumber} />,
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
      <div className="md:container md:mx-auto py-10">
        <ConfigProvider locale={enUS}>
          <StyleProvider hashPriority="high">
            <div className="">
              <ProTable<CustomerModel>
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={async (_params, _sort, _filter) => {
                  const response = await getCustomers({
                    customerName:
                      _params.customerName == ""
                        ? undefined
                        : _params.customerName,
                    contactLastName:
                      _params.contactLastName == ""
                        ? undefined
                        : _params.contactLastName,
                    contactFirstName:
                      _params.contactFirstName == ""
                        ? undefined
                        : _params.contactFirstName,
                  });
                  console.log(response.data.data);
                  return {
                    data: response.data.data,
                  };
                }}
                rowKey="customerNumber"
                pagination={{
                  pageSize: 5,
                }}
                dateFormatter="string"
                headerTitle={
                  <div className="text-xl font-bold">Fake User List</div>
                }
                toolBarRender={() => []}
                scroll={{
                  x: "max-content",
                }}
              />
            </div>
          </StyleProvider>
        </ConfigProvider>
      </div>
    );
}

export default CustomerTable;
