import { CharacteristicValue } from 'homebridge';
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

    protected DEVICE_MODEL: string = "VDP Outlet Accessory";

    protected observers: VDPObserver[] = [];

    protected _accessoryCharacteristics!: IVDPAccessoryCharacteristicsOutlet;
    protected _accessoryState!: IVDPAccessoryStateOutlet;

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
        this.HBPlatform.log.error('VDPAccessoryOutlet Reacted To An Event');
        if (observable instanceof VDPAccessory && observable.state === true) {
            //console.log('ConcreteObserverA: Reacted to the event.');
        }
    }


}