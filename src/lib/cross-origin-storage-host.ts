import { isValidOrigin, makeMessage, getData } from "./utils";
import { MethodsEnum } from "./enums/methods.enum";
import { StatusEnum } from "./enums/status.enum";
import { HostConfig } from "./interfaces/host-config.interface";

class CrossOriginStorageHost {
  iframe: any;
  isInit = false;
  isReady = false;
  requestId = -1;
  requests = {};
  options: HostConfig = {
    iframeUrl: "",
    identifier: "",
    whitelist: [],
    excludes: [],
    initCallback: function () {},
  };

  constructor(config: HostConfig) {
    if (!config.hasOwnProperty("iframeUrl") || this.isInit) {
      throw new Error("Error before initiating");
    }

    this.init(config);
  }

  private attachEvents() {
    if (window.addEventListener) {
      window.addEventListener("message", this.receiveMessage.bind(this), false);
    } else {
      window["attachEvent"]("onmessage", this.receiveMessage.bind(this));
    }
  }

  private createIframe(identifier: string): void {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = `<iframe id="${identifier}" src="${this.options.iframeUrl}" style="display: none;"></iframe>`;
    document.body.appendChild(wrapper);
    this.iframe = document.getElementById(identifier);
  }

  private receiveMessage($event: any): void {
    const data = getData($event);

    if (data && isValidOrigin($event.origin, this.options.whitelist)) {
      if (data.method !== StatusEnum.READY || this.isReady) {
        return this.executeCallback(data);
      }

      this.isReady = true;
      this.options.initCallback();
    }
  }

  private executeCallback(data: any): void {
    if (this.requests[data.id]) {
      this.requests[data.id](data);
      delete this.requests[data.id];
    }
  }

  init(config: HostConfig): void {
    this.isInit = true;
    this.options = config;
    const { identifier } = config;

    this.attachEvents();
    this.createIframe(identifier);
  }

  clone(callback: any): void {
    this.requestId++;
    this.requests[this.requestId] = callback;
    var payload = makeMessage(
      this.requestId,
      this.options.identifier,
      MethodsEnum.SET,
      {}
    );

    Object.keys(window.sessionStorage).forEach((key) => {
      if (this.options.excludes && this.options.excludes.includes(key)) return;
      payload.data[key] = window.sessionStorage.getItem(key);
    });

    this.iframe.contentWindow.postMessage(JSON.stringify(payload), "*");
  }

  clear(callback: any): void {
    this.requestId++;
    this.requests[this.requestId] = callback;
    const payload = makeMessage(
      this.requestId,
      this.options.identifier,
      MethodsEnum.CLEAR,
      null
    );
    this.iframe.contentWindow.postMessage(JSON.stringify(payload), "*");
  }
}

export default CrossOriginStorageHost;
