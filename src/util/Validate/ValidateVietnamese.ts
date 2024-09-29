export default function validateVietnamese(text: string): string {
    const vietNameseRegexString = process.env.REACT_APP_VIETNAMESE_REGEX;

    if (!vietNameseRegexString) {
        throw new Error("REACT_APP_VIETNAMESE_REGEX is not defined in .env file");
    }

    const textRegex = new RegExp(vietNameseRegexString + "");
    if (textRegex.test(text)) {
        return "";
    } else {
        return "Invalid text";
    }
}
