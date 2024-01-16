import { JwtPayload } from "jwt-decode";

export interface IJwtClaims extends JwtPayload {
    id: string;
    email: string;
}