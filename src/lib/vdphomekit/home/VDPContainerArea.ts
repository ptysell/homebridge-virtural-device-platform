import { VDPAccessory } from "../accessories/accessory/VDPAccessory";
import { VDPObservable } from "../system/observable";
import { VDPHomeContainer } from "./VDPContainer";

export class VDPArea extends VDPHomeContainer{


 public update(observable: VDPObservable, key?: string, message?: string ): void {

	this.HBPlatform.log.error('----------------');
        if (observable instanceof VDPHomeContainer) {
            this.HBPlatform.log.error('[VDPContainerRoom](Observer.Update)|' + key + '|' + message + '|' + this.name);
        } else if (observable instanceof VDPAccessory) {
            this.HBPlatform.log.error('[VDPAccessory](Observer.Update)|' + key + '|' + message + '|' + this.name);


		}

		this.notify(this.name, '<NOTIFY TEST>');

		this.HBPlatform.log.error('[' + observable.constructor.name + '](Observer.Update)|' + key + '|' + message + '|' + this.name);

    }
	
}