import React from "react";
import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
const { confirm } = Modal;
const showPromiseConfirm = (id, title, content, onOk) => {
  return confirm({
    title: title,
    icon: <ExclamationCircleFilled />,
    content: content,
    async onOk() {
      await onOk();
    },
    onCancel() {},
    centered: true,
    okText: "Yes",
    cancelText: "No",
  });
};

export default showPromiseConfirm;
