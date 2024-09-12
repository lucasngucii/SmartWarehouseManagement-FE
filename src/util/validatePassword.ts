export function ValidatePassWord(password: string): string {
    const passwordRegexString = process.env.REACT_APP_PASSWORD_REGEX;

    if (!passwordRegexString) {
        throw new Error("REACT_APP_PASSWORD_REGEX is not defined in .env file");
    }

    const passwordRegex = new RegExp(passwordRegexString + "");
    if (passwordRegex.test(password)) {
        return ""
    } else {
        return "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
    }
}
