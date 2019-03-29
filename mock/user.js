import { getParams } from "../src/libs/utils";

const Mock = require("mockjs");

//按用户角色搜索
export const getUserList = (req) => {
    req = getParams(req.url);
    var res = Mock.mock({
        'isSuccess': true,
        'message': '',
        'data': {
            "userList|20": [{
                "loginName": '@string',
                "userId": "@guid",
                "userName": '@string',
                "userTypeName": "@string",
                "userType": "@guid",
                "status": '@integer(1,2)',
                "createTime": '@date(yyyy-MM-dd hh:mm:ss)',
                "creator": '@string',
                "desc": '@string'
            }],
            "roleList|4": [{
                "roleId": "@guid",
                "roleName": "@string"
            }]
        },
        'total': 100,
        'timeStamp': req.TimeStamp
    });
    return res;
}

export const deleteUser = (req) => {
    req = getParams(req.url);
    var res = Mock.mock({
        'isSuccess': true,
        'message': '用户删除成功',
        'data': null,
        'timeStamp': req.TimeStamp
    });
    return res;
}

export const changedUserStatus = (req) => {
    req = getParams(req.url);
    var res = Mock.mock({
        'isSuccess': true,
        'message': `用户已${req.status === 1 ? "启用" : "禁用"}`,
        'data': null,
        'timeStamp': req.TimeStamp
    });
    return res;
}

export const editUser = (req) => {
    var res = Mock.mock({
        'isSuccess': '@boolen',
        'message': `用户已保存成功`,
        'data': null,
        'timeStamp': null
    });
    return res;
}