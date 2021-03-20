import { Message } from "./interfaces/message.interface";
export declare function isSameOrigin(currentUrl: string, origin: string): boolean;
export declare function isValidOrigin(origin: string, whitelist: string[]): boolean;
export declare function makeMessage(requestId: number, identifier: string, method: string, data: any): Message;
export declare function getData($event: any): Message;
