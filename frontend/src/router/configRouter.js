import CreateNewPostPages from "../pages/CreateNewPostPages";
import DetailPostPages from "../pages/DetailPostPages";
import HomePages from "../pages/HomePages";
import LoginPages from "../pages/LoginPages";
import LogoutPages from "../pages/LogoutPages";
import RegisterPages from "../pages/RegisterPages";
import SettingPages from "../pages/SettingPages";
import { pathName } from "./pathName";

export const configRouter=[
    {
        path:pathName.home,
        pages:<HomePages/>,
        privated:"false"
    },
    {
        path:pathName.createBlog,
        pages:<CreateNewPostPages/>,
        privated:"false"
    },
    {
        path:pathName.detailPost,
        pages:<DetailPostPages/>,
        privated:"false"
    },
    {
        path:pathName.setting,
        pages:<SettingPages/>,
        privated:"false"
    },
    {
        path:pathName.login,
        pages:<LoginPages/>,
        privated:"false"
    },
    {
        path:pathName.register,
        pages:<RegisterPages/>,
        privated:"false"
    },
    {
        path:pathName.logout,
        pages:<LogoutPages/>,
        privated:"false"
    },
]