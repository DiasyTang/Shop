import { getParams } from "../src/libs/utils";

const Mock = require("mockjs");

export const getRoleList = (req) => {
    req = getParams(req.url);
    var res = Mock.mock({
        'isSuccess': true,
        'message': '',
        'data|20': [{
            "roleName": '@string',
            "roleId": "@guid",
            "isBuild": '@boolean',
            "isAdministrator": "@boolean",
            "status": '@integer(1,2)',
            "createTime": '@date(yyyy-MM-dd hh:mm:ss)',
            "creator": '@string',
            "desc": '@string'
        }],
        'total': 100,
        'timeStamp': req.TimeStamp
    });
    return res;
}

export const getRoleListWithOutPaged = (req) => {
    req = getParams(req.url);
    var res = Mock.mock({
        'isSuccess': true,
        'message': '',
        'data|20': [{
            "roleName": '@string',
            "roleId": "@guid",
        }],
        'total': 20,
        'timeStamp': req.TimeStamp
    });
    return res;
}

export const deleteRole = (req) => {
    req = getParams(req.url);
    var res = Mock.mock({
        'isSuccess': true,
        'message': '角色删除成功',
        'data': null,
        'timeStamp': req.TimeStamp
    });
    return res;
}

export const changedRoleStatus = (req) => {
    req = getParams(req.url);
    var res = Mock.mock({
        'isSuccess': true,
        'message': `角色已${req.status === 1 ? "启用" : "禁用"}`,
        'data': null,
        'timeStamp': req.TimeStamp
    });
    return res;
}

export const editRole = (req) => {
    var res = Mock.mock({
        'isSuccess': '@boolen',
        'message': `角色已保存成功`,
        'data': null,
        'timeStamp': null
    });
    return res;
}

export const changePermission = (req) => {
    var res = Mock.mock({
        'isSuccess': '@boolen',
        'message': `角色权限已修改成功`,
        'data': null,
        'timeStamp': null
    });
    return res;
}