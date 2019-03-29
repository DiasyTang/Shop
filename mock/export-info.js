import { getParams } from "../src/libs/utils";

const Mock = require("mockjs");

export const exportInfo = (req) => {
    req = getParams(req.url);
    var res = Mock.mock({
        'isSuccess': true,
        'message': '',
        'data|20': [{
            "value": "@string",
            "label": "@string"
        }],
        'total': 100,
        'timeStamp': req.TimeStamp
    });
    return res;
}
