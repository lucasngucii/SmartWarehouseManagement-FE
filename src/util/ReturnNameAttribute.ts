const returnNameAttribute = (attributeId: number) => {
    switch (attributeId) {
        case 1:
            return "colors";
        case 2:
            return "materials";
        case 3:
            return "brands";
        case 4:
            return "sizes";
        case 5:
            return "categories";
        default:
            return "";
    }
}

export default returnNameAttribute;