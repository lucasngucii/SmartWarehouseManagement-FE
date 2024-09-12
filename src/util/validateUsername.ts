export function ValidateUsername(username: string): string {
    const usernameRegexString = process.env.REACT_APP_USERNAME_REGEX;

    if (!usernameRegexString) {
        throw new Error("REACT_APP_USERNAME_REGEX is not defined in .env file");
    }

    const usernameRegex = new RegExp(usernameRegexString + "");
    if (usernameRegex.test(username)) {
        return "";
    } else {
        return "Minimum 8-20 characters, no special characters";
    }
}
