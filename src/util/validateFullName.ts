export function validateFullname(fullName: string): string {
    const fullNameRegexString = process.env.REACT_APP_FULLNAME_REGEX;

    if (!fullNameRegexString) {
        throw new Error("REACT_APP_FULLNAME_REGEX is not defined in .env file");
    }

    const fullNameRegex = new RegExp(fullNameRegexString + "");
    if (fullNameRegex.test(fullName)) {
        return "";
    } else {
        return "Fullname is invalid";
    }
}
