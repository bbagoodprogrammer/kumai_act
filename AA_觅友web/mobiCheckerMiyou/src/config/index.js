export default {
    downTime: 60,
    vcodeSize: 4,
    codeSize: 4,
    getSize: 3,
    apis: {
        getCode: '/api/sms_kit/sendCode.php',
        getArea: '/api/sms_kit/GetSmsCountry.php',
        checkCode: '/api/sms_kit/verifyCode.php',
        report: '/api/sms_kit/report.php',
        vcode: '/api/getValidateCode.php?from=sendCode&id={rand}',
    },
}