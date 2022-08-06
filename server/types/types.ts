import {ValidationError} from "express-validator";

export interface IServerRequest {
    name: string,
    phone: string,
    email?: string,
    message?: string
}

export interface IServerResponse {
    message?: string,
    errors?: ValidationError[]
}
