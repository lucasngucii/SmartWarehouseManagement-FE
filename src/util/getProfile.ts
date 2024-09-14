import { Profile } from "../interface/Profile";

export const GetProfile = (): Profile | null => {

    const myProfile = localStorage.getItem("profile");

    if (myProfile) {
        return JSON.parse(myProfile);
    }

    return null;
}
