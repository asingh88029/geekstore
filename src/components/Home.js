import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { modalAction } from "../redux/action/action";
import { userTokenAction } from "../redux/action/action";
import { Modal } from "antd";
import NavbarComp from "./Navbar";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input, Tooltip, Select, Alert } from "antd";
import config from "../config";

export const Home = () => {
  const Dispatch = useDispatch();

  const { modalShow } = useSelector((myStore) => {
    return myStore;
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  async function loginHandler() {
    try {
      const APIUrl = config.API_BASE_URL + "/user/login";

      let response = await fetch(APIUrl, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(formData),
      });

      response = await response.json();

      if (response.token) {
        setAlertMsg("You login successfully.");
        setShowSuccessAlert(true);
        Dispatch(modalAction());

        

        Dispatch(userTokenAction(response.token));

        setFormData({
          ...formData,
          email:"",
          password:"",
          role:""
        })

        setTimeout(()=>{
          setShowSuccessAlert(false)
        },2000)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <NavbarComp />
      {showSuccessAlert ? (
        <div>
          <Alert message={alertMsg} type="success" closable showIcon />
        </div>
      ) : null}
      <>
        <Modal
          title="You Can Login Here"
          open={modalShow}
          okText="Login"
          onOk={loginHandler}
          onCancel={() => {
            Dispatch(modalAction());
          }}
        >
          <Input
            placeholder="Enter Your Email"
            suffix={
              <Tooltip title="Extra information">
                <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
              </Tooltip>
            }
            onChange={(e) => {
              setFormData({
                ...formData,
                email: e.target.value,
              });
            }}
          />
          <Input.Password
            placeholder="Enter Password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            onChange={(e) => {
              setFormData({
                ...formData,
                password: e.target.value,
              });
            }}
          />
          <Select
            showSearch
            placeholder="Select a Role"
            optionFilterProp="children"
            onChange={(value) => {
              setFormData({
                ...formData,
                role: value,
              });
            }}
            onSearch={() => {}}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: "customer",
                label: "Customer",
              },
              {
                value: "admin",
                label: "Admin",
              },
            ]}
          />
        </Modal>
      </>
    </div>
  );
};
