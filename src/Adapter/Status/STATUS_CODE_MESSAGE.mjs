import { STATUS_CODE_100, STATUS_CODE_101, STATUS_CODE_200, STATUS_CODE_201, STATUS_CODE_202, STATUS_CODE_203, STATUS_CODE_204, STATUS_CODE_205, STATUS_CODE_206, STATUS_CODE_300, STATUS_CODE_301, STATUS_CODE_302, STATUS_CODE_303, STATUS_CODE_304, STATUS_CODE_307, STATUS_CODE_308, STATUS_CODE_400, STATUS_CODE_401, STATUS_CODE_402, STATUS_CODE_403, STATUS_CODE_404, STATUS_CODE_405, STATUS_CODE_406, STATUS_CODE_407, STATUS_CODE_408, STATUS_CODE_409, STATUS_CODE_410, STATUS_CODE_411, STATUS_CODE_412, STATUS_CODE_413, STATUS_CODE_414, STATUS_CODE_415, STATUS_CODE_416, STATUS_CODE_417, STATUS_CODE_418, STATUS_CODE_422, STATUS_CODE_425, STATUS_CODE_426, STATUS_CODE_428, STATUS_CODE_429, STATUS_CODE_431, STATUS_CODE_451, STATUS_CODE_500, STATUS_CODE_501, STATUS_CODE_502, STATUS_CODE_503, STATUS_CODE_504, STATUS_CODE_505, STATUS_CODE_506, STATUS_CODE_507, STATUS_CODE_508, STATUS_CODE_510, STATUS_CODE_511 } from "./STATUS_CODE.mjs";
import { STATUS_MESSAGE_ACCEPTED, STATUS_MESSAGE_BAD_GATEWAY, STATUS_MESSAGE_BAD_REQUEST, STATUS_MESSAGE_CONFLICT, STATUS_MESSAGE_CONTINUE, STATUS_MESSAGE_CREATED, STATUS_MESSAGE_EXPECTATION_FAILED, STATUS_MESSAGE_FORBIDDEN, STATUS_MESSAGE_FOUND, STATUS_MESSAGE_GATEWAY_TIMEOUT, STATUS_MESSAGE_GONE, STATUS_MESSAGE_HTTP_VERSION_NOT_SUPPORTED, STATUS_MESSAGE_I_M_A_TEAPOT, STATUS_MESSAGE_INSUFFICIENT_STORAGE, STATUS_MESSAGE_INTERNAL_SERVER_ERROR, STATUS_MESSAGE_LENGTH_REQUIRED, STATUS_MESSAGE_LOOP_DETECTED, STATUS_MESSAGE_METHOD_NOT_ALLOWED, STATUS_MESSAGE_MOVED_PERMANENTLY, STATUS_MESSAGE_MULTIPLE_CHOICES, STATUS_MESSAGE_NETWORK_AUTHENTICATION_REQUIRED, STATUS_MESSAGE_NO_CONTENT, STATUS_MESSAGE_NON_AUTHORITATIVE_INFORMATION, STATUS_MESSAGE_NOT_ACCEPTABLE, STATUS_MESSAGE_NOT_EXTENDED, STATUS_MESSAGE_NOT_FOUND, STATUS_MESSAGE_NOT_IMPLEMENTED, STATUS_MESSAGE_NOT_MODIFIED, STATUS_MESSAGE_OK, STATUS_MESSAGE_PARTIAL_CONTENT, STATUS_MESSAGE_PAYLOAD_TOO_LARGE, STATUS_MESSAGE_PAYMENT_REQUIRED, STATUS_MESSAGE_PERMANENT_REDIRECT, STATUS_MESSAGE_PRECONDITION_FAILED, STATUS_MESSAGE_PRECONDITION_REQUIRED, STATUS_MESSAGE_PROXY_AUTHENTICATION_REQUIRED, STATUS_MESSAGE_RANGE_NOT_SATISFIABLE, STATUS_MESSAGE_REQUEST_HEADER_FIELDS_TOO_LARGE, STATUS_MESSAGE_REQUEST_TIMEOUT, STATUS_MESSAGE_RESET_CONTENT, STATUS_MESSAGE_SEE_OTHER, STATUS_MESSAGE_SERVICE_UNAVAILABLE, STATUS_MESSAGE_SWITCHING_PROTOCOLS, STATUS_MESSAGE_TEMPORARY_REDIRECT, STATUS_MESSAGE_TOO_EARLY, STATUS_MESSAGE_TOO_MANY_REQUESTS, STATUS_MESSAGE_UNAUTHORIZED, STATUS_MESSAGE_UNAVAILABLE_FOR_LEGAL_REASONS, STATUS_MESSAGE_UNPROCESSABLE_ENTITY, STATUS_MESSAGE_UNSUPPORTED_MEDIA_TYPE, STATUS_MESSAGE_UPGRADE_REQUIRED, STATUS_MESSAGE_URI_TOO_LONG, STATUS_MESSAGE_VARIANT_ALSO_NEGOTIATES } from "./STATUS_MESSAGE.mjs";

