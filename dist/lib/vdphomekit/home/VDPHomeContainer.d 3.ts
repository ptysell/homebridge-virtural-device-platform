import { VDPAccessory } from "../../accessory/VDPAccessory";
import { VDPObservable } from "../system/observable";
import { VDPObserver } from "../system/observer";
export declare abstract class VDPHomeContainer implements VDPObserver, VDPObservable {
    private _observers;
    private get observers();
    private set observers(value);
    private _name;
    get name(): string;
    private set name(value);
    private _uniqueIdentifier;
    get uniqueIdentifier(): string;
    private set uniqueIdentifier(value);
    private _accessory;
    get accessory(): VDPAccessory | unknown;
    private set accessory(value);
    private _accessories;
    get accessories(): VDPAccessory[];
    private set accessories(value);
    private _containers;
    get containers(): VDPHomeContainer[];
    private set containers(value);
    constructor(name: string);
    abstract update(observable: VDPObservable): void;
    abstract attach(observer: VDPObserver): void;
    abstract detach(observer: VDPObserver): void;
    abstract notify(): void;
}
//# sourceMappingURL=VDPHomeContainer.d.ts.map