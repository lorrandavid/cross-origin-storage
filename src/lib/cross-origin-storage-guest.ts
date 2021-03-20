import { isValidOrigin, isSameOrigin, makeMessage, getData } from "./utils";
import { MethodsEnum } from "./enums/methods.enum";
import { StatusEnum } from "./enums/status.enum";
import { GuestConfig } from "./interfaces/guest-config.interface";

class CrossOriginStorageGuest {
  isInit = false;
  requestId = -1;
  options: GuestConfig = {
    identifier: "",
    whitelist: [],
  };

  constructor(config: GuestConfig) {
    if (!config.hasOwnProperty("identifier") || this.isInit) {
      throw new Error("Error before initiating");
    }

    this.init(config);
  }

  private attachEvents() {
    window.onmessage = ($event: any) => {
      if (isSameOrigin(window.location.origin, $event.origin)) {
        return;
      }

      if (!isValidOrigin($event.origin, this.options.whitelist)) {
        throw new Error("Forbidden origin");
      }

      const data = getData($event);

      if (data) {
        const payload = makeMessage(
          this.requestId,
          this.options.identifier,
          MethodsEnum.SET,
          data.data
        );

        if (data.method === MethodsEnum.SET) {
          Object.keys(data.data).forEach(function (key) {
            window.sessionStorage.setItem(key, data.data[key]);
          });

          window.parent.postMessage(JSON.stringify(payload), "*");
        }
      }
    };
  }

  private onInitFinished(identifier: string): void {
    this.requestId++;
    const data = makeMessage(
      this.requestId,
      identifier,
      StatusEnum.READY,
      null
    );
    window.parent.postMessage(JSON.stringify(data), "*");
  }

  init(config: GuestConfig): void {
    this.isInit = true;
    this.options = config;
    const { identifier } = config;

    this.attachEvents();
    this.onInitFinished(identifier);
  }
}

export default CrossOriginStorageGuest;
