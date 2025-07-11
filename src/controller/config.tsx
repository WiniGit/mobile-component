import axios from 'axios';
import { Util } from "./utils";
import { showSnackbar } from '../component/snackbar/snackbar';
import { ComponentStatus } from '../component/component-status';

export class ConfigData {
    static pid = ""
    static url = ""
    static fileUrl = "";
    static imgUrlId = "";
    static extraPlugins = undefined;
    static onInvalidToken = () => Util.clearStorage();
}

let tmpTimeRefresh: number;
export let globalNavigate = (url: string, options?: { replace?: boolean }) => { }

const getHeaders = async () => {
    let timeRefresh: any = tmpTimeRefresh ?? (await Util.getStorage("timeRefresh"))
    if (typeof timeRefresh === "string") timeRefresh = parseInt(timeRefresh)
    tmpTimeRefresh = timeRefresh
    const now = Date.now() / 1000;
    if (timeRefresh && timeRefresh > 0 && timeRefresh <= now) {
        const res = await fetch(ConfigData.url + 'data/refreshToken', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'refreshToken': Util.getCookie("refreshToken") }),
        })
        if (res.status === 200 || res.status === 201) {
            const jsonData = await res.json()
            if (jsonData.code === 200) {
                tmpTimeRefresh = Date.now() / 1000 + 9 * 60
                Util.setStorage([
                    { key: "accessToken", value: jsonData.accessToken },
                    { key: "timeRefresh", value: tmpTimeRefresh },
                ])
                return {
                    'refreshToken': Util.getCookie("refreshToken"),
                    'Authorization': `Bearer ${Util.getCookie("accessToken")}`,
                    'Content-Type': 'application/json'
                }
            }
        }
        ConfigData.onInvalidToken()
        globalNavigate("/login", { replace: true })
        window.location.replace("/login")
    } else if (Util.getCookie("accessToken")) {
        return {
            'Authorization': `Bearer ${Util.getCookie("accessToken")}`,
            'Content-Type': 'application/json'
        }
    }
    return { 'Content-Type': 'application/json' }
}

export const imgFileTypes = [".png", ".svg", ".jpg", "jpeg", ".webp", ".gif"]

export class BaseDA {
    static post = async (url: string, options?: { headers?: { [k: string]: any }, body?: any }) => {
        try {
            let _headers: { [k: string]: any } = url.startsWith(ConfigData.url) ? (await getHeaders()) : { 'Content-Type': 'application/json' }
            if (!_headers) _headers = { 'Content-Type': 'application/json' }
            if (options?.headers) _headers = { ..._headers, ...options.headers }
            const response = await axios.post(url, options?.body, { headers: _headers })
            if (response.status === 200 || response.status === 201) {
                return response.data
            } else if (response.status === 204) {
                return {
                    message: 'ok',
                    data: options?.body
                }
            } else if (response.status === 401) {
                showSnackbar({ message: 'Unauthorized access', status: ComponentStatus.ERROR })
                window.location.replace('/login')
            } else {
                console.log("error: ??: ", response.statusText)
                return { status: response.status, message: response.statusText };
            }
        } catch (error) {
            showSnackbar({ message: error?.toString(), status: ComponentStatus.ERROR })
            throw error;
        }
    }

    static postFile = async (url: string, options?: { headers?: { [k: string]: any }, body?: FormData }) => {
        try {
            if (options?.headers) {
                options.headers["Content-Type"] = "multipart/form-data"
            }
            const response = await axios.post(url, options?.body, { headers: options?.headers ?? { "Content-Type": "multipart/form-data" } })
            if (response.status === 200 || response.status === 201) {
                return response.data
            } else if (response.status === 204) {
                return {
                    message: 'ok',
                    data: options?.body
                }
            } else if (response.status === 401) {
                showSnackbar({ message: 'Unauthorized access', status: ComponentStatus.ERROR })
                window.location.replace('/login')
            } else {
                console.log("error: ??: ", response.statusText)
                return { status: response.status, message: response.statusText };
            }
        } catch (error) {
            console.error("Failed to POST data:", error);
            throw error;
        }
    }

    static get = async (url: string, options?: { headers?: { [k: string]: any } }) => {
        try {
            let _headers: { [k: string]: any } = url.startsWith(ConfigData.url) ? (await getHeaders()) : { 'Content-Type': 'application/json' }
            if (!_headers) _headers = { 'Content-Type': 'application/json' }
            if (options?.headers) _headers = { ..._headers, ...options.headers }
            const response = await axios.get(url, { headers: _headers })
            if (response.status === 200 || response.status === 201) {
                return response.data
            } else if (response.status === 204) {
                return {
                    message: 'ok',
                    // data: options?.body
                }
            } else if (response.status === 401) {
                showSnackbar({ message: 'Unauthorized access', status: ComponentStatus.ERROR })
                window.location.replace('/login')
            } else {
                console.log("error: ??: ", response.statusText)
                return { status: response.status, message: response.statusText };
            }
        } catch (error) {
            console.error("Failed to GET data:", error);
            throw error;
        }
    }

    static uploadFiles = async (listFile: Array<File>) => {
        listFile = [...listFile];
        // const headersObj: any = await getHeaders()
        const headersObj: any = { pid: ConfigData.pid }
        const formData = new FormData();
        listFile.forEach(e => {
            formData.append("files", e);
        })
        const response = await BaseDA.postFile(ConfigData.url + 'file/uploadfiles', {
            headers: headersObj,
            body: formData,
        })
        if (response.code === 200) {
            return response.data
        } else {
            showSnackbar({ message: response.message, status: ComponentStatus.ERROR })
        }
        return null;
    }

    static getFilesInfor = async (ids: Array<string>) => {
        const headersObj: any = {}
        const response = await BaseDA.post(ConfigData.url + 'file/getFilesInfor', {
            headers: headersObj,
            body: { ids: ids },
        })
        return response
    }

    static updateFilesInfor = async (data: Array<{ [p: string]: any }>) => {
        const headersObj: any = {}
        const response = await BaseDA.post(ConfigData.url + 'file/editFileInfor', {
            headers: headersObj,
            body: { data: data },
        })
        return response
    }
}