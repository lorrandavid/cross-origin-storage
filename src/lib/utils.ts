import { Message } from "./interfaces/message.interface";

export function isSameOrigin(currentUrl: string, origin: string): boolean {
  return currentUrl === origin;
}

export function isValidOrigin(origin: string, whitelist: string[]): boolean {
  return whitelist.find((link) => link.includes(origin)) ? true : false;
}

export function makeMessage(
  requestId: number,
  identifier: string,
  method: string,
  data: any
): Message {
  return {
    id: requestId,
    identifier: identifier,
    method: method,
    data: data,
  };
}

export function getData($event: any): Message {
  let data;

  try {
    data = JSON.parse($event.data);
  } catch (err) {}

  return data;
}
