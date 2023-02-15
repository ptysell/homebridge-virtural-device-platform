import { VDPObservable } from "./observable";

export interface VDPObserver {

    update(observable: VDPObservable): void;

}

export type ObserverCallback = (newValue: any) => void;