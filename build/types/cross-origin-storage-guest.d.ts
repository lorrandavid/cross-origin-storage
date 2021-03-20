import { GuestConfig } from "./interfaces/guest-config.interface";
declare class CrossOriginStorageGuest {
    isInit: boolean;
    requestId: number;
    options: GuestConfig;
    constructor(config: GuestConfig);
    private attachEvents;
    private onInitFinished;
    init(config: GuestConfig): void;
}
export default CrossOriginStorageGuest;
