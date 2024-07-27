import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
const { confirm } = Modal;
export const showConfirm = ({ num }) => {
  const okFun = () => {
    console.log("Accept Ok Exit", num);
  };
  confirm({
    title: "Do you want to Exit This Exam",
    icon: <ExclamationCircleFilled />,
    content:
      "if you exit this exam will add to your score faild in not answerd questions",
    onOk() {
      okFun();
    },
    onCancel() {
      console.log("Cancel");
    },
  });
};
