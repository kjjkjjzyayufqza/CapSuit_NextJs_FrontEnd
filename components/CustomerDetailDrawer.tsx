'use client'
import { FC, ReactNode, useState } from "react";
import { Button, Col, Drawer, Row, Spin, Tag } from "antd";
import { getCustomerByNumber } from "@/api";
import { CustomerModel } from "@/model";

const CustomerDetailDrawer: FC<{ id: string | number }> = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [userData, setUserData] = useState<CustomerModel>();

  const showDrawer = () => {
    setOpen(true);
    setLoadingData(true);
    getCustomerByNumber(id)
      .then((res) => {
        setUserData(res.data.data);
        setLoadingData(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingData(false);
      });
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={showDrawer}>View</Button>
      <Drawer
        title="User Detail"
        placement="right"
        onClose={onClose}
        open={open}
        width={600}
      >
        <Spin tip="Loading..." spinning={loadingData}>
          <Row gutter={[0, 16]}>
            <CustomCol title={"Customer Name"} data={userData?.customerName} />
            <CustomCol title={"Contact LastName"} data={userData?.customerName} />
            <CustomCol title={"Contact FirstName"} data={userData?.customerName} />
            <CustomCol title={"Phone"} data={userData?.phone} />

            <CustomCol
              title={"Address"}
              data={[
                <CustomCol
                  key={0}
                  title={""}
                  data={userData?.addressLine1}
                />,
                <CustomCol
                  key={1}
                  title={""}
                  data={userData?.addressLine2}
                />,
                <CustomCol
                  key={2}
                  title={"state"}
                  data={userData?.state}
                />,
                <CustomCol
                  key={3}
                  title={"postalCode"}
                  data={userData?.postalCode}
                />,
                <CustomCol
                  key={4}
                  title={"country"}
                  data={userData?.country}
                />,
              ]}
            />
            <CustomCol
              title={"salesRepEmployeeNumber"}
              data={
                <a href={`https://${userData?.customerName}`} target="_blank">
                  {userData?.customerName}
                </a>
              }
            />
            <CustomCol
              title={"creditLimit"}
              data={<Tag color="orange">{userData?.customerName}</Tag>}
            />
          </Row>
        </Spin>
      </Drawer>
    </>
  );
};

export default CustomerDetailDrawer;

const CustomCol: FC<{ title: ReactNode; data?: ReactNode }> = ({
  title,
  data,
}) => {
  if (!data) {
    data = <></>;
  }
  return (
    <>
      <Col span={12} className="font-bold">
        {title}:
      </Col>
      <Col span={12}>{data}</Col>
    </>
  );
};
