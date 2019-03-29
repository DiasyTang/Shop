import { getParams } from "../src/libs/utils";

const Mock = require("mockjs");

export const getGoodList = (req) => {
    req = getParams(req.url);
    var res = Mock.mock({
        'isSuccess': true,
        'message': '',
        'data|20': [{
            "goodName": '@string',
            "goodImage": '../../assets/logo.png',
            "goodId": "@guid",
            "rest": '@integer',
            "count": "@integer",
            "status": '@integer(1,2)',
            "putOn": '@date(yyyy-MM-dd hh:mm:ss)',
            "putOff": '@date(yyyy-MM-dd hh:mm:ss)',
            "seller": '@string',
            "desc": '@string'
        }],
        'total': 100,
        'timeStamp': req.TimeStamp
    });
    return res;
}

export const deleteGood = (req) => {
    var res = Mock.mock({
        'isSuccess': true,
        'message': '商品删除成功',
        'data': null,
        'timeStamp': null
    });
    return res;
}

export const changedGoodStatus = (req) => {
    req = getParams(req.url);
    var res = Mock.mock({
        'isSuccess': true,
        'message': `商品已${req.status === "1" ? "上架" : "下架"}`,
        'data': null,
        'timeStamp': req.TimeStamp
    });
    return res;
}

export const editGood = (req) => {
    var res = Mock.mock({
        'isSuccess': '@boolen',
        'message': `商品已保存成功`,
        'data': "@guid",
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