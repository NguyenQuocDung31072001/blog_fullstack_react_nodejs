import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Space } from "antd";
import React from "react";
const { confirm } = Modal;

const showConfirm = ({ handleCancel, handleUpdate }) => {
  confirm({
    title: "Do you want to delete some change?",
    icon: <ExclamationCircleOutlined />,
    content: "Please click ok if you want update and cancel if you want delete change!",

    onOk() {
      handleUpdate();
    },

    onCancel() {
      handleCancel();
    },
  });
};

const ComfirmUpdateComponent = ({ handleCancel, handleUpdate }) => (
  <div onClick={showConfirm({ handleCancel, handleUpdate })}>
  </div>
);

export default ComfirmUpdateComponent;
