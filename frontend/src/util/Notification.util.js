import { notification } from "antd";

//type: success, info, warning, error

export const openNotification = (type, message, description) => {
  notification[type]({
    message: message,
    description: description,
  });
};