export const STATUS_CODE_MESSAGE = Object.freeze({
    [STATUS_CODE_100]: STATUS_MESSAGE_CONTINUE,
    [STATUS_CODE_101]: STATUS_MESSAGE_SWITCHING_PROTOCOLS,
    [STATUS_CODE_200]: STATUS_MESSAGE_OK,
    [STATUS_CODE_201]: STATUS_MESSAGE_CREATED,
    [STATUS_CODE_202]: STATUS_MESSAGE_ACCEPTED,
    [STATUS_CODE_203]: STATUS_MESSAGE_NON_AUTHORITATIVE_INFORMATION,
    [STATUS_CODE_204]: STATUS_MESSAGE_NO_CONTENT,
    [STATUS_CODE_205]: STATUS_MESSAGE_RESET_CONTENT,
    [STATUS_CODE_206]: STATUS_MESSAGE_PARTIAL_CONTENT,
    [STATUS_CODE_300]: STATUS_MESSAGE_MULTIPLE_CHOICES,
    [STATUS_CODE_301]: STATUS_MESSAGE_MOVED_PERMANENTLY,
    [STATUS_CODE_302]: STATUS_MESSAGE_FOUND,
    [STATUS_CODE_303]: STATUS_MESSAGE_SEE_OTHER,
    [STATUS_CODE_304]: STATUS_MESSAGE_NOT_MODIFIED,
    [STATUS_CODE_307]: STATUS_MESSAGE_TEMPORARY_REDIRECT,
    [STATUS_CODE_308]: STATUS_MESSAGE_PERMANENT_REDIRECT,
    [STATUS_CODE_400]: STATUS_MESSAGE_BAD_REQUEST,
    [STATUS_CODE_401]: STATUS_MESSAGE_UNAUTHORIZED,
    [STATUS_CODE_402]: STATUS_MESSAGE_PAYMENT_REQUIRED,
    [STATUS_CODE_403]: STATUS_MESSAGE_FORBIDDEN,
    [STATUS_CODE_404]: STATUS_MESSAGE_NOT_FOUND,
    [STATUS_CODE_405]: STATUS_MESSAGE_METHOD_NOT_ALLOWED,
    [STATUS_CODE_406]: STATUS_MESSAGE_NOT_ACCEPTABLE,
    [STATUS_CODE_407]: STATUS_MESSAGE_PROXY_AUTHENTICATION_REQUIRED,
    [STATUS_CODE_408]: STATUS_MESSAGE_REQUEST_TIMEOUT,
    [STATUS_CODE_409]: STATUS_MESSAGE_CONFLICT,
    [STATUS_CODE_410]: STATUS_MESSAGE_GONE,
    [STATUS_CODE_411]: STATUS_MESSAGE_LENGTH_REQUIRED,
    [STATUS_CODE_412]: STATUS_MESSAGE_PRECONDITION_FAILED,
    [STATUS_CODE_413]: STATUS_MESSAGE_PAYLOAD_TOO_LARGE,
    [STATUS_CODE_414]: STATUS_MESSAGE_URI_TOO_LONG,
    [STATUS_CODE_415]: STATUS_MESSAGE_UNSUPPORTED_MEDIA_TYPE,
    [STATUS_CODE_416]: STATUS_MESSAGE_RANGE_NOT_SATISFIABLE,
    [STATUS_CODE_417]: STATUS_MESSAGE_EXPECTATION_FAILED,
    [STATUS_CODE_418]: STATUS_MESSAGE_I_M_A_TEAPOT,
    [STATUS_CODE_422]: STATUS_MESSAGE_UNPROCESSABLE_ENTITY,
    [STATUS_CODE_425]: STATUS_MESSAGE_TOO_EARLY,
    [STATUS_CODE_426]: STATUS_MESSAGE_UPGRADE_REQUIRED,
    [STATUS_CODE_428]: STATUS_MESSAGE_PRECONDITION_REQUIRED,
    [STATUS_CODE_429]: STATUS_MESSAGE_TOO_MANY_REQUESTS,
    [STATUS_CODE_431]: STATUS_MESSAGE_REQUEST_HEADER_FIELDS_TOO_LARGE,
    [STATUS_CODE_451]: STATUS_MESSAGE_UNAVAILABLE_FOR_LEGAL_REASONS,
    [STATUS_CODE_500]: STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
    [STATUS_CODE_501]: STATUS_MESSAGE_NOT_IMPLEMENTED,
    [STATUS_CODE_502]: STATUS_MESSAGE_BAD_GATEWAY,
    [STATUS_CODE_503]: STATUS_MESSAGE_SERVICE_UNAVAILABLE,
    [STATUS_CODE_504]: STATUS_MESSAGE_GATEWAY_TIMEOUT,
    [STATUS_CODE_505]: STATUS_MESSAGE_HTTP_VERSION_NOT_SUPPORTED,
    [STATUS_CODE_506]: STATUS_MESSAGE_VARIANT_ALSO_NEGOTIATES,
    [STATUS_CODE_507]: STATUS_MESSAGE_INSUFFICIENT_STORAGE,
    [STATUS_CODE_508]: STATUS_MESSAGE_LOOP_DETECTED,
    [STATUS_CODE_510]: STATUS_MESSAGE_NOT_EXTENDED,
    [STATUS_CODE_511]: STATUS_MESSAGE_NETWORK_AUTHENTICATION_REQUIRED
});
