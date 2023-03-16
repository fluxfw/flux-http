import { createServer as createServerHttp } from "node:http";
import { createServer as createServerHttps } from "node:https";
import { HEADER_REFERRER_POLICY } from "../../Header/HEADER.mjs";
import { HttpServerResponse } from "../HttpServerResponse.mjs";
import { PROTOCOL_HTTPS } from "../../Protocol/PROTOCOL.mjs";
import { REFERRER_POLICY_NO_REFERRER } from "../../Referrer/REFERRER_POLICY.mjs";
import { SERVER_DEFAULT_FORWARDED_HEADERS, SERVER_DEFAULT_LISTEN_HTTP_PORT, SERVER_DEFAULT_LISTEN_HTTPS_PORT, SERVER_DEFAULT_NO_DATE, SERVER_DEFAULT_NO_REFERRER, SERVER_DEFAULT_REDIRECT_HTTP_TO_HTTPS, SERVER_DEFAULT_REDIRECT_HTTP_TO_HTTPS_PORT, SERVER_DEFAULT_REDIRECT_HTTP_TO_HTTPS_STATUS_CODE, SERVER_LISTEN_HTTP_PORT_DISABLED, SERVER_LISTEN_HTTPS_PORT_DISABLED } from "../SERVER.mjs";
import { STATUS_CODE_400, STATUS_CODE_404, STATUS_CODE_500 } from "../../Status/STATUS_CODE.mjs";

/** @typedef {import("../../../../flux-shutdown-handler/src/FluxShutdownHandler.mjs").FluxShutdownHandler} FluxShutdownHandler */
/** @typedef {import("../handleRequest.mjs").handleRequest} handleRequest */
/** @typedef {import("node:http").IncomingMessage} IncomingMessage */
/** @typedef {import("../_Server.mjs").Server} Server */
/** @typedef {import("node:http").ServerResponse} ServerResponse */
/** @typedef {import("../Port/ServerService.mjs").ServerService} ServerService */

export class RunServerCommand {
    /**
     * @type {FluxShutdownHandler}
     */
    #flux_shutdown_handler;
    /**
     * @type {ServerService}
     */
    #server_service;

    /**
     * @param {FluxShutdownHandler} flux_shutdown_handler
     * @param {ServerService} server_service
     * @returns {RunServerCommand}
     */
    static new(flux_shutdown_handler, server_service) {
        return new this(
            flux_shutdown_handler,
            server_service
        );
    }

    /**
     * @param {FluxShutdownHandler} flux_shutdown_handler
     * @param {ServerService} server_service
     * @private
     */
    constructor(flux_shutdown_handler, server_service) {
        this.#flux_shutdown_handler = flux_shutdown_handler;
        this.#server_service = server_service;
    }

    /**
     * @param {handleRequest} handle_request
     * @param {Server | null} server
     * @returns {Promise<void>}
     */
    async runServer(handle_request, server = null) {
        const listen_interface = server?.listen_interface ?? null;
        const listen_https_port = server?.listen_https_port ?? SERVER_DEFAULT_LISTEN_HTTPS_PORT;
        const listen_http_port = server?.listen_http_port ?? SERVER_DEFAULT_LISTEN_HTTP_PORT;
        const redirect_http_to_https = server?.redirect_http_to_https ?? SERVER_DEFAULT_REDIRECT_HTTP_TO_HTTPS;
        const redirect_http_to_https_port = server?.redirect_http_to_https_port ?? SERVER_DEFAULT_REDIRECT_HTTP_TO_HTTPS_PORT;
        const redirect_http_to_https_status_code = server?.redirect_http_to_https_status_code ?? SERVER_DEFAULT_REDIRECT_HTTP_TO_HTTPS_STATUS_CODE;
        const https_certificate = server?.https_certificate ?? null;
        const https_key = server?.https_key ?? null;
        const https_dhparam = server?.https_dhparam ?? null;
        const no_date = server?.no_date ?? SERVER_DEFAULT_NO_DATE;
        const no_referrer = server?.no_referrer ?? SERVER_DEFAULT_NO_REFERRER;
        const forwarded_headers = server?.forwarded_headers ?? SERVER_DEFAULT_FORWARDED_HEADERS;

        const https = listen_https_port !== SERVER_LISTEN_HTTPS_PORT_DISABLED && https_certificate !== null && https_key !== null;
        const http = listen_http_port !== SERVER_LISTEN_HTTP_PORT_DISABLED;

        /**
         * @param {IncomingMessage} req
         * @param {ServerResponse} res
         * @returns {Promise<void>}
         */
        const _handle_request = async (req, res) => {
            await this.#handleRequest(
                req,
                res,
                handle_request,
                redirect_http_to_https && https && http,
                redirect_http_to_https_port,
                redirect_http_to_https_status_code,
                no_date,
                no_referrer,
                forwarded_headers
            );
        };

