/* eslint-disable @typescript-eslint/no-empty-interface */
import { CharacteristicValue, PlatformAccessory, Service } from 'homebridge';
import { VDPHomebridgePlatform } from '../../platform';
//import { VDPRoom } from '../home/VDPRoom';
import { DEVICE_MANUFACTURER } from '../../settings';
import { VDPObservable } from '../vdphomekit/system/observable';
import { VDPObserver } from '../vdphomekit/system/observer';



export interface IVDPAccessoryState{}
export interface IVDPAccessoryCharacteristics {}
export abstract class VDPAccessory implements VDPObserver, VDPObservable {

    protected observers: VDPObserver[] = [];

    protected abstract DEVICE_MODEL: string;

    protected _name: string;
    get name():string {
        return this._name;
    }

    protected _uniqueIdentifier: string;

    protected _accessoryState!: IVDPAccessoryState;
    protected _accessoryCharacteristics!: IVDPAccessoryCharacteristics;
    public state = false;

    //protected _vdpRoom: VDPRoom;
    //
    protected _hbPlatform: VDPHomebridgePlatform;

    protected _hbPlatformAccessory: PlatformAccessory;
    //protected _hbPlatformServices: Service[] | undefined;
    protected _hbPlatformAccessoryService!: Service;
    //protected _hbCharacteristic: Characteristic[] | undefined;

    protected _manufacturer: string;
    protected _model: string;
    protected _serialNumber: string;


    constructor(
        private readonly HBPlatform: VDPHomebridgePlatform,
        private readonly HBPlatformAccessory: PlatformAccessory,
    ) {

        this._name = HBPlatformAccessory.displayName;
        this._uniqueIdentifier = HBPlatformAccessory.UUID;

        //this._accessoryState = {name: this._name, uniqueIdentifier: this._uniqueIdentifier};


        this._hbPlatform = HBPlatform;
        this._hbPlatformAccessory = HBPlatformAccessory;
        //this._hbPlatformAccessoryService = this.HBPlatformAccessory.services;
        //this._hbCharacteristic = this._hbServices[0].characteristics.

        this._manufacturer = DEVICE_MANUFACTURER;
        //this._model = this.DEVICE_MODEL;
        this._model = "N/A";
        this._serialNumber = this._hbPlatformAccessory.UUID;

        this.initialize();

    }

    updateName(name: string){
        this._name = name;
    }

    protected initialize(): void {

        this.setAccessoryInformation();
        this.setServices();
        this.setCharacteristics();

    }

    protected setAccessoryInformation(): void {

        this.HBPlatformAccessory.getService(this.HBPlatform.Service.AccessoryInformation)!
            .setCharacteristic(this.HBPlatform.Characteristic.Manufacturer, this._manufacturer)
            .setCharacteristic(this.HBPlatform.Characteristic.Model, this.DEVICE_MODEL)
            .setCharacteristic(this.HBPlatform.Characteristic.SerialNumber, this._serialNumber);

    }

    protected abstract setServices(): void;
    protected abstract setCharacteristics(): void;

    abstract getOn(): Promise<CharacteristicValue>;
    abstract setOn(value: CharacteristicValue): void;

    public attach (observer: VDPObserver): void {
        const isExist = this.observers.includes(observer);
        if (isExist) {
            return;
        }
        this.observers.push(observer);
    }

    public detach (observer: VDPObserver): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            return;
        }

        this.observers.splice(observerIndex, 1);
    }

    public notify(): void {
        for (const observer of this.observers) {
            observer.update(this);
        }
    }

    abstract update(observable: VDPObservable): void;

}
