import { CharacteristicValue, PlatformAccessory, Service } from 'homebridge';
import { VDPHomebridgePlatform } from '../../platform';
import { VDPObservable } from '../vdphomekit/system/observable';
import { Observers, VDPObserver } from '../vdphomekit/system/observer';
export interface IVDPAccessoryState {
}
export interface IVDPAccessoryCharacteristics {
}
export declare abstract class VDPAccessory implements VDPObserver, VDPObservable {
    private readonly HBPlatform;
    private readonly HBPlatformAccessory;
    protected observers: VDPObserver[];
    _observers: Observers;
    protected DEVICE_MODEL: string;
    protected _name: string;
    get name(): string;
    protected _uniqueIdentifier: string;
    protected _accessoryState: IVDPAccessoryState;
    protected _accessoryCharacteristics: IVDPAccessoryCharacteristics;
    state: boolean;
    protected _hbPlatform: VDPHomebridgePlatform;
    protected _hbPlatformAccessory: PlatformAccessory;
    protected _hbPlatformAccessoryService: Service;
    protected _manufacturer: string;
    protected _model: string;
    protected _serialNumber: string;
    constructor(HBPlatform: VDPHomebridgePlatform, HBPlatformAccessory: PlatformAccessory);
    updateName(name: string): void;
    protected initialize(): void;
    protected setAccessoryInformation(): void;
    protected abstract setServices(): void;
    protected abstract setCharacteristics(): void;
    abstract getOn(): Promise<CharacteristicValue>;
    abstract setOn(value: CharacteristicValue): void;
    attach(observer: VDPObserver): void;
    detach(observer: VDPObserver): void;
    notify(): void;
    abstract update(observable: VDPObservable): void;
}
//# sourceMappingURL=VDPAccessory.d.ts.map