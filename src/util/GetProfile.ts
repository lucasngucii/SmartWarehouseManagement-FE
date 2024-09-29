import { Profile } from "../interface/Profile";

export default function GetProfile(): Profile | null {

    const myProfile = localStorage.getItem("profile");

    if (myProfile) {
        return JSON.parse(myProfile);
    }

    return null;
}
