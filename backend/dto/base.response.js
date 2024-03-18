class BaseResponse {
    constructor(res) {
        this.res = res;
    }

    sendSuccess(data) {
        this.res.status(200).json({
            is_success: true,
            result: data,
            message: null
        });
    }

    sendFail(message, statusCode) {
        this.res.status(statusCode).json({
            is_success: false,
            result: null,
            message: message
        });
    }
}

module.exports = BaseResponse;