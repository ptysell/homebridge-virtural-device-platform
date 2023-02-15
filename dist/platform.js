"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VDPHomebridgePlatform = void 0;
const settings_1 = require("./settings");
const VDPAccessoryOutlet_1 = require("./lib/accessories/VDPAccessoryOutlet");
const VDPAccessory_1 = require("./lib/accessory/VDPAccessory");
/**
 * HomebridgePlatform
 * This class is the main constructor for your plugin, this is where you should
 * parse the user config and discover/register accessories with Homebridge.
 */
class VDPHomebridgePlatform {
    constructor(log, config, api) {
        this.log = log;
        this.config = config;
        this.api = api;
        this.Service = this.api.hap.Service;
        this.Characteristic = this.api.hap.Characteristic;
        // this is used to track restored cached accessories
        this.accessories = [];
        this.log.debug('Finished initializing platform:', this.config.name);
        // When this event is fired it means Homebridge has restored all cached accessories from disk.
        // Dynamic Platform plugins should only register new accessories after this event was fired,
        // in order to ensure they weren't added to homebridge already. This event can also be used
        // to start discovery of new accessories.
        this.api.on('didFinishLaunching', () => {
            log.debug('Executed didFinishLaunching callback');
            // run the method to discover / register your devices as accessories
            this.discoverDevices();
        });
    }
    update(observable) {
        if (observable instanceof VDPAccessory_1.VDPAccessory) {
            this.log.warn('HBPlatform reacted to an event');
            this.log.warn('Observable: ' + observable.name + ' changed to ' + observable.state);
        }
    }
    /**
   * This function is invoked when homebridge restores cached accessories from disk at startup.
   * It should be used to setup event handlers for characteristics and update respective values.
   */
    configureAccessory(accessory) {
        this.log.info('Loading accessory from cache:', accessory.displayName);
        // add the restored accessory to the accessories cache so we can track if it has already been registered
        this.accessories.push(accessory);
    }
    /**
   * This is an example method showing how to register discovered accessories.
   * Accessories must only be registered once, previously created accessories
   * must not be registered again to prevent "duplicate UUID" errors.
   */
    discoverDevices() {
        // EXAMPLE ONLY
        // A real plugin you would discover accessories from the local network, cloud services
        // or a user-defined array in the platform config.
        const exampleDevices = [
            {
                roomID: 'Room01',
                roomName: 'Room 01',
                roomAreas: [{
                        areaID: 'Room01Area01',
                        areaName: 'Room 01 Area 01',
                        areaAccessories: [{
                                accessoryID: 'Room01Area01Accessory01',
                                accessoryName: 'Room 01 Area 01 Accessory 01',
                            },
                            {
                                accessoryID: 'Room01Area01Accessory02',
                                accessoryName: 'Room 01 Area 01 Accessory 02',
                            },
                            {
                                accessoryID: 'Room01Area01Accessory03',
                                accessoryName: 'Room 01 Area 01 Accessory 03',
                            },
                        ],
                    }, {
                        areaID: 'Room01Area02',
                        areaName: 'Room 01 Area 02',
                        areaAccessories: [{
                                accessoryID: 'Room01Area02Accessory01',
                                accessoryName: 'Room 01 Area 02 Accessory 01',
                            },
                            {
                                accessoryID: 'Room01Area02Accessory02',
                                accessoryName: 'Room 01 Area 02 Accessory 02',
                            },
                            {
                                accessoryID: 'Room01Area01Accessory03',
                                accessoryName: 'Room 01 Area 02 Accessory 03',
                            },
                        ],
                    }],
            }, {
                roomID: 'Room02',
                roomName: 'Room 02',
                roomAreas: [{
                        areaID: 'Room02Area01',
                        areaName: 'Room 02 Area 01',
                        areaAccessories: [{
                                accessoryID: 'Room02Area01Accessory01',
                                accessoryName: 'Room 02 Area 01 Accessory 01',
                            },
                            {
                                accessoryID: 'Room02Area01Accessory02',
                                accessoryName: 'Room 02 Area 01 Accessory 02',
                            },
                            {
                                accessoryID: 'Room02Area01Accessory03',
                                accessoryName: 'Room 02 Area 01 Accessory 03',
                            },
                        ],
                    }, {
                        areaID: 'Room02Area02',
                        areaName: 'Room 02 Area 02',
                        areaAccessories: [{
                                accessoryID: 'Room02Area02Accessory01',
                                accessoryName: 'Room 02 Area 02 Accessory 01',
                            },
                            {
                                accessoryID: 'Room02Area02Accessory02',
                                accessoryName: 'Room 02 Area 02 Accessory 02',
                            },
                            {
                                accessoryID: 'Room02Area01Accessory03',
                                accessoryName: 'Room 02 Area 02 Accessory 03',
                            },
                        ],
                    }],
            }
        ];
        // },
        //     }],
        //         exampleUniqueId: 'ABCD',
        //         exampleDisplayName: 'Bedroom',
        //     },
        //     {
        //         exampleUniqueId: 'EFGH',
        //         exampleDisplayName: 'Kitchen',
        //     },
        // ];
        // loop over the discovered devices and register each one if it has not already been registered
        for (const room of exampleDevices) {
            const roomUUID = this.api.hap.uuid.generate(room.roomID);
            const existingRoomAccessory = this.accessories.find(accessory => accessory.UUID === roomUUID);
            let roomAccessory;
            if (existingRoomAccessory) {
                this.log.debug('Restoring ROOM Accessory form Cache:' + existingRoomAccessory.displayName);
                roomAccessory = new VDPAccessoryOutlet_1.VDPAccessoryOutlet(this, existingRoomAccessory);
            }
            else {
                this.log.debug('Adding New ROOM Accessory:' + room.roomName);
                const accessory = new this.api.platformAccessory(room.roomName, roomUUID);
                roomAccessory = new VDPAccessoryOutlet_1.VDPAccessoryOutlet(this, accessory);
                this.api.registerPlatformAccessories(settings_1.PLUGIN_NAME, settings_1.PLATFORM_NAME, [accessory]);
            }
            roomAccessory.attach(this);
            for (const area of room.roomAreas) {
                const areaUUID = this.api.hap.uuid.generate(area.areaID);
                const existingAreaAccessory = this.accessories.find(accessory => accessory.UUID === areaUUID);
                let areaAccessory;
                if (existingAreaAccessory) {
                    this.log.debug('Restoring AREA Accessory form Cache:' + existingAreaAccessory.displayName);
                    areaAccessory = new VDPAccessoryOutlet_1.VDPAccessoryOutlet(this, existingAreaAccessory);
                }
                else {
                    this.log.debug('Adding New AREA Accessory:' + area.areaName);
                    const accessory = new this.api.platformAccessory(area.areaName, areaUUID);
                    areaAccessory = new VDPAccessoryOutlet_1.VDPAccessoryOutlet(this, accessory);
                    this.api.registerPlatformAccessories(settings_1.PLUGIN_NAME, settings_1.PLATFORM_NAME, [accessory]);
                }
                areaAccessory.attach(this);
                areaAccessory.attach(roomAccessory);
            }
            //     for (const area of room.roomAreas) {
            //         const areaUUID = this.api.hap.uuid.generate(area.areaID);
            //         const existingAreaAccessory = this.accessories.find(accessory => accessory.UUID === areaUUID);
            //         let areaAccessory: VDPAreaAccessory;
            //         if (existingAreaAccessory) {
            //             this.log.debug('Restoring Area Accessory form Cache:' + existingAreaAccessory.displayName);
            //             areaAccessory = new VDPAreaAccessory(this, existingAreaAccessory, roomAccessory);
            //         } else {
            //             this.log.debug('Adding New Area Accessory:' + area.areaName);
            //             const accessory = new this.api.platformAccessory(area.areaName, areaUUID);
            //             areaAccessory = new VDPAreaAccessory(this, accessory, roomAccessory);
            //             this.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
            //         }
            //         roomAccessory.addArea(areaAccessory);
            //         for (const device of area.areaAccessories) {
            //             const accessoryUUID = this.api.hap.uuid.generate(device.accessoryID);
            //             const existingAccessory = this.accessories.find(accessory => accessory.UUID === accessoryUUID);
            //             if (existingAccessory) {
            //                 this.log.debug('Restoring Accessory form Cache:' + existingAccessory.displayName);
            //                 new VDPPlatformAccessory(this, existingAccessory, accessoryType.Accessory, roomUUID, areaUUID, accessoryUUID);
            //             } else {
            //                 this.log.debug('Adding New Accessory:' + device.accessoryName);
            //                 const accessory = new this.api.platformAccessory(device.accessoryName, accessoryUUID);
            //                 new VDPPlatformAccessory(this, accessory, accessoryType.Accessory, roomUUID, areaUUID, accessoryUUID);
            //                 this.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
            //             }
            //         }
        }
    }
}
exports.VDPHomebridgePlatform = VDPHomebridgePlatform;
//# sourceMappingURL=platform.js.map