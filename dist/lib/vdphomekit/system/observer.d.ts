import { VDPObservable } from "./observable";
export interface VDPObserver {
    update(observable: VDPObservable): void;
}
export declare type ObserverCallback = (newValue: any) => void;
//# sourceMappingURL=observer.d.ts.map