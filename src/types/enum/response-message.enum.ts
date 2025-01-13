enum ResponseMessage {
    // Http Status 200
    SUCCESS = "성공", // 성공

    // Http Status 400
    VALIDATION_FAILED = "유효성 검증 실패", // 유효성 검증 실패
    DUPLICATE_EMAIL = "이메일 중복", // 이메일 중복
    DUPLICATE_NICKNAME = "닉네임 중복", // 닉네임 중복
    DUPLICATE_TEL_NUMBER = "전화번호 중복", // 전화번호 중복
    NOT_EXISTED_USER = "존재하지 않는 사용자", // 존재하지 않는 사용자
    NOT_EXISTED_BOARD = "존재하지 않는 게시글", // 존재하지 않는 게시글

    // Http Status 401
    SIGN_IN_FAIL = "로그인 실패", // 로그인 실패
    AUTHENTICATION_FAIL = "인증 실패", // 인증 실패

    // Http Status 403
    NO_PERMISSION = "권한 없음", // 권한 없음

    // Http Status 500
    DATABASE_ERROR = "데이터베이스 오류", // 데이터베이스 오류
}

export default ResponseMessage;
