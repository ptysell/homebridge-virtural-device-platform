import { VDPHomebridgePlatform } from "../../../platform";
import { VDPAccessory } from "../accessories/accessory/VDPAccessory";
import { VDPObservable } from "../system/observable";
import { VDPHomeContainer } from "./VDPContainer";

export class VDPRoom extends VDPHomeContainer{


    constructor(
        protected readonly withName: string,
        protected readonly platform: VDPHomebridgePlatform,
    ) {
        super(withName, platform);
        this.sender = 'VDPRoom';

    }

    update(observable: VDPObservable, sender: string, action: string, state: string, message: string): void {

	    this.HBPlatform.log.error('----------------');
        this.HBPlatform.log.error('[' + sender + '](Observer.Update)|' + action + '|' + state + '|' + message);

        // if (observable instanceof VDPHomeContainer) {
        //     this.HBPlatform.log.error('[VDPContainerRoom](Observer.Update)|' + action + '|' + state + '|' + message);
        // } else if (observable instanceof VDPAccessory) {
        //     this.HBPlatform.log.error('[VDPAccessory](Observer.Update)|' + key + '|' + message + '|' + this.name);
		// }

		this.notify('TEST ACTION', 'TEST STATE', 'TEST MESSAGE');

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