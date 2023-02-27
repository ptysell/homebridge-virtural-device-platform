"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VDPRoom = void 0;
const VDPAccessorySwitch_1 = require("../../accessories/VDPAccessorySwitch");
const VDPContainer_1 = require("./VDPContainer");
class VDPRoom extends VDPContainer_1.VDPHomeContainer {
    constructor(withName, platform) {
        super(withName, platform);
        this.withName = withName;
        this.platform = platform;
        this.sender = 'VDPRoom';
    }
    get accessoryState() { return this.accessory.On; }
    update(observable, sender, action, state, message) {
        if (observable instanceof VDPAccessorySwitch_1.VDPAccessorySwitch) {
            if (observable.uniqueIdentifier === this.accessory.uniqueIdentifier) {
                this.HBPlatform.log.error(observable.uniqueIdentifier + ' | ' + this.accessory.uniqueIdentifier);
                if (action === 'setOn') {
                    this.HBPlatform.log.error('Observable | VDPAccessorySwitch | setOn | ' + state);
                    if (state === 'true') {
                        let stateTrigger = false;
                        for (const accessory of this.accessories) {
                            if (accessory instanceof VDPAccessorySwitch_1.VDPAccessorySwitch) {
                                const state = accessory.getOn();
                                if (state) {
                                    this.HBPlatform.log.error('Accessories | getOn | Hit');
                                    stateTrigger = true;
                                }
                            }
                        }
                        for (const container of this.containers) {
                            for (const accessory of container.accessories) {
                                if (accessory instanceof VDPAccessorySwitch_1.VDPAccessorySwitch) {
                                    const state = accessory.getOn();
                                    if (state) {
                                        stateTrigger = true;
                                    }
                                }
                            }
                        }
                        if (stateTrigger === false) {
                            for (const accessory of this.accessories) {
                                if (accessory instanceof VDPAccessorySwitch_1.VDPAccessorySwitch) {
                                    accessory.setOn(true);
                                }
                            }
                            for (const container of this.containers) {
                                for (const accessory of container.accessories) {
                                    if (accessory instanceof VDPAccessorySwitch_1.VDPAccessorySwitch) {
                                        accessory.setOn(true);
                                    }
                                }
                            }
                        }
                        this.HBPlatform.log.warn('Room Switch Status: TRUE');
                    }
                    else if (state === 'false') {
                        this.HBPlatform.log.warn('Room Switch Status: FALSE');
                        for (const accessory of this.accessories) {
                            if (accessory instanceof VDPAccessorySwitch_1.VDPAccessorySwitch) {
                                accessory.setOn(false);
                            }
                        }
                        for (const container of this.containers) {
                            for (const accessory of container.accessories) {
                                if (accessory instanceof VDPAccessorySwitch_1.VDPAccessorySwitch) {
                                    accessory.setOn(false);
                                }
                            }
                        }
                    }
                }
                //this.accessoryState = accessory.On;
                this.HBPlatform.log.warn('Room Switch Status: ' + this.accessory.getOn());
            }
        }
        this.HBPlatform.log.error('----------------');
        this.HBPlatform.log.error('[' + sender + '](Observer.Update)|' + action + '|' + state + '|' + message);
        // if (observable instanceof VDPHomeContainer) {
        //     this.HBPlatform.log.error('[VDPContainerRoom](Observer.Update)|' + action + '|' + state + '|' + message);
        // } else if (observable instanceof VDPAccessory) {
        //     this.HBPlatform.log.error('[VDPAccessory](Observer.Update)|' + key + '|' + message + '|' + this.name);
        // }
        //this.notify('TEST ACTION', 'TEST STATE', 'TEST MESSAGE');
    }
}
exports.VDPRoom = VDPRoom;
//# sourceMappingURL=VDPContainerRoom.js.map