import { VDPHomebridgePlatform } from "../../../platform";
import { VDPAccessory } from "../accessories/accessory/VDPAccessory";
import { VDPObservable } from "../system/observable";
import { VDPObserver } from "../system/observer";
export declare abstract class VDPHomeContainer implements VDPObserver, VDPObservable {
    protected readonly containerName: string;
    protected readonly platform: VDPHomebridgePlatform;
    private _observers;
    protected get observers(): VDPObserver[];
    protected set observers(observers: VDPObserver[]);
    private _name;
    get name(): string;
    protected set name(name: string);
    private _uniqueIdentifier;
    get uniqueIdentifier(): string;
    protected set uniqueIdentifier(uniqueIdentifier: string);
    private _accessory;
    get accessory(): VDPAccessory;
    protected set accessory(accessory: VDPAccessory);
    private _accessories;
    get accessories(): VDPAccessory[];
    protected set accessories(accessories: VDPAccessory[]);
    private _containers;
    get containers(): VDPHomeContainer[];
    protected set containers(containers: VDPHomeContainer[]);
    private _hbPlatform;
    get HBPlatform(): VDPHomebridgePlatform;
    protected set HBPlatform(platform: VDPHomebridgePlatform);
    constructor(containerName: string, platform: VDPHomebridgePlatform);
    addAccessory(accessory: VDPAccessory): void;
    removeAccessory(accessory: VDPAccessory): void;
    addContainer(container: VDPHomeContainer): void;
    removeContainer(container: VDPHomeContainer): void;
    attach(observer: VDPObserver): void;
    detach(observer: VDPObserver): void;
    notify(sender?: string, action?: string, state?: string, message?: string): void;
    abstract update(observable: VDPObservable, sender?: string, action?: string, state?: string, message?: string): void;
}
//# sourceMappingURL=VDPContainer.d.ts.map