enum ResponseCode {
    // Http Status 200
    SUCCESS = "SU",

    // Http Status 400
    VALIDATION_FAILED = "VF",
    DUPLICATE_EMAIL = "DE",
    DUPLICATE_NICKNAME = "DN",
    DUPLICATE_TEL_NUMBER = "DT",
    NOT_EXISTED_USER = "NU",
    NOT_EXISTED_BOARD = "NB",

    // Http Status 401
    SIGN_IN_FAIL = "SF",
    AUTHENTICATION_FAIL = "AF",

    // Http Status 403
    NO_PERMISSION = "NP",

    // Http Status 500
    DATABASE_ERROR = "DBE",
}

export default ResponseCode;