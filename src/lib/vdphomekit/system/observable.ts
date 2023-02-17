import { VDPObserver } from "./observer";

export interface VDPObservable {

    attach(observer: VDPObserver): void;

    detach(observer: VDPObserver): void;

    notify(sender?: string, action?: string, state?: string, message?: string): void;

}