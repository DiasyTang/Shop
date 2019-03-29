import { getParams } from "../src/libs/utils";

const Mock = require("mockjs");

const tree = {
    "isSuccess": true,
    "responseCode": 200,
    "message": "",
    "timeStamp": 0,
    "data": [
        {
            "guid": "00000000-0000-0000-0000-000000000000",
            "parentGuid": null,
            "title": "顶级菜单",
            "expand": true,
            "disabled": false,
            "disableCheckbox": false,
            "selected": false,
            "checked": false,
            "children": [
                {
                    "guid": "71a53fa6-c271-4834-9b92-6ba4e187c03a",
                    "parentGuid": "00000000-0000-0000-0000-000000000000",
                    "title": "用户权限管理",
                    "expand": true,
                    "disabled": false,
                    "disableCheckbox": false,
                    "selected": false,
                    "checked": false,
                    "children": [{ "guid": "10e1e5ff-c422-4172-a6d4-04c1043cd9fa", "parentGuid": "71a53fa6-c271-4834-9b92-6ba4e187c03a", "title": "菜单管理", "expand": false, "disabled": false, "disableCheckbox": false, "selected": false, "checked": false, "children": [] }, { "guid": "6f5b8aae-0385-4686-9daf-1c67914d8191", "parentGuid": "71a53fa6-c271-4834-9b92-6ba4e187c03a", "title": "角色管理", "expand": false, "disabled": false, "disableCheckbox": false, "selected": false, "checked": false, "children": [] }, { "guid": "fb49cf5f-6161-4f41-9f3c-2e9bc4c7b1bb", "parentGuid": "71a53fa6-c271-4834-9b92-6ba4e187c03a", "title": "图标管理", "expand": false, "disabled": false, "disableCheckbox": false, "selected": false, "checked": false, "children": [] }, { "guid": "335df74f-1944-47c0-af45-421e2108aa71", "parentGuid": "71a53fa6-c271-4834-9b92-6ba4e187c03a", "title": "角色权限分配", "expand": false, "disabled": false, "disableCheckbox": false, "selected": false, "checked": false, "children": [] }, { "guid": "09db3972-7bbc-44b8-b022-6c8b8bdd9d54", "parentGuid": "71a53fa6-c271-4834-9b92-6ba4e187c03a", "title": "权限管理", "expand": false, "disabled": false, "disableCheckbox": false, "selected": false, "checked": false, "children": [] }, { "guid": "2f458429-3976-408f-8a4f-aacbfe7d82cc", "parentGuid": "71a53fa6-c271-4834-9b92-6ba4e187c03a", "title": "用户管理", "expand": false, "disabled": false, "disableCheckbox": false, "selected": false, "checked": false, "children": [] }]
                },
                {
                    "guid": "fa78493c-0aa8-46a3-b373-8d66fdca115c",
                    "parentGuid": "00000000-0000-0000-0000-000000000000",
                    "title": "工具函数",
                    "expand": true,
                    "disabled": false,
                    "disableCheckbox": false,
                    "selected": false,
                    "checked": false,
                    "children": [{ "guid": "aebda189-0bf8-4f4e-8a7b-7324e9f76bed", "parentGuid": "fa78493c-0aa8-46a3-b373-8d66fdca115c", "title": "工具方法", "expand": false, "disabled": false, "disableCheckbox": false, "selected": false, "checked": false, "children": [] }]
                },
                {
                    "guid": "a99f7de6-94bc-4df1-87d9-a1a6d117b653",
                    "parentGuid": "00000000-0000-0000-0000-000000000000",
                    "title": "系统管理",
                    "expand": true,
                    "disabled": false,
                    "disableCheckbox": false,
                    "selected": false,
                    "checked": false,
                    "children": [{ "guid": "793e0f5d-0846-46de-968d-5e59d919b153", "parentGuid": "a99f7de6-94bc-4df1-87d9-a1a6d117b653", "title": "系统设置", "expand": false, "disabled": false, "disableCheckbox": false, "selected": false, "checked": false, "children": [] }]
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
                    "children": [{ "guid": "54705ab2-7cfa-48a6-bb84-4e8462e1bae6", "parentGuid": "11cd774b-42d9-4386-af84-c9d86e9bfd3a", "title": "错误页面(500)", "expand": false, "disabled": false, "disableCheckbox": false, "selected": false, "checked": false, "children": [] }, { "guid": "4a0f13f4-5e1b-4035-9fdc-61972a10f9e1", "parentGuid": "11cd774b-42d9-4386-af84-c9d86e9bfd3a", "title": "消息中心", "expand": false, "disabled": false, "disableCheckbox": false, "selected": false, "checked": false, "children": [] }, { "guid": "693d91a5-642e-4eaf-9151-acecc7c8be32", "parentGuid": "11cd774b-42d9-4386-af84-c9d86e9bfd3a", "title": "错误页面(401)", "expand": false, "disabled": false, "disableCheckbox": false, "selected": false, "checked": false, "children": [] }, { "guid": "f5c4d99e-9552-48a5-a1e5-c13eea256df3", "parentGuid": "11cd774b-42d9-4386-af84-c9d86e9bfd3a", "title": "错误页面(404)", "expand": false, "disabled": false, "disableCheckbox": false, "selected": false, "checked": false, "children": [] }, { "guid": "093b5cb0-b518-4cbd-9b2a-ece7b11a3507", "parentGuid": "11cd774b-42d9-4386-af84-c9d86e9bfd3a", "title": "首页", "expand": false, "disabled": false, "disableCheckbox": false, "selected": false, "checked": false, "children": [] }]
                }]
        }]
}
export const getMenuTree = req => {
    req = getParams(req.url);
    tree.timeStamp = req.TimeStamp;
    return tree;
}

export const getMenuList = (req) => {
    req = getParams(req.url);
    var res = Mock.mock({
        'isSuccess': true,
        'message': '',
        'data|20': [{
            "menuName": '@string',
            "menuId": "@guid",
            "requestUrl": '@string',
            "parentMenuId": "@guid",
            "parentMenuName": "@string",
            "menuAlias": '@string',
            "status": '@integer(1,2)',
            "createTime": '@date(yyyy-MM-dd hh:mm:ss)',
            "creator": '@string',
            "defaultRouter": "@integer(1,2)",
            "desc": '@string'
        }],
        'total': 100,
        'timeStamp': req.TimeStamp
    });
    return res;
}

export const deleteMenu = (req) => {
    req = getParams(req.url);
    var res = Mock.mock({
        'isSuccess': true,
        'message': '权限删除成功',
        'data': null,
        'timeStamp': req.TimeStamp
    });
    return res;
}

export const changedMenuStatus = (req) => {
    req = getParams(req.url);
    var res = Mock.mock({
        'isSuccess': true,
        'message': `权限已${req.status === 1 ? "启用" : "禁用"}`,
        'data': null,
        'timeStamp': req.TimeStamp
    });
    return res;
}

export const editMenu = (req) => {
    var res = Mock.mock({
        'isSuccess': '@boolean',
        'message': `菜单已保存成功`,
        'data': null,
        'timeStamp': null
    });
    return res;
}