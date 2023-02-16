import { API, DynamicPlatformPlugin, Logger, PlatformAccessory, PlatformConfig, Service, Characteristic } from 'homebridge';

import { PLATFORM_NAME, PLUGIN_NAME } from './settings';
import { accessoryType, VDPPlatformAccessory } from './platformAccessory';
import { VDPAreaAccessory } from './platformAccessoryArea';
import { VDPRoomAccessory } from './platformAccessoryRoom';
import { VDPAccessoryOutlet } from './lib/accessories/VDPAccessoryOutlet';
import { VDPAccessory } from './lib/accessory/VDPAccessory';
import { VDPObserver } from './lib/vdphomekit/system/observer';
import { VDPObservable } from './lib/vdphomekit/system/observable';


/**
 * HomebridgePlatform
 * This class is the main constructor for your plugin, this is where you should
 * parse the user config and discover/register accessories with Homebridge.
 */
export class VDPHomebridgePlatform implements DynamicPlatformPlugin, VDPObserver {

    public readonly Service: typeof Service = this.api.hap.Service;
    public readonly Characteristic: typeof Characteristic = this.api.hap.Characteristic;

    // this is used to track restored cached accessories
    public readonly accessories: PlatformAccessory[] = [];


    constructor(
    public readonly log: Logger,
    public readonly config: PlatformConfig,
    public readonly api: API,
    ) {

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

    public update(observable: VDPObservable): void {
        if (observable instanceof VDPAccessory) {
            this.log.warn('[VDPHomebridgePlatform](Observer.Update) VDPAccessory |' + observable.name + '| Reacted To An Event');
        }
    }


    /**
   * This function is invoked when homebridge restores cached accessories from disk at startup.
   * It should be used to setup event handlers for characteristics and update respective values.
   */
    configureAccessory(accessory: PlatformAccessory) {
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
            }];

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
            let roomAccessory: VDPAccessoryOutlet;

            if (existingRoomAccessory) {
                this.log.debug('Restoring ROOM Accessory form Cache:' + existingRoomAccessory.displayName);
                roomAccessory = new VDPAccessoryOutlet(this, existingRoomAccessory);
            } else {
                this.log.debug('Adding New ROOM Accessory:' + room.roomName);
                const accessory = new this.api.platformAccessory(room.roomName, roomUUID);
                roomAccessory = new VDPAccessoryOutlet(this, accessory);
                this.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
            }

            for (const area of room.roomAreas) {

                const areaUUID = this.api.hap.uuid.generate(area.areaID);
                const existingAreaAccessory = this.accessories.find(accessory => accessory.UUID === areaUUID);
                let areaAccessory: VDPAccessoryOutlet;

                if (existingAreaAccessory) {
                    this.log.debug('Restoring AREA Accessory form Cache:' + existingAreaAccessory.displayName);
                    areaAccessory = new VDPAccessoryOutlet(this, existingAreaAccessory);
                } else {
                    this.log.debug('Adding New AREA Accessory:' + area.areaName);
                    const accessory = new this.api.platformAccessory(area.areaName, areaUUID);
                    areaAccessory = new VDPAccessoryOutlet(this, accessory);
                    this.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
    
                }

                roomAccessory.attach(areaAccessory);
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




    //     for (const device of exampleDevices) {

    //         device.exampleRoomAreas = 0;


    //         // generate a unique id for the accessory this should be generated from
    //         // something globally unique, but constant, for example, the device serial
    //         // number or MAC address
    //         const uuid = this.api.hap.uuid.generate(device.exampleUniqueId);

    //         // see if an accessory with the same uuid has already been registered and restored from
    //         // the cached devices we stored in the `configureAccessory` method above
    //         const existingAccessory = this.accessories.find(accessory => accessory.UUID === uuid);

    //         if (existingAccessory) {
    //             // the accessory already exists
    //             this.log.info('Restoring existing accessory from cache:', existingAccessory.displayName);

    //             // if you need to update the accessory.context then you should run `api.updatePlatformAccessories`. eg.:
    //             // existingAccessory.context.device = device;
    //             // this.api.updatePlatformAccessories([existingAccessory]);

    //             // create the accessory handler for the restored accessory
    //             // this is imported from `platformAccessory.ts`
    //             new ExamplePlatformAccessory(this, existingAccessory);

    //             // it is possible to remove platform accessories at any time using `api.unregisterPlatformAccessories`, eg.:
    //             // remove platform accessories when no longer present
    //             // this.api.unregisterPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [existingAccessory]);
    //             // this.log.info('Removing existing accessory from cache:', existingAccessory.displayName);
    //         } else {
    //             // the accessory does not yet exist, so we need to create it
    //             this.log.info('Adding new accessory:', device.exampleDisplayName);

    //             // create a new accessory
    //             const accessory = new this.api.platformAccessory(device.exampleDisplayName, uuid);

    //             // store a copy of the device object in the `accessory.context`
    //             // the `context` property can be used to store any data about the accessory you may need
    //             accessory.context.device = device;

    //             // create the accessory handler for the newly create accessory
    //             // this is imported from `platformAccessory.ts`
    //             new ExamplePlatformAccessory(this, accessory);

    //             // link the accessory to your platform
    //             this.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
    //         }
    //     }
}
