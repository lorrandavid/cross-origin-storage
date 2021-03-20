export interface HostConfig {
    iframeUrl: string;
    identifier: string;
    whitelist: string[];
    excludes: string[];
    initCallback: any;
}