import { VDPAccessory } from "../accessories/accessory/VDPAccessory";
import { VDPObservable } from "../system/observable";
import { VDPObserver } from "../system/observer";
export declare abstract class VDPHomeContainer implements VDPObserver, VDPObservable {
    private _observers;
    protected get observers(): VDPObserver[];
    private set observers(value);
    private _name;
    get name(): string;
    protected set name(name: string);
    private _uniqueIdentifier;
    get uniqueIdentifier(): string;
    protected set uniqueIdentifier(uniqueIdentifier: string);
    private _accessory;
    get accessory(): VDPAccessory | unknown;
    protected set accessory(accessory: VDPAccessory | unknown);
    private _accessories;
    get accessories(): VDPAccessory[];
    protected set accessories(accessories: VDPAccessory[]);
    private _containers;
    get containers(): VDPHomeContainer[];
    protected set containers(containers: VDPHomeContainer[]);
    constructor(name: string);
    abstract update(observable: VDPObservable): void;
    abstract attach(observer: VDPObserver): void;
    abstract detach(observer: VDPObserver): void;
    abstract notify(): void;
}
//# sourceMappingURL=VDPHomeContainer.d.ts.map