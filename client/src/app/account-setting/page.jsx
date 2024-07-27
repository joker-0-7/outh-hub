"use client";
import React, { useContext } from "react";
import { UserContext } from "../context/User";
import { Modal } from "antd";
const { confirm } = Modal;
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useState } from "react";
import { resetInformation, updatePassword } from "../functions/users";
import ButtonComponent from "../utils/Button";
import Inputs from "../utils/Inputs";
function Page() {
  const [state] = useContext(UserContext);
  const [password, setPassword] = useState("");
  const handleUpdate = async (userId) => {
    const data = await updatePassword(password, userId);
    if (data && data.status && data.status === "success") {
      return true;
    }
  };
  const showPromiseConfirm = (userId) => {
    confirm({
      title: "Do you want to reset your informations?",
      icon: <ExclamationCircleFilled />,
      content: "When clicked the OK button, You will lost many informations ",
      async onOk() {
        await resetInfo(userId);
      },
      onCancel() {},
      centered: true,
      okText: "Yes",
      cancelText: "No",
    });
  };
  const resetInfo = async (userId) => {
    const data = await resetInformation(userId);
    console.log(data);
    if (data.status === "success") {
      return;
    }
  };
  const date = new Date(state.user.activate);
  return (
    <div className="settings h-screen flex justify-center items-center">
      <div className="form-user container mx-auto">
        <div className="form-user__title text-center">
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-gray-600">
            You can change your password only, and you don&apos;t need to change
            anything else.
          </p>
        </div>
        <div className="form-user__body">
          <div className="form-user__body--item h-2/3 w-full">
            <form>
              <div className="mt-8 grid grid-cols-12 gap-6">
                <Inputs
                  title="First Name"
                  value={state?.user?.firstName}
                  disabled={true}
                />
                <Inputs
                  title="Last Name"
                  value={state?.user?.lastName}
                  disabled={true}
                />
                <Inputs
                  title="Expiration Date"
                  value={
                    state.user.activate !== null
                      ? date.toLocaleDateString()
                      : "not available"
                  }
                  disabled={true}
                />
                <Inputs
                  title="Email"
                  value={state?.user?.email}
                  disabled={true}
                />
                <Inputs
                  title="Password"
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <div className="col-span-12 sm:col-span-6 "></div>
                <div className="col-span-12 sm:col-span-6 flex justify-between">
                  <ButtonComponent
                    onClick={() => {
                      handleUpdate(state?.user._id);
                    }}
                    title="Update Password"
                  />
                  <ButtonComponent
                    danger={true}
                    onClick={() => {
                      showPromiseConfirm(state?.user._id);
                    }}
                    title="Reset Information"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Page;
