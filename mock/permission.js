import { getParams } from "../src/libs/utils";
const permissionTree = {
    "tree": [
        {
            "guid": "a99f7de6-94bc-4df1-87d9-a1a6d117b653",
            "parentGuid": "00000000-0000-0000-0000-000000000000",
            "title": "系统管理",
            "expand": true,
            "disabled": false,
            "disableCheckbox": false,
            "selected": false,
            "checked": false,
            "allAssigned": true,
            "permissions": [],
            "children": [
                {
                    "guid": "793e0f5d-0846-46de-968d-5e59d919b153",
                    "parentGuid": "a99f7de6-94bc-4df1-87d9-a1a6d117b653",
                    "title": "系统设置",
                    "expand": true,
                    "disabled": false,
                    "disableCheckbox": false,
                    "selected": false,
                    "checked": false,
                    "allAssigned": true,
                    "permissions": [
                        {
                            "code": "73o5I0zh",
                            "name": "备份",
                            "isAssignedToRole": true
                        },
                        {
                            "code": "SEa69deE",
                            "name": "系统设置",
                            "isAssignedToRole": true
                        },
                        {
                            "code": "TS8060OV",
                            "name": "导入",
                            "isAssignedToRole": true
                        },
                        { "code": "x0Mo9SJX", "name": "导出", "isAssignedToRole": true },
                        { "code": "y9o5fJVD", "name": "浏览", "isAssignedToRole": true }],
                    "children": []
                }]
        },
        {
            "guid": "71a53fa6-c271-4834-9b92-6ba4e187c03a",
            "parentGuid": "00000000-0000-0000-0000-000000000000",
            "title": "用户权限管理",
            "expand": true,
            "disabled": false,
            "disableCheckbox": false,
            "selected": false,
            "checked": false,
            "allAssigned": true,
            "permissions": [{ "code": "oe84u0K8", "name": "asd", "isAssignedToRole": true }],
            "children": [
                {
                    "guid": "2f458429-3976-408f-8a4f-aacbfe7d82cc",
                    "parentGuid": "71a53fa6-c271-4834-9b92-6ba4e187c03a",
                    "title": "用户管理",
                    "expand": true,
                    "disabled": false,
                    "disableCheckbox": false,
                    "selected": false,
                    "checked": false,
                    "allAssigned": true,
                    "permissions": [
                        { "code": "2EKdG4Ir", "name": "删除", "isAssignedToRole": true },
                        { "code": "GNQ0Ue88", "name": "编辑", "isAssignedToRole": true },
                        { "code": "Nry7I8go", "name": "创建", "isAssignedToRole": true },
                        { "code": "tjJ40v0j", "name": "查看", "isAssignedToRole": true }],
                    "children": []
                },
                {
                    "guid": "6f5b8aae-0385-4686-9daf-1c67914d8191",
                    "parentGuid": "71a53fa6-c271-4834-9b92-6ba4e187c03a",
                    "title": "角色管理",
                    "expand": true,
                    "disabled": false,
                    "disableCheckbox": false,
                    "selected": false,
                    "checked": false,
                    "allAssigned": true,
                    "permissions": [
                        { "code": "N76RWAiv", "name": "查看", "isAssignedToRole": true }],
                    "children": []
                },
                {
                    "guid": "09db3972-7bbc-44b8-b022-6c8b8bdd9d54",
                    "parentGuid": "71a53fa6-c271-4834-9b92-6ba4e187c03a",
                    "title": "权限管理",
                    "expand": true,
                    "disabled": false,
                    "disableCheckbox": false,
                    "selected": false,
                    "checked": false,
                    "allAssigned": true,
                    "permissions":
                        [{ "code": "I2U5lW40", "name": "查看", "isAssignedToRole": true }], "children": []
                },
                {
                    "guid": "335df74f-1944-47c0-af45-421e2108aa71",
                    "parentGuid": "71a53fa6-c271-4834-9b92-6ba4e187c03a",
                    "title": "角色权限分配",
                    "expand": true,
                    "disabled": false,
                    "disableCheckbox": false,
                    "selected": false,
                    "checked": false,
                    "allAssigned": true,
                    "permissions":
                        [{ "code": "7la17061", "name": "浏览", "isAssignedToRole": true }],
                    "children": []
                },
                {
                    "guid": "fb49cf5f-6161-4f41-9f3c-2e9bc4c7b1bb",
                    "parentGuid": "71a53fa6-c271-4834-9b92-6ba4e187c03a",
                    "title": "图标管理",
                    "expand": true,
                    "disabled": false,
                    "disableCheckbox": false,
                    "selected": false,
                    "checked": false,
                    "allAssigned": true,
                    "permissions": [],
                    "children": []
                }]
        },
        {
            "guid": "11cd774b-42d9-4386-af84-c9d86e9bfd3a",
            "parentGuid": "00000000-0000-0000-0000-000000000000",
            "title": "默认路由管理",
            "expand": true,
            "disabled": false,
            "disableCheckbox": false,
            "selected": false,
            "checked": false,
            "allAssigned": true,
            "permissions": [],
            "children": [
                {
                    "guid": "093b5cb0-b518-4cbd-9b2a-ece7b11a3507",
                    "parentGuid": "11cd774b-42d9-4386-af84-c9d86e9bfd3a",
                    "title": "首页",
                    "expand": true,
                    "disabled": false,
                    "disableCheckbox": false,
                    "selected": false,
                    "checked": false,
                    "allAssigned": true,
                    "permissions": [],
                    "children": []
                }, {
                    "guid": "4a0f13f4-5e1b-4035-9fdc-61972a10f9e1",
                    "parentGuid": "11cd774b-42d9-4386-af84-c9d86e9bfd3a",
                    "title": "消息中心",
                    "expand": true,
                    "disabled": false,
                    "disableCheckbox": false,
                    "selected": false,
                    "checked": false,
                    "allAssigned": true,
                    "permissions": [], "children": []
                }, {
                    "guid": "693d91a5-642e-4eaf-9151-acecc7c8be32",
                    "parentGuid": "11cd774b-42d9-4386-af84-c9d86e9bfd3a",
                    "title": "错误页面(401)",
                    "expand": true,
                    "disabled": false,
                    "disableCheckbox": false,
                    "selected": false,
                    "checked": false,
                    "allAssigned": true,
                    "permissions": [], "children": []
                }, {
                    "guid": "f5c4d99e-9552-48a5-a1e5-c13eea256df3",
                    "parentGuid": "11cd774b-42d9-4386-af84-c9d86e9bfd3a",
                    "title": "错误页面(404)",
                    "expand": true,
                    "disabled": false,
                    "disableCheckbox": false,
                    "selected": false,
                    "checked": false,
                    "allAssigned": true, "permissions": [], "children": []
                }, { "guid": "54705ab2-7cfa-48a6-bb84-4e8462e1bae6", "parentGuid": "11cd774b-42d9-4386-af84-c9d86e9bfd3a", "title": "错误页面(500)", "expand": true, "disabled": false, "disableCheckbox": false, "selected": false, "checked": false, "allAssigned": true, "permissions": [], "children": [] }]
        }, {
            "guid": "fa78493c-0aa8-46a3-b373-8d66fdca115c",
            "parentGuid": "00000000-0000-0000-0000-000000000000",
            "title": "工具函数",
            "expand": true,
            "disabled": false,
            "disableCheckbox": false,
            "selected": false,
            "checked": false,
            "allAssigned": true,
            "permissions": [],
            "children": [
                {
                    "guid": "10e1e5ff-c422-4172-a6d4-04c1043cd9fa",
                    "parentGuid": "fa78493c-0aa8-46a3-b373-8d66fdca115c",
                    "title": "菜单管理",
                    "expand": true,
                    "disabled": false,
                    "disableCheckbox": false,
                    "selected": false,
                    "checked": false,
                    "allAssigned": true,
                    "permissions": [
                        { "code": "PNfKDg06", "name": "浏览", "isAssignedToRole": true }],
                    "children": []
                }, {
                    "guid": "aebda189-0bf8-4f4e-8a7b-7324e9f76bed",
                    "parentGuid": "fa78493c-0aa8-46a3-b373-8d66fdca115c",
                    "title": "工具方法",
                    "expand": true,
                    "disabled": false,
                    "disableCheckbox": false,
                    "selected": false,
                    "checked": false,
                    "allAssigned": true,
                    "permissions": [{ "code": "30K14RFe", "name": "查看", "isAssignedToRole": true }],
                    "children": []
                }]
        }],
    "selectedPermissions": ["2EKdG4Ir", "30K14RFe", "73o5I0zh", "7la17061", "GNQ0Ue88", "I2U5lW40", "N76RWAiv", "Nry7I8go", "oe84u0K8", "PNfKDg06", "SEa69deE", "tjJ40v0j", "TS8060OV", "x0Mo9SJX", "y9o5fJVD"]
}
const Mock = require("mockjs");

