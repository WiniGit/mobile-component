"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WiniController = exports.TableController = void 0;
const config_1 = require("./config");
class TableController {
    module;
    constructor(module) {
        this.module = module;
    }
    async getAll() {
        const res = await config_1.BaseDA.get(config_1.ConfigData.url + 'setting/getAll', {
            headers: {
                pid: config_1.ConfigData.pid,
                module: this.module,
            },
        });
        return res;
    }
    async getByListId(ids) {
        const res = await config_1.BaseDA.post(config_1.ConfigData.url + 'setting/getByIds', {
            headers: {
                pid: config_1.ConfigData.pid,
                module: this.module,
            },
            body: { ids: ids }
        });
        return res;
    }
    async getListSimple(options) {
        const res = await config_1.BaseDA.post(config_1.ConfigData.url + 'setting/getListSimple', {
            headers: {
                pid: config_1.ConfigData.pid,
                module: this.module,
            },
            body: { searchRaw: options?.query ?? "*", page: options?.page ?? 1, size: options?.size ?? 10, returns: options?.returns, sortby: options?.sortby }
        });
        return res;
    }
    async group(options) {
        const res = await config_1.BaseDA.post(config_1.ConfigData.url + 'setting/group', {
            headers: {
                pid: config_1.ConfigData.pid,
                module: this.module,
            },
            body: options
        });
        return res;
    }
    async add(data) {
        const res = await config_1.BaseDA.post(config_1.ConfigData.url + 'setting/action?action=add', {
            headers: {
                pid: config_1.ConfigData.pid,
                module: this.module
            },
            body: { data: data }
        });
        return res;
    }
    async edit(data) {
        const res = await config_1.BaseDA.post(config_1.ConfigData.url + 'setting/action?action=edit', {
            headers: {
                pid: config_1.ConfigData.pid,
                module: this.module
            },
            body: { data: data }
        });
        return res;
    }
    async delete(ids) {
        const res = await config_1.BaseDA.post(config_1.ConfigData.url + 'setting/action?action=delete', {
            headers: {
                pid: config_1.ConfigData.pid,
                module: this.module
            },
            body: { ids: ids }
        });
        return res;
    }
}
exports.TableController = TableController;
class WiniController {
    module;
    constructor(module) {
        this.module = module;
    }
    login = async (props) => {
        const res = await config_1.BaseDA.post(config_1.ConfigData.url + 'wini/login', {
            headers: { module: 'Customer' },
            body: props
        });
        return res;
    };
    loginGoogle = async (code, ggClientId, ggClientSecret) => {
        const res = await config_1.BaseDA.post(config_1.ConfigData.url + 'wini/login', {
            headers: { module: 'Customer' },
            body: { type: "google", token: code, ggClientId, ggClientSecret }
        });
        return res;
    };
    getInfor = async () => {
        const res = await config_1.BaseDA.get(config_1.ConfigData.url + 'wini/getCustomerInfor', {
            headers: { module: 'Customer' },
        });
        return res;
    };
    async getAll() {
        const res = await config_1.BaseDA.get(config_1.ConfigData.url + 'wini/getAll', {
            headers: { module: this.module }
        });
        return res;
    }
    async getListSimple(options) {
        const res = await config_1.BaseDA.post(config_1.ConfigData.url + 'wini/getListSimple', {
            headers: { module: this.module },
            body: { searchRaw: options?.query ?? "*", page: options?.page ?? 1, size: options?.size ?? 10, returns: options?.returns, sortby: options?.sortby }
        });
        return res;
    }
    async group(options) {
        const res = await config_1.BaseDA.post(config_1.ConfigData.url + 'wini/group', {
            headers: { module: this.module },
            body: options
        });
        return res;
    }
    async add(data) {
        const res = await config_1.BaseDA.post(config_1.ConfigData.url + 'wini/action?action=add', {
            headers: { module: this.module },
            body: { data: data }
        });
        return res;
    }
    async edit(data) {
        const res = await config_1.BaseDA.post(config_1.ConfigData.url + 'wini/action?action=edit', {
            headers: { module: this.module },
            body: { data: data }
        });
        return res;
    }
    async delete(ids) {
        const res = await config_1.BaseDA.post(config_1.ConfigData.url + 'wini/action?action=delete', {
            headers: { module: this.module },
            body: { ids: ids }
        });
        return res;
    }
    async getByIds(ids) {
        const res = await config_1.BaseDA.post(config_1.ConfigData.url + 'wini/getByIds', {
            headers: { module: this.module },
            body: { ids: ids }
        });
        return res;
    }
}
exports.WiniController = WiniController;
