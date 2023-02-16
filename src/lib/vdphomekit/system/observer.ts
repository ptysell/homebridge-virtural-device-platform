import { VDPObservable } from "./observable";

export interface VDPObserver {

    update(observable: VDPObservable, key?: string, message?: string): void;

}

export type ObserverCallback = (newValue: any) => void;