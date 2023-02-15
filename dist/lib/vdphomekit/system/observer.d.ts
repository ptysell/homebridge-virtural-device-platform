import { VDPObservable } from "./observable";
export interface VDPObserver {
    update(observable: VDPObservable): void;
}
export declare type ObserverCallback = (newValue: any) => void;
export declare class Observer {
    private _subject;
    private _callback?;
    constructor(_subject: string, _callback?: ObserverCallback | undefined);
    get subject(): string;
    private _newValue;
    get newValue(): any;
    set newValue(newValue: any);
    notify: () => void;
}
export declare class Observers {
    private _observers;
    subscribe: (observer: Observer) => void;
    unsubscribe: (observer: Observer) => void;
    notify: (subject: string, newValue: any) => void;
}
//# sourceMappingURL=observer.d.ts.map