        if (https) {
            await this.#createServer(
                _handle_request,
                createServerHttps,
                listen_https_port,
                listen_interface,
                {
                    cert: https_certificate,
                    key: https_key,
                    dhparam: https_dhparam
                }
            );
        }

        if (http) {
            await this.#createServer(
                _handle_request,
                createServerHttp,
                listen_http_port,
                listen_interface
            );
        }
    }

    /**
     * @param {(req: IncomingMessage, res: ServerResponse) => Promise<void>} handle_request
     * @param {createServerHttp | createServerHttps} create_server
     * @param {number} port
     * @param {string | null} server_listen_interface
     * @param {{[key: string]: *}} options
     * @returns {Promise<void>}
     */
    async #createServer(handle_request, create_server, port, server_listen_interface, options = {}) {
        await new Promise((resolve, reject) => {
            const server = create_server(options, handle_request);

            server.listen(port, server_listen_interface, async error => {
                if (error) {
                    reject(error);
                    return;
                }

                await this.#flux_shutdown_handler.addTask(async () => {
                    await new Promise((_resolve, _reject) => {
                        server.close(_error => {
                            if (_error) {
                                _reject(_error);
                                return;
                            }

                            _resolve();
                        });
                    });
                });

                resolve();
            });
        });
    }

    /**
     * @param {IncomingMessage} req
     * @param {ServerResponse} res
     * @param {handleRequest} handle_request
     * @param {boolean} redirect_http_to_https
     * @param {number} redirect_http_to_https_port
     * @param {number} redirect_http_to_https_status_code
     * @param {boolean} no_date
     * @param {boolean} no_referrer
     * @param {boolean} forwarded_headers
     * @returns {Promise<void>}
     */
    async #handleRequest(req, res, handle_request, redirect_http_to_https, redirect_http_to_https_port, redirect_http_to_https_status_code, no_date, no_referrer, forwarded_headers) {
        res.sendDate = !no_date;

        if (no_referrer) {
            res.setHeader(HEADER_REFERRER_POLICY, REFERRER_POLICY_NO_REFERRER);
        }

        let request;
        try {
            request = await this.#server_service.mapRequest(
                req,
                res,
                forwarded_headers
            );
        } catch (error) {
            console.error(error);

            await this.#server_service.mapResponse(
                HttpServerResponse.text(
                    "Invalid request",
                    STATUS_CODE_400
                ),
                res
            );

            return;
        }

        if (redirect_http_to_https && request.url.protocol !== `${PROTOCOL_HTTPS}:`) {
            await this.#server_service.mapResponse(
                HttpServerResponse.redirect(
                    `${PROTOCOL_HTTPS}://${request.url.hostname}${redirect_http_to_https_port !== SERVER_DEFAULT_REDIRECT_HTTP_TO_HTTPS_PORT ? `:${redirect_http_to_https_port}` : ""}${request.url.pathname}${request.url.search}`,
                    redirect_http_to_https_status_code
                ),
                res,
                request
            );
            return;
        }

        let response;
        try {
            response = await handle_request(
                request
            );
        } catch (error) {
            console.error(error);

            await this.#server_service.mapResponse(
                HttpServerResponse.new(
                    null,
                    STATUS_CODE_500
                ),
                res,
                request
            );

            return;
        }

        if (response !== null) {
            await this.#server_service.mapResponse(
                response,
                res,
                request
            );
        } else {
            await this.#server_service.mapResponse(
                HttpServerResponse.text(
                    "Route not found",
                    STATUS_CODE_404
                ),
                res,
                request
            );
        }
    }
}