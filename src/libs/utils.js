export const getParams = url => {
    const keyValueArr = url.split('?')[1].split('&')
    let paramObj = {}
    keyValueArr.forEach(item => {
        const keyValue = item.split('=')
        paramObj[keyValue[0]] = keyValue[1]
    })
    return paramObj
}


export function getMenuByRouter(router, pages = []) {
    let res = [];
    for (var item of router) {
        if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
            let obj = {
                name: item.name,
                meta: item.meta,
                path: item.path,
            };
            if ((item.children && item.children.length > 0) || (item.meta && item.meta.showAlways)) {
                obj.children = getMenuByRouter(item.children, pages);
            }
            if (item.meta && item.meta.href) obj.href = item.meta.href;
            if (pages && pages.indexOf(obj.name) > -1) {
                res.push(obj);
            }
        }
    }
    return res;
}

export function hasPermission(value = '') {
    if (!value) {
        return false;
    }
    let buttonpermsStr = sessionStorage.getItem("accessCodes");
    if (!buttonpermsStr) {
        return false;
    }
    return buttonpermsStr.split(',').includes(value.trim());
};