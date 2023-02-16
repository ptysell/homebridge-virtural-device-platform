import { CharacteristicValue, PlatformAccessory, Service } from 'homebridge';
import { VDPHomebridgePlatform } from '../../platform';
import { DEVICE_MANUFACTURER } from '../../settings';
import { IVDPAccessoryCharacteristics, VDPAccessory } from '../vdphomekit/accessories/accessory/VDPAccessory';
import { VDPObservable } from '../vdphomekit/system/observable';

export const DEVICE_MODEL: string = 'VDP Switch Accessory';

export interface VDPAccessoryCharacteristicsSwitch extends IVDPAccessoryCharacteristics {
    On: boolean;
    getOn(): CharacteristicValue;
    //getOn(): Promise<CharacteristicValue>;
    setOn(value: CharacteristicValue): void;
    name: string;
}

export class VDPAccessorySwitch extends VDPAccessory implements VDPAccessoryCharacteristicsSwitch {
    
    protected _hbPlatformAccessoryService: Service;

    public On: boolean;

    constructor(
        
        protected readonly platform: VDPHomebridgePlatform,
        protected readonly accessory: PlatformAccessory,

    ) {

        super(platform, accessory);

        this.name = this.name + ' Switch';

        this.accessoryInformation.Manufacturer = DEVICE_MANUFACTURER;
        this.accessoryInformation.Model = DEVICE_MODEL;
        this.accessoryInformation.SerialNumber = this.uniqueIdentifier;

        this.HBPlatformAccessory.getService(this.HBPlatform.Service.AccessoryInformation)!
            .setCharacteristic(this.HBPlatform.Characteristic.Manufacturer, this.accessoryInformation.Manufacturer)
            .setCharacteristic(this.HBPlatform.Characteristic.Model, this.accessoryInformation.Model)
            .setCharacteristic(this.HBPlatform.Characteristic.SerialNumber, this.accessoryInformation.SerialNumber);

        this.On = false;
        this._hbPlatformAccessoryService = this.HBPlatformAccessory.getService(this.HBPlatform.Service.Switch) || 
            this.HBPlatformAccessory.addService(this.HBPlatform.Service.Switch);

        this.HBPlatformAccessoryService.setCharacteristic(this.platform.Characteristic.Name, this.name);

        this.HBPlatformAccessoryService.getCharacteristic(this.platform.Characteristic.On)
            .onSet(this.setOn.bind(this))                // SET - bind to the `setOn` method below
            .onGet(this.getOn.bind(this));               // GET - bind to the `getOn` method below

    }

    getOn(): CharacteristicValue { // Promise<CharacteristicValue> {
        this.HBPlatform.log.debug('[VDPAccessorySwitch](' + this.name + ')<getOn> ', this.On)
        return this.On;
    }

    setOn(value: CharacteristicValue) {
        this.HBPlatform.log.debug('[VDPAccessorySwitch](' + this.name + ')<setOn> ', this.On + '|' + value)
        this.On = value as boolean;
        this.notify(this.name , '<setOn>');
    }

    public update(observable: VDPObservable, key?: string, message?: string ): void {
        if (observable instanceof VDPAccessory) {
            this.HBPlatform.log.error('[VDPAccessorySwitch](Observer.Update)|' + key + '|' + message + '|' + this.name);
        }
        this.HBPlatform.log.error('[VDPAccessorySwitch](Observer.Update)|' + key + '|' + message + '|' + this.name);

    }

}