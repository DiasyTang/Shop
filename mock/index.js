
import Mock from "mockjs";
import { login, logout, getUserInfo } from "./login";
import { getPermissionList, deletePermission, getPermissionTree, changedPermissionStatus, editPermission } from "./permission";
import { getMenuTree, getMenuList, changedMenuStatus, editMenu, deleteMenu } from './menu';
import { getRoleList, changePermission, deleteRole, changedRoleStatus, editRole, getRoleListWithOutPaged } from "./role";
import { getUserList, deleteUser, changedUserStatus, editUser } from "./user";
import { getGoodList, deleteGood, changedGoodStatus, editGood } from "./good";
import { getOrderList, deleteOrder, changedOrderStatus, editOrder } from "./order";
import { exportInfo } from "./export-info";
// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
    timeout: 1000
});

// 登录相关和获取用户信息
Mock.mock(/\/login/, login);
Mock.mock(/\/get_info/, getUserInfo);
Mock.mock(/\/logout/, logout);

Mock.mock(/\/permission\/list/, getPermissionList);
Mock.mock(/\/permission\/delete/, deletePermission);
Mock.mock(/\/permission\/changestatus/, changedPermissionStatus);
Mock.mock(/\/permission\/edit/, editPermission);
Mock.mock(/\/permission\/tree/, getPermissionTree)

Mock.mock(/\/menu\/tree/, getMenuTree);
Mock.mock(/\/menu\/list/, getMenuList);
Mock.mock(/\/menu\/delete/, deleteMenu);
Mock.mock(/\/menu\/changestatus/, changedMenuStatus);
Mock.mock(/\/menu\/edit/, editMenu);

Mock.mock(/\/role\/list/, getRoleList);
Mock.mock(/\/role\/delete/, deleteRole);
Mock.mock(/\/role\/changestatus/, changedRoleStatus);
Mock.mock(/\/role\/edit/, editRole);
Mock.mock(/\/role\/list_no_page/, getRoleListWithOutPaged);
Mock.mock(/\/role\/changepermission/, changePermission);

Mock.mock(/\/user\/list/, getUserList);
Mock.mock(/\/user\/delete/, deleteUser);
Mock.mock(/\/user\/changestatus/, changedUserStatus);
Mock.mock(/\/user\/edit/, editUser);

Mock.mock(/\/good\/list/, getGoodList);
Mock.mock(/\/good\/delete/, deleteGood);
Mock.mock(/\/good\/changestatus/, changedGoodStatus);
Mock.mock(/\/good\/edit/, editGood);

Mock.mock(/\/order\/list/, getOrderList);
Mock.mock(/\/order\/delete/, deleteOrder);
Mock.mock(/\/order\/changestatus/, changedOrderStatus);
Mock.mock(/\/order\/edit/, editOrder);

Mock.mock(/\/export\/info/, exportInfo);

export default Mock;

// const createMock = (mod, isOpen = false) => {
//     if(!isOpen) return
//     for (var key in mod) {
//     ((res) => {
//     Mock.mock(new RegExp(res.url), res.type, (opts) => {
//     console.log(opts)
//     return Mock.mock(res.data)
//     })
//     })(mod[key]() || {})
//     }
//     }