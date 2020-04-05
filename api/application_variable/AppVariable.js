module.exports = {
    "HTTP_STATUS_CODE" : {
        "OK":200,
        "CREATED":201,
        "ACCEPT":202,
        "BAD_REQUEST":400,
        "UNAUTHORIZED":401,
        "PAYMENT_REQUIRED":402,
        "FORBIDDEN":403,
        "PAGE_NOT_FOUND":404,
        "INTERNAL_SERVER_ERROR":500,
        "NOT_IMPLEMENTED":501,
        "BAD_GATEWAY":502
    },
    "REGEX_PATTERN" : {
        "NAME":/^[A-Za-z ]+$/
        ,"EMAIL":/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }
}