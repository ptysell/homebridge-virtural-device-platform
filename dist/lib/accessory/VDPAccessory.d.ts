import { CharacteristicValue, PlatformAccessory, Service } from 'homebridge';
import { VDPHomebridgePlatform } from '../../platform';
import { IObservable } from '../observer/IObservable';
import { IObserver } from '../observer/IObserver';
export interface IVDPAccessoryState {
}
export interface IVDPAccessoryCharacteristics {
}
export declare abstract class VDPAccessory implements IObserver, IObservable {
    private readonly HBPlatform;
    private readonly HBPlatformAccessory;
    protected observers: IObserver[];
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
    attach(observer: IObserver): void;
    detach(observer: IObserver): void;
    notify(): void;
    abstract update(observable: IObservable): void;
}
//# sourceMappingURL=VDPAccessory.d.ts.map