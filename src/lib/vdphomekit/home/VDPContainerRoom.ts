import { VDPHomebridgePlatform } from "../../../platform";
import { VDPAccessoryOutlet } from "../../accessories/VDPAccessoryOutlet";
import { VDPAccessorySwitch } from "../../accessories/VDPAccessorySwitch";
import { VDPAccessory } from "../accessories/accessory/VDPAccessory";
import { VDPObservable } from "../system/observable";
import { VDPHomeContainer } from "./VDPContainer";

export class VDPRoom extends VDPHomeContainer{

    public override get accessoryState(): boolean { return this.accessory.On }

    constructor(
        protected readonly withName: string,
        protected readonly platform: VDPHomebridgePlatform,
    ) {
        super(withName, platform);
        this.sender = 'VDPRoom';

    }

    update(observable: VDPObservable, sender: string, action: string, state: string, message: string): void {

        if (observable instanceof VDPAccessorySwitch) {
            if(observable.uniqueIdentifier === this.accessory.uniqueIdentifier) {
                this.HBPlatform.log.error(observable.uniqueIdentifier + ' | ' + this.accessory.uniqueIdentifier);

                if (action === 'setOn') {
                    this.HBPlatform.log.error('Observable | VDPAccessorySwitch | setOn | ' + state);
                    if (state === 'true') {

                        let stateTrigger: boolean = false;

                        for (const accessory of this.accessories) {
                            if (accessory instanceof VDPAccessorySwitch) {
                                const state = accessory.getOn() as boolean;
                                if (state) {
                                    this.HBPlatform.log.error('Accessories | getOn | Hit');
                                    stateTrigger = true;
                                }
                            }
                        }

                        for (const container of this.containers) {
                            for (const accessory of container.accessories) {
                                if (accessory instanceof VDPAccessorySwitch) {
                                    const state = accessory.getOn() as boolean;
                                    if (state) {
                                        stateTrigger = true;
                                    }
                                }

                            }
                        }

                        if (stateTrigger === false) {
                            for (const accessory of this.accessories) {
                                if (accessory instanceof VDPAccessorySwitch) {
                                    accessory.setOn(true);
                                }
                            }
                            for (const container of this.containers) {
                                for (const accessory of container.accessories) {
                                    if (accessory instanceof VDPAccessorySwitch) {
                                        accessory.setOn(true);
                                    }
                                }
                            }


                        }




                        this.HBPlatform.log.warn('Room Switch Status: TRUE');

                    } else if (state === 'false') {
                        this.HBPlatform.log.warn('Room Switch Status: FALSE');
                        for (const accessory of this.accessories) {
                            if (accessory instanceof VDPAccessorySwitch) {
                                accessory.setOn(false);
                            }
                        }
                        for (const container of this.containers) {
                            for (const accessory of container.accessories) {
                                if (accessory instanceof VDPAccessorySwitch) {
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

//  public update(observable: VDPObservable, sender: string): void {

// 	this.HBPlatform.log.error('----------------');
//         if (observable instanceof VDPHomeContainer) {
//             this.HBPlatform.log.error('[VDPContainerRoom](Observer.Update)|' + key + '|' + message + '|' + this.name);
//         } else if (observable instanceof VDPAccessory) {
//             this.HBPlatform.log.error('[VDPAccessory](Observer.Update)|' + key + '|' + message + '|' + this.name);


// 		}

// 		this.notify(this.name, '<NOTIFY TEST>');

// 		this.HBPlatform.log.error('[' + observable.constructor.name + '](Observer.Update)|' + key + '|' + message + '|' + this.name);

//     }
	
}