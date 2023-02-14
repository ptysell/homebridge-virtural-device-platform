"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VDPRoomAccessory = exports.DEVICE_MODEL = void 0;
const settings_1 = require("./settings");
exports.DEVICE_MODEL = 'Room Accessory Switch';
class VDPRoomAccessory {
    constructor(platform, accessory) {
        this.platform = platform;
        this.accessory = accessory;
        this.manufacturer = settings_1.DEVICE_MANUFACTURER;
        this.model = exports.DEVICE_MODEL;
        this.accessoryState = {
            On: false,
        };
        this.name = accessory.displayName;
        this.uuid = accessory.UUID;
        this.areaAccessories = [];
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
    addArea(area) {
        this.platform.log.debug('Adding New Area Accessory:' + area.name + ' to Room ' + this.name);
        // const accessory = new this.platform.api.platformAccessory(name, uuid);
        // const vdpAccessory = new VDPAreaAccessory(this.platform, accessory, this);
        // this.platform.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
        this.areaAccessories.push(area);
    }
    async setOn(value) {
        const setOn = value;
        this.platform.log.debug('Attempting to set ' + this.name + ' from ', this.accessoryState.On + ' to ' + setOn);
        if (setOn) {
            await this.turnOn();
        }
        else {
            await this.turnOff();
        }
        this.accessoryState.On = setOn;
        this.platform.log.debug('Set Characteristic On ->', value);
    }
    async turnOn() {
        this.platform.log.debug('Attempting to turn ON accessory for ROOM ' + this.name + '........');
        this.platform.log.debug('Checking Area Status for ' + this.areaAccessories.length + ' areas......');
        if (this.areaAccessories.filter(searchObj => searchObj.accessoryState.On === true).length === 0) {
            this.platform.log.debug('All AREAS are OFF, turning all AREAS ON......');
            for (const area of this.areaAccessories) {
                this.platform.log.debug('Attempting to turn ON accessory for AREA ' + area.name + '........');
                await area.setOn(true);
            }
        }
        // this.accessoryState.On = true;
        //this.platform.log.warn('Set Characteristic On for ROOM ' + this.name + '  ->', this.accessoryState.On);
    }
    async turnOff() {
        this.platform.log.debug('Attempting to turn OFF accessory for ROOM ' + this.name + '........');
        for (const area of this.areaAccessories) {
            if (area.accessoryState) {
                this.platform.log.debug('Attempting to turn OFF accessory for AREA ' + area.name + '........');
                await area.setOn(false);
            }
        }
        this.accessoryState.On = false;
        this.platform.log.warn('Set Characteristic On for ROOM ' + this.name + '  ->', this.accessoryState.On);
    }
    async getOn() {
        const isOn = this.accessoryState.On;
        this.platform.log.warn('Get Characteristic On for ROOM ' + this.name + '  ->', isOn);
        return isOn;
    }
}
exports.VDPRoomAccessory = VDPRoomAccessory;
//# sourceMappingURL=platformAccessoryRoom.js.map