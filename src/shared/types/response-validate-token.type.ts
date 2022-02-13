import { ErrorResponse } from "@shared/interfaces/error-response.interface";
import { IPayload } from "@shared/interfaces/payload.interface";

export type ResponseValidateToken = IPayload | ErrorResponse;
