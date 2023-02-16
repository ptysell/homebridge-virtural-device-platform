import { VDPObserver } from "./observer";
export interface VDPObservable {
    attach(observer: VDPObserver, key?: string, message?: string): void;
    detach(observer: VDPObserver, key?: string, message?: string): void;
    notify(key?: string, message?: string): void;
}
//# sourceMappingURL=observable.d.ts.map