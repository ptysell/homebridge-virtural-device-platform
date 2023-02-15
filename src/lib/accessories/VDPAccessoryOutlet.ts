import { CharacteristicValue, PlatformAccessory } from 'homebridge';
import { VDPHomebridgePlatform } from '../../platform';
import { IVDPAccessoryCharacteristics, IVDPAccessoryState, VDPAccessory } from '../accessory/VDPAccessory';
import { VDPObservable } from '../vdphomekit/system/observable';
import { VDPObserver } from '../vdphomekit/system/observer';

export interface IVDPAccessoryCharacteristicsOutlet extends IVDPAccessoryCharacteristics {
    On: boolean;
    Name?: string;
}

export interface IVDPAccessoryStateOutlet extends IVDPAccessoryState {
    On: boolean;
}

export class VDPAccessoryOutlet extends VDPAccessory {

    protected override DEVICE_MODEL = 'VDP Outlet Accessory';

    protected observers: VDPObserver[] = [];

    protected _accessoryCharacteristics!: IVDPAccessoryCharacteristicsOutlet;
    protected _accessoryState!: IVDPAccessoryStateOutlet;

    constructor(
        protected readonly HBPlatform: VDPHomebridgePlatform,
        protected readonly HBPlatformAccessory: PlatformAccessory,
    ) {
        super(HBPlatform, HBPlatformAccessory);
       // this.DEVICE_MODEL = ''
    }

    protected initialize(): void {

        this._model = this.DEVICE_MODEL;
        console.log('Setting Accessory Model: ' + this.DEVICE_MODEL + ' | ' + this._model);

        this.setAccessoryInformation();
        this.setServices();
        this.setCharacteristics();

    }

    protected setAccessoryInformation(): void {

        this.HBPlatformAccessory.getService(this.HBPlatform.Service.AccessoryInformation)!
            .setCharacteristic(this.HBPlatform.Characteristic.Manufacturer, this._manufacturer)
            .setCharacteristic(this.HBPlatform.Characteristic.Model, this._model)
            .setCharacteristic(this.HBPlatform.Characteristic.SerialNumber, this._serialNumber);

    }


    protected setServices(): void {
        this._accessoryCharacteristics = {On: false, Name: this._name};
        this._accessoryState = {On: false};
        this._hbPlatformAccessoryService = this._hbPlatformAccessory.getService(this._hbPlatform.Service.Switch) || this._hbPlatformAccessory.addService(this._hbPlatform.Service.Switch);
    }

    protected setCharacteristics(): void {

        this._hbPlatformAccessoryService.setCharacteristic(this._hbPlatform.Characteristic.Name, this._name);
        this._hbPlatformAccessoryService.getCharacteristic(this._hbPlatform.Characteristic.On)
            .onSet(this.setOn.bind(this))                // SET - bind to the `setOn` method below
            .onGet(this.getOn.bind(this));               // GET - bind to the `getOn` method below

    }

    async getOn(): Promise<CharacteristicValue> {

        return this._accessoryState.On;

    }

    async setOn(value: CharacteristicValue) {
        this._accessoryState.On = value as boolean;

        this.state = value as boolean;
        this._accessoryCharacteristics.On = value as boolean;

        this.notify();

    }

    public update(observable: VDPObservable): void {
        if (observable instanceof VDPAccessory) {
            this.HBPlatform.log.error('[VDPAccessoryOutlet](Observer.Update) VDPAccessory |' + observable.name + '| Reacted To An Event');
        }
    }


}