import { Permission } from "./Permission";

export interface Role {
    name: string;
    permissions: Permission[];
}