export const getPermissionList = (req) => {
    req = getParams(req.url);
    var res = Mock.mock({
        'isSuccess': true,
        'message': '',
        'data|20': [{
            "permissionName": '@string',
            "permissionId": "@guid",
            "menuName": '@string',
            "menuGuid": "@guid",
            "actionCode": '@string',
            "status": '@integer(1,2)',
            "createTime": '@date(yyyy-MM-dd hh:mm:ss)',
            "creator": '@string',
            "type": "@integer(1,2)",
            "desc": '@string'
        }],
        'total': 100,
        'timeStamp': req.TimeStamp
    });
    return res;
}

export const deletePermission = (req) => {
    req = getParams(req.url);
    var res = Mock.mock({
        'isSuccess': true,
        'message': '权限删除成功',
        'data': null,
        'timeStamp': req.TimeStamp
    });
    return res;
}

export const changedPermissionStatus = (req) => {
    req = getParams(req.url);
    var res = Mock.mock({
        'isSuccess': true,
        'message': `权限已${req.status === 1 ? "启用" : "禁用"}`,
        'data': null,
        'timeStamp': req.TimeStamp
    });
    return res;
}

export const editPermission = (req) => {
    var res = Mock.mock({
        'isSuccess': '@boolen',
        'message': `权限已保存成功`,
        'data': null,
        'timeStamp': null
    });
    return res;
}

export const getPermissionTree = (req) => {
    req = getParams(req.url);
    var res = Mock.mock({
        'isSuccess': true,
        'message': '',
        'data': permissionTree,
        'timeStamp': req.TimeStamp
    });
    return res;
}