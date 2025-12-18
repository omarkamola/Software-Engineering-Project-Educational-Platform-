import { Request } from 'express';

export interface UserPayload {
    id: number;
    username: string;
    role_id: number;
    full_name?: string;
    email?: string;
    phone?: string;
}

export interface AuthenticatedRequest extends Request {
    user?: UserPayload;
}
