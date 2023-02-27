import { PlatformAccessory, Service } from 'homebridge';
import { VDPHomebridgePlatform } from '../../../../platform';
import { VDPObservable } from '../../system/observable';
import { VDPObserver } from '../../system/observer';
export interface VDPAccessoryCharacteristicsInformation extends IVDPAccessoryCharacteristics {
    Manufacturer: string;
    Model: string;
    SerialNumber: string;
}
export interface IVDPAccessoryCharacteristics {
}
export declare abstract class VDPAccessory implements VDPObserver, VDPObservable {
    protected readonly platform: VDPHomebridgePlatform;
    protected readonly platformAccessory: PlatformAccessory;
    private _observers;
    get observers(): VDPObserver[];
    protected set observers(observers: VDPObserver[]);
    private _name;
    get name(): string;
    protected set name(name: string);
    updateName(name: string): void;
    private _accessoryClass;
    get accessoryClass(): string;
    protected set accessoryClass(value: string);
    private _uniqueIdentifier;
    get uniqueIdentifier(): string;
    protected set uniqueIdentifier(uniqueIdentifier: string);
    private _hbPlatform;
    get HBPlatform(): VDPHomebridgePlatform;
    protected set HBPlatform(platform: VDPHomebridgePlatform);
    private _hbPlatformAccessory;
    get HBPlatformAccessory(): PlatformAccessory;
    protected set HBPlatformAccessory(accessory: PlatformAccessory);
    protected abstract _hbPlatformAccessoryService: Service;
    get HBPlatformAccessoryService(): Service;
    protected set HBPlatformAccessoryServices(service: Service);
    private _accessoryInformation;
    get accessoryInformation(): VDPAccessoryCharacteristicsInformation;
    set accessoryInformation(characteristic: VDPAccessoryCharacteristicsInformation);
    private _accessoryCharacteristics;
    get accessoryCharacteristics(): IVDPAccessoryCharacteristics;
    protected set accessoryCharacteristics(accessoryCharacteristics: IVDPAccessoryCharacteristics);
    constructor(platform: VDPHomebridgePlatform, platformAccessory: PlatformAccessory);
    attach(observer: VDPObserver): void;
    detach(observer: VDPObserver): void;
    notify(sender?: string, action?: string, state?: string, message?: string): void;
    abstract update(observable: VDPObservable, sender?: string, action?: string, state?: string, message?: string): void;
}
//# sourceMappingURL=VDPAccessory.d.ts.map