import React from 'react';
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {Modal} from "antd";
const { confirm } = Modal;

const showConfirm = ({ handleCancel, handleUpdate }) => {
  confirm({
    title: "Do you want to delete your post?",
    icon: <ExclamationCircleOutlined />,
    content: "Please click ok to delete!",

    onOk() {
      handleUpdate();
    },

    onCancel() {
      handleCancel();
    },
  });
};

const ConfirmDeleteStoryComponent = ({ handleCancel, handleUpdate }) => {
    return (
        <div onClick={showConfirm({ handleCancel, handleUpdate })}>
            
        </div>
    );
};

export default ConfirmDeleteStoryComponent;