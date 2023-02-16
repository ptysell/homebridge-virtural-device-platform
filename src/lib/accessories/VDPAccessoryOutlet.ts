import { CharacteristicValue, PlatformAccessory, Service } from 'homebridge';
import { VDPHomebridgePlatform } from '../../platform';
import { DEVICE_MANUFACTURER } from '../../settings';
import { IVDPAccessoryCharacteristics, VDPAccessory } from '../accessory/VDPAccessory';
import { VDPObservable } from '../vdphomekit/system/observable';

export const DEVICE_MODEL: string = 'VDP Outlet Accessory';

export interface VDPAccessoryCharacteristicsOutlet extends IVDPAccessoryCharacteristics {
    On: boolean;
    getOn(): Promise<CharacteristicValue>;
    setOn(value: CharacteristicValue): void;
    Name?: string;
}
export interface VDPAccessoryCharacteristicsInformation extends IVDPAccessoryCharacteristics {
    Manufacturer: string;
    Model: string;
    SerialNumber: string;
}

export class VDPAccessoryOutlet extends VDPAccessory implements VDPAccessoryCharacteristicsOutlet {
    protected _hbPlatformAccessoryService: Service;

    //protected _accessoryCharacteristics: IVDPAccessoryCharacteristics;

    public On: boolean;

    constructor(
        
        protected readonly platform: VDPHomebridgePlatform,
        protected readonly accessory: PlatformAccessory,

    ) {

        super(platform, accessory);

        this.accessoryInformation.Manufacturer = DEVICE_MANUFACTURER;
        this.accessoryInformation.Model = DEVICE_MODEL;
        this.accessoryInformation.SerialNumber = this.uniqueIdentifier;

        console.log('Setting Accessory Model: ' + this.accessoryInformation.Manufacturer);

        this.HBPlatformAccessory.getService(this.HBPlatform.Service.AccessoryInformation)!
            .setCharacteristic(this.HBPlatform.Characteristic.Manufacturer, this.accessoryInformation.Manufacturer)
            .setCharacteristic(this.HBPlatform.Characteristic.Model, this.accessoryInformation.Model)
            .setCharacteristic(this.HBPlatform.Characteristic.SerialNumber, this.accessoryInformation.SerialNumber);


        this.On = false;
        this._hbPlatformAccessoryService = this.HBPlatformAccessory.getService(this.HBPlatform.Service.Switch) || this.HBPlatformAccessory.addService(this.HBPlatform.Service.Switch);

    }

    async getOn(): Promise<CharacteristicValue> {

        return this.On;

    }

    async setOn(value: CharacteristicValue) {

        this.On = value as boolean;
        
        this.notify();

    }

    public update(observable: VDPObservable): void {
        if (observable instanceof VDPAccessory) {
            this.HBPlatform.log.error('[VDPAccessoryOutlet](Observer.Update) VDPAccessory |' + observable.name + '| Reacted To An Event');
        }
    }


}