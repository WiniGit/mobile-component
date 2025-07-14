"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountController = exports.SettingDataController = exports.DataController = void 0;
const config_1 = require("./config");
const utils_1 = require("./utils");
class DataController {
    module;
    constructor(module) {
        this.module = module;
    }
    async getAll() {
        const res = await config_1.BaseDA.get(config_1.ConfigData.url + 'data/getAll', {
            headers: {
                pid: config_1.ConfigData.pid,
                module: this.module,
            },
        });
        return res;
    }
    async getProperties() {
        const res = await config_1.BaseDA.get(config_1.ConfigData.url + `setting/getProperties?name=${this.module}`, {
            headers: {
                pid: config_1.ConfigData.pid,
                module: 'column'
            }
        });
        return res;
    }
    async aggregateList(options) {
        const res = await config_1.BaseDA.post(config_1.ConfigData.url + 'data/aggregateList', {
            headers: {
                pid: config_1.ConfigData.pid,
                module: this.module,
            },
            body: options
        });
        return res;
    }
    async filterByEmptyKey(options) {
        const res = await config_1.BaseDA.post(config_1.ConfigData.url + 'data/filterByEmptyKey', {
            headers: {
                pid: config_1.ConfigData.pid,
                module: this.module,
            },
            body: options
        });
        return res;
    }
    async patternList(options) {
        const res = await config_1.BaseDA.post(config_1.ConfigData.url + 'data/patternList', {
            headers: {
                pid: config_1.ConfigData.pid,
                module: this.module,
            },
            body: options
        });
        return res;
    }
    async group(options) {
        const res = await config_1.BaseDA.post(config_1.ConfigData.url + 'data/group', {
            headers: {
                pid: config_1.ConfigData.pid,
                module: this.module,
            },
            body: options
        });
        return res;
    }
    async getListSimple(options) {
        const body = { ...options, searchRaw: options?.query?.length ? options?.query : "*" };
        delete body.query;
        const res = await config_1.BaseDA.post(config_1.ConfigData.url + 'data/getListSimple', {
            headers: {
                pid: config_1.ConfigData.pid,
                module: this.module,
            },
            body: body
        });
        return res;
    }
    async getById(id) {
        const res = await config_1.BaseDA.post(config_1.ConfigData.url + `data/getById?id=${id}`, {
            headers: {
                pid: config_1.ConfigData.pid,
                module: this.module,
            },
        });
        return res;
    }
    async getByListId(ids) {
        const res = await config_1.BaseDA.post(config_1.ConfigData.url + 'data/getByIds', {
            headers: {
                pid: config_1.ConfigData.pid,
                module: this.module,
            },
            body: { ids: ids }
        });
        return res;
    }
    async add(data) {
        const res = await config_1.BaseDA.post(config_1.ConfigData.url + 'data/action?action=add', {
            headers: {
                pid: config_1.ConfigData.pid,
                module: this.module
            },
            body: { data: data }
        });
        return res;
    }
    async edit(data) {
        const res = await config_1.BaseDA.post(config_1.ConfigData.url + 'data/action?action=edit', {
            headers: {
                pid: config_1.ConfigData.pid,
                module: this.module
            },
            body: { data: data }
        });
        return res;
    }
    async duplicate(ids) {
        const res = await config_1.BaseDA.post(config_1.ConfigData.url + 'data/action?action=duplicate', {
            headers: {
                pid: config_1.ConfigData.pid,
                module: this.module
            },
            body: { ids: ids }
        });
        return res;
    }
    async delete(ids) {
        const res = await config_1.BaseDA.post(config_1.ConfigData.url + 'data/action?action=delete', {
            headers: {
                pid: config_1.ConfigData.pid,
                module: this.module
            },
            body: { ids: ids }
        });
        return res;
    }
    async checkotp(idToken) {
        const res = await config_1.BaseDA.post(config_1.ConfigData.url + 'data/checkotp', {
            body: { idToken: idToken }
        });
        return res;
    }
}
exports.DataController = DataController;
class SettingDataController {
    setting;
    constructor(setting) {
        this.setting = setting;
    }
    async action(action, options) {
        const res = await config_1.BaseDA.post(config_1.ConfigData.url + `data/${this.setting}/action?action=${action}`, {
            headers: { pid: config_1.ConfigData.pid },
            body: { data: options.data, ids: options.ids }
        });
        return res;
    }
    async getListSimple(options) {
        const res = await config_1.BaseDA.post(config_1.ConfigData.url + `data/${this.setting}/getListSimple`, {
            headers: { pid: config_1.ConfigData.pid },
            body: { searchRaw: options?.query?.length ? options?.query : "*", page: options?.page, size: options?.size, returns: options?.returns, sortby: options?.sortby }
        });
        return res;
    }
    async getByIds(ids) {
        const res = await config_1.BaseDA.post(config_1.ConfigData.url + `data/${this.setting}/getByIds`, {
            headers: { pid: config_1.ConfigData.pid },
            body: { ids: ids }
        });
        return res;
    }
    static async searchSetting(options) {
        const res = await config_1.BaseDA.post(config_1.ConfigData.url + `data/getListSimple`, {
            body: { searchRaw: options?.query?.length ? options?.query : "*", page: options?.page ?? 1, size: options?.size ?? 10, returns: options?.returns, sortby: options?.sortby }
        });
        return res;
    }
}
exports.SettingDataController = SettingDataController;
class AccountController {
    module;
    constructor(module) {
        this.module = module ?? "Customer";
    }
    async login(body, resolve) {
        const res = await config_1.BaseDA.post(config_1.ConfigData.url + 'data/login', {
            headers: { module: this.module, pid: config_1.ConfigData.pid },
            body: body
        });
        if (res.code === 200 && !resolve) {
            const setStorageList = Object.keys(res.data).map(key => ({ key: key, value: res.data[key] }));
            setStorageList.push({ key: "timeRefresh", value: Date.now() / 1000 + 9 * 60 });
            await utils_1.Util.setStorage(setStorageList);
        }
        return res;
    }
    async getInfor() {
        const res = await config_1.BaseDA.get(config_1.ConfigData.url + 'data/getInfo', {
            headers: { module: this.module, pid: config_1.ConfigData.pid },
        });
        return res;
    }
    async checkPassword(body) {
        const res = await config_1.BaseDA.post(config_1.ConfigData.url + 'data/checkPassword', {
            headers: { module: this.module, pid: config_1.ConfigData.pid },
            body: body
        });
        return res;
    }
    async hashPassword(password) {
        const res = await config_1.BaseDA.get(config_1.ConfigData.url + `data/bcrypt?password=${password}`);
        return res;
    }
}
exports.AccountController = AccountController;
