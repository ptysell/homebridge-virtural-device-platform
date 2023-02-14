"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VDPAreaAccessory = exports.DEVICE_MODEL = void 0;
const settings_1 = require("./settings");
exports.DEVICE_MODEL = 'Area Accessory Switch';
class VDPAreaAccessory {
    constructor(platform, accessory, room) {
        this.platform = platform;
        this.accessory = accessory;
        this.room = room;
        this.manufacturer = settings_1.DEVICE_MANUFACTURER;
        this.model = exports.DEVICE_MODEL;
        this.accessoryState = {
            On: false,
        };
        this.name = accessory.displayName;
        this.uuid = accessory.UUID;
        this.platformAccessories = [];
        this.serialNumber = accessory.UUID;
        this.accessory.getService(this.platform.Service.AccessoryInformation)
            .setCharacteristic(this.platform.Characteristic.Manufacturer, this.manufacturer)
            .setCharacteristic(this.platform.Characteristic.Model, this.model)
            .setCharacteristic(this.platform.Characteristic.SerialNumber, this.serialNumber);
        this.service = this.accessory.getService(this.platform.Service.Switch) || this.accessory.addService(this.platform.Service.Switch);
        this.service.setCharacteristic(this.platform.Characteristic.Name, this.name);
        this.service.getCharacteristic(this.platform.Characteristic.On)
            .onSet(this.setOn.bind(this)) // SET - bind to the `setOn` method below
            .onGet(this.getOn.bind(this)); // GET - bind to the `getOn` method below
    }
    addAccessory(accessory) {
        this.platform.log.debug('Adding New Area Accessory:' + accessory.name + ' to AREA ' + this.name);
        // const accessory = new this.platform.api.platformAccessory(name, uuid);
        // const vdpAccessory = new VDPAreaAccessory(this.platform, accessory, this);
        // this.platform.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
        this.platformAccessories.push(accessory);
    }
    async setOn(value) {
        const setOn = value;
        this.platform.log.debug('Attempting to set ' + this.name + ' from ', this.accessoryState.On + ' to ' + setOn);
        if (setOn) {
            this.turnOn();
        }
        else {
            this.turnOff();
        }
        //this.accessoryState.On = setOn;
        //this.platform.log.debug('Set Characteristic On ->', value);
    }
    async turnOn() {
        this.platform.log.debug('Attempting to turn ON accessory for AREA ' + this.name + '........');
        this.platform.log.debug('Checking PLATFORM ACCESSORY Status for ' + this.platformAccessories.length + ' PLATFORM ACCESSORIES......');
        if (this.platformAccessories.filter(searchObj => searchObj.accessoryState.On === true).length === 0) {
            this.platform.log.debug('All PLATFORM ACCESSORIES are OFF, turning all PLATFORM ACCESSORIES ON......');
            for (const accessory of this.platformAccessories) {
                this.platform.log.debug('Attempting to turn ON accessory for PLATFORM ACCESSORY ' + accessory.name + '........');
                await accessory.setOn(true);
            }
        }
        this.accessoryState.On = true;
        this.platform.log.warn('Set Characteristic On for AREA ' + this.name + '  ->', this.accessoryState.On);
        if (this.room.areaAccessories.filter(searchObj => searchObj.accessoryState.On === true).length === 0) {
            this.platform.log.warn('Set ROOM ' + this.room.name + ' ON');
            this.room.setOn(true);
        }
    }
    async turnOff() {
        this.platform.log.debug('Attempting to turn OFF accessory for AREA ' + this.name + '........');
        for (const accessory of this.platformAccessories) {
            if (accessory.accessoryState) {
                this.platform.log.debug('Attempting to turn OFF accessory for PLATFORM ACCESSORY ' + accessory.name + '........');
                await accessory.setOn(false);
            }
        }
        this.accessoryState.On = false;
        this.platform.log.warn('Set Characteristic On for AREA ' + this.name + '  ->', this.accessoryState.On);
        if (this.room.areaAccessories.filter(searchObj => searchObj.accessoryState.On === true).length === 0) {
            this.platform.log.warn('All AREA in ROOM are OFF, set ROOM ' + this.room.name + ' OFF');
            this.room.setOn(false);
        }
    }
    async getOn() {
        const isOn = this.accessoryState.On;
        this.platform.log.warn('Get Characteristic On for AREA ' + this.name + '  ->', isOn);
        return isOn;
    }
}
exports.VDPAreaAccessory = VDPAreaAccessory;
//# sourceMappingURL=platformAccessoryArea.js.map