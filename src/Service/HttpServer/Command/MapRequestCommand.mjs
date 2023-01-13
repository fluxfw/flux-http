import { Readable } from "node:stream";
import { HEADER_COOKIE, HEADER_HOST } from "../../../Adapter/Header/HEADER.mjs";
import { METHOD_GET, METHOD_HEAD } from "../../../Adapter/Method/METHOD.mjs";

/** @typedef {import("node:http")} http */
/** @typedef {import("../../../Adapter/Request/HttpServerRequest.mjs").HttpServerRequest} HttpServerRequest */
/** @typedef {import("node:http").IncomingMessage} IncomingMessage */
/** @typedef {import("node:http").ServerResponse} ServerResponse */

export class MapRequestCommand {
    /**
     * @returns {MapRequestCommand}
     */
    static new() {
        return new this();
    }

    /**
     * @private
     */
    constructor() {

    }

    /**
     * @param {IncomingMessage} req
     * @param {ServerResponse} res
     * @returns {Promise<HttpServerRequest | null>}
     */
    async mapRequest(req, res) {
        try {
            const { method } = req;

            const headers = new Headers(req.headers);

            const url = new URL(req.url, `${req.socket.encrypted ? "https" : "http"}://${headers.get(HEADER_HOST) ?? "host"}`);

            const request = new Request(`${url}`, {
                method,
                headers,
                ...method !== METHOD_GET && method !== METHOD_HEAD ? {
                    body: Readable.toWeb(req),
                    duplex: "half"
                } : {}
            });

            request._urlObject = url;

            request._urlPathParts = url.pathname.substring(1).split("/");

            request._cookies = headers.get(HEADER_COOKIE)?.split(";")?.reduce((cookies, cookie) => {
                const [
                    key,
                    ...value
                ] = cookie.split("=");

                cookies[key.trim()] = value.join("=").trim();

                return cookies;
            }, {}) ?? {};

            request._res = res;

            return request;
        } catch (error) {
            console.error(error);

            return null;
        }
    }
}
