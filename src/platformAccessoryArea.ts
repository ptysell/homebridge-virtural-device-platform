import { Service, PlatformAccessory, CharacteristicValue } from 'homebridge';
import { VDPHomebridgePlatform } from './platform';
import { VDPPlatformAccessory } from './platformAccessory';
import { VDPRoomAccessory } from './platformAccessoryRoom';
import { DEVICE_MANUFACTURER, PLATFORM_NAME, PLUGIN_NAME } from './settings';

export const DEVICE_MODEL = 'Area Accessory Switch';

export class VDPAreaAccessory {

    public name: string;
    private uuid: string;

    private platformAccessories: VDPPlatformAccessory[];

    private manufacturer = DEVICE_MANUFACTURER;
    private model = DEVICE_MODEL;
    private serialNumber: string;

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
        this.platformAccessories = [];
        this.serialNumber = accessory.UUID;


        this.accessory.getService(this.platform.Service.AccessoryInformation)!
            .setCharacteristic(this.platform.Characteristic.Manufacturer, this.manufacturer)
            .setCharacteristic(this.platform.Characteristic.Model, this.model)
            .setCharacteristic(this.platform.Characteristic.SerialNumber, this.serialNumber);

        this.service = this.accessory.getService(this.platform.Service.Switch) || this.accessory.addService(this.platform.Service.Switch);

        this.service.setCharacteristic(this.platform.Characteristic.Name, this.name);

        this.service.getCharacteristic(this.platform.Characteristic.On)
            .onSet(this.setOn.bind(this))                // SET - bind to the `setOn` method below
            .onGet(this.getOn.bind(this));               // GET - bind to the `getOn` method below
    }

    addAccessory(accessory: VDPPlatformAccessory) {
        this.platform.log.debug('Adding New Area Accessory:' + accessory.name + ' to Room ' + this.name);
        // const accessory = new this.platform.api.platformAccessory(name, uuid);
        // const vdpAccessory = new VDPAreaAccessory(this.platform, accessory, this);
        // this.platform.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);

        this.platformAccessories.push(accessory);
    }




    async setOn(value: CharacteristicValue) {

        const setOn = value as boolean;
        let setOnChild = true;
        this.platform.log.debug('Attempting to set ' + this.name + ' from ', this.accessoryState.On + ' to ' + setOn);
        if (setOn){
            await this.turnOn();

        } else {
            await this.turnOff();
        }





        for (const accessory of this.platformAccessories) {
            if (await accessory.getOn()) {
                this.platform.log.debug('Platform Accessory ' + accessory.name + ' is on');
                setOnChild = false;
            }
        }

        if (setOnChild) {
            this.platform.log.debug('All Platform Accessories are off, turing on.......');
            for (const area of this.platformAccessories) {
                area.setOn(setOn);
            }

        }

        this.accessoryState.On = setOn;

        this.platform.log.debug('Set Characteristic On ->', value);
    }

    async turnOn() {

        this.platform.log.debug('Attempting to turn ON accessory ' + this.name + '........');
        this.platform.log.debug('Checking Area Status for ' + this.platformAccessories.length + ' accessories......');

        if(this.platformAccessories.filter(searchObj => searchObj.accessoryStates.On === true).length === 0) {
            this.platform.log.debug('All Platform Accessories are OFF, turning ON......');
            for (const accessory of this.platformAccessories) {
                this.platform.log.debug('Attempting to turn ON accessory ' + accessory.name + '........');
                accessory.setOn(true);
            }
        }

        this.accessoryState.On = true;
        this.platform.log.debug('Set Characteristic On for Area  ->', this.accessoryState.On);

    }

    async turnOff() {
        this.platform.log.debug('Attempting to turn OFF accessory for Area ' + this.name + '........');
        for (const accessory of this.platformAccessories) {
            this.platform.log.debug('Attempting to turn ON accessory for PLATFORM ' + accessory.name + '........');
            accessory.setOn(false);
        }
        this.accessoryState.On = false;
        this.platform.log.debug('Set Characteristic On for Room  ->', this.accessoryState.On);
    }

    async getOn(): Promise<CharacteristicValue> {

        const isOn = this.accessoryState.On;

        this.platform.log.debug('Get Characteristic On ->', isOn);

        return isOn;
    }



}
