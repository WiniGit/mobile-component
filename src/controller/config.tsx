import axios from 'axios';
import { Util } from "./utils";
import { showSnackbar } from '../component/snackbar/snackbar';
import { ComponentStatus } from '../component/component-status';

export class ConfigData {
    static pid = ""
    static url = ""
    static fileUrl = "";
    static imgUrlId = "";
    static onInvalidToken = () => {
        Util.clearStorage()
    };
    static regexGuid = /^[0-9a-fA-F]{32}$/;
    static ebigCdn = "https://cdn.ebig.co"
    static globalHeaders: () => Promise<{ [k: string]: any }> = async () => {
        return { 'Content-Type': 'application/json' }
    }
}

export const imgFileTypes = [".png", ".svg", ".jpg", "jpeg", ".webp", ".gif"]
const maxFileSize = 200 * 1024 * 1024

export const getValidLink = (link: string) => {
    if (link.startsWith("http")) return link
    if (ConfigData.regexGuid.test(link)) return ConfigData.imgUrlId + link
    else return ConfigData.fileUrl + link
}

export class BaseDA {
    static post = async (url: string, options?: { headers?: { [k: string]: any }, body?: any }) => {
        try {
            let _headers: { [k: string]: any } = url.startsWith(ConfigData.url) ? (await ConfigData.globalHeaders()) : { 'Content-Type': 'application/json' }
            if (!_headers) _headers = { 'Content-Type': 'application/json', 'platform': 'mobile' }
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
                ConfigData.onInvalidToken()
            } else {
                console.log("error: ??: ", response.statusText)
                return { status: response.status, message: response.statusText };
            }
        } catch (error) {
            showSnackbar({ message: `${error}`, status: ComponentStatus.ERROR })
            throw error;
        }
    }

    static postFile = async (url: string, options?: { headers?: { [k: string]: any }, body?: FormData }) => {
        try {
            const _headers = { ...options?.headers, "Content-Type": "multipart/form-data", 'platform': 'mobile' }
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
                ConfigData.onInvalidToken()
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
            let _headers: { [k: string]: any } = url.startsWith(ConfigData.url) ? (await ConfigData.globalHeaders()) : { 'Content-Type': 'application/json' }
            _headers = { ...options?.headers, ..._headers, 'Content-Type': 'application/json', 'platform': 'mobile' }
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
                ConfigData.onInvalidToken()
            } else {
                console.log("error: ??: ", response.statusText)
                return { status: response.status, message: response.statusText };
            }
        } catch (error) {
            console.error("Failed to GET data:", error);
            throw error;
        }
    }

    static uploadFiles = async (listFile: { uri: string; type: string; name: string }[] | { id: string; file: { uri: string; type: string; name: string } }[]) => {
        listFile = [...listFile] as any
        const files = listFile.map((e: any) => e.id && e.file ? e.file : e).filter(Boolean);
        const ids = listFile.map((e: any) => e.id && e.file ? e.id : null).filter(Boolean);

        const headersObj: any = { pid: ConfigData.pid }
        // Remove Content-Type - browser will set it with boundary for multipart

        const listRequest: Array<{ files: File[], ids: string[] }> = [{ files: [], ids: [] }]

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const id = ids[i] || null;

            if (file.size > maxFileSize) {
                showSnackbar({ message: 'File size must be not more than 200MB', status: ComponentStatus.ERROR })
                return null
            } else {
                const tmp = listRequest[listRequest.length - 1];
                const totalSize = [...tmp.files, file].map(f => f.size).reduce((a, b) => a + b, 0);

                // Check if need to create new batch
                if (tmp.files.length >= 12 || totalSize > maxFileSize) {
                    listRequest.push({ files: [file], ids: id ? [id] : [] })
                } else {
                    tmp.files.push(file);
                    if (id) tmp.ids.push(id);
                }
            }
        }

        const response = await Promise.all(listRequest.map(rq => {
            const formData = new FormData();
            rq.files.forEach(e => {
                formData.append("files", e);
            })
            // Add IDs if provided
            if (rq.ids.length > 0) {
                formData.append("ids", rq.ids.join(","));
            }
            return BaseDA.postFile(ConfigData.url + 'file/uploadfiles', {
                headers: headersObj,
                body: formData,
            })
        }))
        return response;
    }

    static getFilesInfor = async (ids: Array<string>) => {
        const response = await BaseDA.post(ConfigData.url + 'file/getFilesInfor', {
            headers: { pid: ConfigData.pid, 'Content-Type': 'application/json' },
            body: { ids },
        })
        return response
    }

    static updateFilesInfor = async (data: Array<{ [p: string]: any }>) => {
        const response = await BaseDA.post(ConfigData.url + 'file/editFileInfor', {
            headers: { pid: ConfigData.pid, 'Content-Type': 'application/json', 'platform': 'mobile' },
            body: { data },
        })
        return response
    }

    static deleteFiles = async (ids: Array<string>, headers?: { [k: string]: any }) => {
        const headersObj: any = { ...headers, "Content-Type": "application/json", pid: ConfigData.pid, 'platform': 'mobile' }
        const response = await BaseDA.post(ConfigData.url + 'file/deleteFiles', {
            headers: headersObj,
            body: { ids },
        })
        return response
    }

    static duplicateFiles = async (ids: Array<string>, headers?: { [k: string]: any }) => {
        const headersObj: any = { ...headers, "Content-Type": "application/json", pid: ConfigData.pid, 'platform': 'mobile' }

        const response = await BaseDA.post(ConfigData.url + 'file/duplicateFiles', {
            headers: headersObj,
            body: { ids },
        })
        return response
    }
}