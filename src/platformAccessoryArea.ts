import { Service, PlatformAccessory, CharacteristicValue } from 'homebridge';
import { VDPHomebridgePlatform } from './platform';
import { VDPRoomAccessory } from './platformAccessoryRoom';

export class VDPAreaAccessory {

    public readonly name: string | unknown;
    private uuid: string | unknown;


    private manufacturer = 'Virtual device Platform';
    private model = 'Room Accessory';
    private serialNumber: string | unknown;

    private service: Service;

    public accessoryState = {
        On: false,
    };

    constructor(
      private readonly platform: VDPHomebridgePlatform,
      private readonly accessory: PlatformAccessory,
      private readonly room: VDPRoomAccessory,
    ) {

        this.name = accessory.displayName;
        this.uuid = accessory.UUID;
        this.serialNumber = accessory.UUID;


              this.accessory.getService(this.platform.Service.AccessoryInformation)!
                  .setCharacteristic(this.platform.Characteristic.Manufacturer, 'Default-Manufacturer')
                  .setCharacteristic(this.platform.Characteristic.Model, 'Default-Model')
                  .setCharacteristic(this.platform.Characteristic.SerialNumber, 'Default-Serial');

              this.service = this.accessory.getService(this.platform.Service.Switch) || this.accessory.addService(this.platform.Service.Switch);

              this.service.setCharacteristic(this.platform.Characteristic.Name, accessory.context.device.exampleDisplayName);

              this.service.getCharacteristic(this.platform.Characteristic.On)
                  .onSet(this.setOn.bind(this))                // SET - bind to the `setOn` method below
                  .onGet(this.getOn.bind(this));               // GET - bind to the `getOn` method below
    }

    async setOn(value: CharacteristicValue) {

        //Accessory Set Value
        const setOn = value as boolean;


        // implement your own code to turn your device on/off
        this.accessoryState.On = value as boolean;

        this.platform.log.debug('Set Characteristic On ->', value);
    }

    async getOn(): Promise<CharacteristicValue> {
    // implement your own code to check if the device is on
        const isOn = this.accessoryState.On;

        this.platform.log.debug('Get Characteristic On ->', isOn);

        // if you need to return an error to show the device as "Not Responding" in the Home app:
        // throw new this.platform.api.hap.HapStatusError(this.platform.api.hap.HAPStatus.SERVICE_COMMUNICATION_FAILURE);

        return isOn;
    }

}
