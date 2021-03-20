import { HostConfig } from "./interfaces/host-config.interface";
declare class CrossOriginStorageHost {
    iframe: any;
    isInit: boolean;
    isReady: boolean;
    requestId: number;
    requests: {};
    options: HostConfig;
    constructor(config: HostConfig);
    private attachEvents;
    private createIframe;
    private receiveMessage;
    private executeCallback;
    init(config: HostConfig): void;
    clone(callback: any): void;
    clear(callback: any): void;
}
export default CrossOriginStorageHost;
