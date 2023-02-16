"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VDPHomebridgePlatform = void 0;
const settings_1 = require("./settings");
const VDPAccessory_1 = require("./lib/vdphomekit/accessories/accessory/VDPAccessory");
const VDPRoom_1 = require("./lib/vdphomekit/home/VDPRoom");
const VDPAccessorySwitch_1 = require("./lib/accessories/VDPAccessorySwitch");
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
        this.Rooms = [];
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
            this.log.warn('[VDPHomebridgePlatform](Observer.Update) VDPAccessory |' + observable.name + '| Reacted To An Event');
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
                roomAccessories: [{
                        accessoryID: 'Room01Accessory01',
                        accessoryName: 'Room 01 Accessory 01',
                    },
                    {
                        accessoryID: 'Room01Accessory02',
                        accessoryName: 'Room 01 Accessory 02',
                    },
                    {
                        accessoryID: 'Room01Accessory03',
                        accessoryName: 'Room 01 Accessory 03',
                    },
                ],
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
                roomAccessories: [{
                        accessoryID: 'Room02Accessory01',
                        accessoryName: 'Room 02 Accessory 01',
                    },
                    {
                        accessoryID: 'Room02Accessory02',
                        accessoryName: 'Room 02 Accessory 02',
                    },
                    {
                        accessoryID: 'Room02Accessory03',
                        accessoryName: 'Room 02 Accessory 03',
                    },
                ],
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
            this.log.error('Iterating ROOOM: ' + room.roomName);
            const TestRoom = new VDPRoom_1.VDPRoom(room.roomName, this);
            for (const TestRoomAccessory of room.roomAccessories) {
                this.log.error('Iterating ROOOM ACCESSORY: ' + TestRoomAccessory.accessoryName);
                const TestRoomAccessoryUUID = this.api.hap.uuid.generate(TestRoomAccessory.accessoryID);
                let TestRoomAccessory2;
                const existingTestRoomAccessory = this.accessories.find(accessory => accessory.UUID === TestRoomAccessoryUUID);
                if (existingTestRoomAccessory) {
                    this.log.debug('Restoring ROOM ACCESSORY form Cache:' + existingTestRoomAccessory.displayName);
                    TestRoomAccessory2 = new VDPAccessorySwitch_1.VDPAccessorySwitch(this, existingTestRoomAccessory);
                }
                else {
                    this.log.debug('Adding New ROOM ACCESSORY:' + TestRoomAccessory.accessoryName);
                    const accessory = new this.api.platformAccessory(TestRoomAccessory.accessoryName, TestRoomAccessoryUUID);
                    TestRoomAccessory2 = new VDPAccessorySwitch_1.VDPAccessorySwitch(this, accessory);
                    this.api.registerPlatformAccessories(settings_1.PLUGIN_NAME, settings_1.PLATFORM_NAME, [accessory]);
                }
                TestRoom.addAccessory(TestRoomAccessory2);
            }
        }
    }
}
exports.VDPHomebridgePlatform = VDPHomebridgePlatform;
//# sourceMappingURL=platform.js.map