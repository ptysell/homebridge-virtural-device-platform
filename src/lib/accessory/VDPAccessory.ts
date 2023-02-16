/* eslint-disable @typescript-eslint/no-empty-interface */
import { CharacteristicValue, PlatformAccessory, Service } from 'homebridge';
import { VDPHomebridgePlatform } from '../../platform';
//import { VDPRoom } from '../home/VDPRoom';
import { DEVICE_MANUFACTURER } from '../../settings';
import { VDPObservable } from '../vdphomekit/system/observable';
import { VDPObserver } from '../vdphomekit/system/observer';

export interface VDPAccessoryCharacteristicsInformation extends IVDPAccessoryCharacteristics {
    Manufacturer: string;
    Model: string;
    SerialNumber: string;
}

export interface IVDPAccessoryCharacteristics {}
//export interface HBPlatformAccessoryCharacteristics{}
export abstract class VDPAccessory implements VDPObserver, VDPObservable {

    private _observers: VDPObserver[] = [];
    public get observers(): VDPObserver[] { return this._observers; }
    protected set observers(observers: VDPObserver[]) { this._observers = observers }

    private _name: string;
    public get name():string { return this._name; }
    protected set name(name: string) { this._name = name; }
    public updateName(name: string){ this._name = name; }

    private _uniqueIdentifier: string;
    public get uniqueIdentifier(): string { return this._uniqueIdentifier; }
    protected set uniqueIdentifier(uniqueIdentifier: string) { this._uniqueIdentifier = uniqueIdentifier }

    private _hbPlatform: VDPHomebridgePlatform;
    public get HBPlatform(): VDPHomebridgePlatform { return this._hbPlatform; }
    protected set HBPlatform(platform: VDPHomebridgePlatform) { this._hbPlatform = platform }

    private _hbPlatformAccessory: PlatformAccessory;
    public get HBPlatformAccessory(): PlatformAccessory { return this._hbPlatformAccessory }
    protected set HBPlatformAccessory(accessory: PlatformAccessory) { this._hbPlatformAccessory = accessory; }

    protected abstract _hbPlatformAccessoryService: Service;
    public get HBPlatformAccessoryService(): Service { return this._hbPlatformAccessoryService; }
    protected set HBPlatformAccessoryServices(service: Service) { this._hbPlatformAccessoryService = service; }


    private _accessoryInformation: VDPAccessoryCharacteristicsInformation;
    public get accessoryInformation():VDPAccessoryCharacteristicsInformation { return this._accessoryInformation };
    public set accessoryInformation( characteristic: VDPAccessoryCharacteristicsInformation) { this._accessoryInformation = characteristic}

    private _accessoryCharacteristics: IVDPAccessoryCharacteristics;
    public get accessoryCharacteristics(): IVDPAccessoryCharacteristics { return this._accessoryCharacteristics }
    protected set accessoryCharacteristics(accessoryCharacteristics: IVDPAccessoryCharacteristics) { this._accessoryCharacteristics = accessoryCharacteristics}


    //protected _accessoryCharacteristics: IVDPAccessoryCharacteristics[];
    //public state = false;

    //protected _hbPlatformServices: Service[] | undefined;
    //protected _hbPlatformAccessoryService!: Service;
    //protected _hbCharacteristic: Characteristic[] | undefined;

    constructor(
        protected readonly platform: VDPHomebridgePlatform,
        protected readonly platformAccessory: PlatformAccessory,
    ) {

        this._name = platformAccessory.displayName;
        this._uniqueIdentifier = platformAccessory.UUID;

        this._hbPlatform = platform;
        this._hbPlatformAccessory = platformAccessory;
       // this._hbPlatformAccessoryServices = undefined;

        this._accessoryInformation = {Manufacturer: 'N/A', Model: 'N/A', SerialNumber: 'N/A'};
        this._accessoryCharacteristics = {};


             //this._accessoryState = {name: this._name, uniqueIdentifier: this._uniqueIdentifier};


        //this._hbPlatformAccessoryService = this.HBPlatformAccessory.services;
        //this._hbCharacteristic = this._hbServices[0].characteristics.

       // this.initialize();

    }
    
    public attach ( observer: VDPObserver, key?: string, message?: string ): void {
        const isExist = this.observers.includes(observer);
        if (isExist) {
            return;
        }
        this.observers.push(observer);
    }

    public detach ( observer: VDPObserver, key?: string, message?: string ): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            return;
        }

        this.observers.splice(observerIndex, 1);
    }

    public notify( key?: string, message?: string ): void {
        for (const observer of this.observers) {
            observer.update(this, key, message);
        }
    }

    abstract update(observable: VDPObservable, key?: string, message?: string): void;

}