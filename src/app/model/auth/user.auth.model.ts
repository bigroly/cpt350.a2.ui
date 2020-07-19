export interface UserAuth {
    email:string;
    jwtToken: string;
    tokenExpiry: number;
    permissionGroups: string[];
}