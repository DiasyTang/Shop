import { getParams } from "../src/libs/utils";

const USER_MAP = [
    {
        name: 'super_admin',
        userId: '1',
        access: ['super_admin', 'admin', "seller", "customer"],
        token: 'super_admin',
        avator: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png'
    },
    {
        name: 'admin',
        userId: '2',
        access: ['admin', "seller", "customer"],
        token: 'admin',
        avator: 'https://avatars0.githubusercontent.com/u/20942571?s=460&v=4'
    },
    {
        name: 'seller',
        userId: '3',
        access: ["seller"],
        token: 'seller',
        avator: 'https://avatars0.githubusercontent.com/u/20942571?s=460&v=4'
    },
    {
        name: 'customer',
        userId: '4',
        access: ['customer'],
        token: 'customer',
        avator: 'https://avatars0.githubusercontent.com/u/20942571?s=460&v=4'
    }
];

const USER_PROFILE = {
    accessPages: ["home",
        "mystation",
        "sys_setting",
        "sys_permission",
        "sys_menu",
        "sys_user",
        "sys_role-permission",
        "business",
        "business_good",
        "business_order",
        "sys_role"],
    accessCodes: ["111", "222"]
};

export const login = req => {
    req = getParams(req.url);
    var user = USER_MAP.find(q => q.name == req.username);
    if (user) {
        return {
            isSuccess: true, data: {
                token: user.token,
                accessCodes: ["111", "222"]
            }, responseCode: 5200, message: ""
        };
    }
    else {
        return { isSuccess: false, data: null, responseCode: 5200, message: "用户不存在" };
    }
}

export const getUserInfo = req => {
    return { isSuccess: true, data: USER_PROFILE, responseCode: 5200, message: "" };;
}

export const logout = req => {
    return null
}
