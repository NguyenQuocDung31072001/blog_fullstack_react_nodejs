import CreateNewPostPages from "../pages/CreateNewPostPages";
import DetailPostPages from "../pages/DetailPostPages";
import HomePages from "../pages/HomePages";
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
]