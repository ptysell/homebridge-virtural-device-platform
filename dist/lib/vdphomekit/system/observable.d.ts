import { VDPObserver } from "./observer";
export interface VDPObservable {
    attach(observer: VDPObserver): void;
    detach(observer: VDPObserver): void;
    notify(): void;
}
//# sourceMappingURL=observable.d.ts.map