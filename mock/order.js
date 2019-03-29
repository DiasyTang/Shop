import { getParams } from "../src/libs/utils";

const Mock = require("mockjs");

export const getOrderList = (req) => {
    req = getParams(req.url);
    var res = Mock.mock({
        'isSuccess': true,
        'message': '',
        'data|20': [{
            "orderName": '@string',
            "orderId": "@guid",
            "orderPrice": "@integer",
            "status": '@integer(1,2)',
            "orderStart": '@date(yyyy-MM-dd hh:mm:ss)',
            "orderDone": '@string'
        }],
        'total': 100,
        'timeStamp': req.TimeStamp
    });
    return res;
}

export const getOrderListWithOutPaged = (req) => {
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

export const deleteOrder = (req) => {
    req = getParams(req.url);
    var res = Mock.mock({
        'isSuccess': true,
        'message': '订单删除成功',
        'data': null,
        'timeStamp': req.TimeStamp
    });
    return res;
}

export const changedOrderStatus = (req) => {
    req = getParams(req.url);
    var res = Mock.mock({
        'isSuccess': true,
        'message': `订单已${req.status === 1 ? "启用" : "禁用"}`,
        'data': null,
        'timeStamp': req.TimeStamp
    });
    return res;
}

export const editOrder = (req) => {
    var res = Mock.mock({
        'isSuccess': '@boolen',
        'message': `订单已保存成功`,
        'data': null,
        'timeStamp': null
    });
    return res;
}