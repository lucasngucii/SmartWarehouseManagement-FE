export function validatePassword(password: string): string {
    const passwordRegexString = process.env.REACT_APP_PASSWORD_REGEX;

    if (!passwordRegexString) {
        throw new Error("REACT_APP_PASSWORD_REGEX is not defined in .env file");
    }

    const passwordRegex = new RegExp(passwordRegexString + "");
    if (passwordRegex.test(password)) {
        return ""
    } else {
        return "Tối thiểu tám ký tự, ít nhất một chữ cái viết hoa, một chữ cái viết thường, một số và một ký tự đặc biệt"
    }
}
