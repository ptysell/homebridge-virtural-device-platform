// import { API, Categories, Characteristic, PlatformAccessory, Service } from 'homebridge';
// import { HomebridgeAPI } from 'homebridge/lib/api';
// import { VDPHome } from '../home/VDPHome';
// import { VDPRoom } from '../home/VDPRoom';
// //import { VDPAccessoryCategory } from './VDPAccessoryCategory';
// //import { VDPAccessoryCategoryType } from './VDPAccessoryCategoryType';
// import { VDPAccessoryProfile } from './VDPAccessoryProfile';
// import { VDPService } from './VDPService';

// export abstract class VDPAccessory {

//     protected _name: string;
//     protected _uniqueIdentifier: string;

//     protected _room: VDPRoom | undefined;
//     protected _area: VDPArea | undefined;

//     protected _hbPlatformAccessory: PlatformAccessory | undefined;
//     protected _hbServices: Service[] | undefined;
//     protected _hbCharacteristic: Characteristic[] | undefined;



//     //public _category: VDPAccessoryCategory | undefined;
//     // public _profiles: VDPAccessoryProfile[] | undefined;
//     // public _services: VDPService[] | undefined;

//     // public state = false;




//     constructor(
//         private readonly platform: ExampleHomebridgePlatform,
//         private readonly accessory: PlatformAccessory,
//     ) {
//         this._name = name;
//         this._uniqueIdentifier = uniqueIdentifier;
//     }

//     get name(): string{
//         return this._name;
//     }

//     set name(name: string){
//         this._name = name;
//     }

//     get uniqueIdentifier(): string{
//         return this._uniqueIdentifier;
//     }

//     set uniqueIdentifier(uniqueIdentifier: string){
//         this._uniqueIdentifier = uniqueIdentifier;
//     }

//     get room(): VDPRoom | undefined {
//         return this._room;
//     }

//     set room(room: VDPRoom | undefined) {
//         this._room = room;

//     }

//     // get category(): VDPAccessoryCategory{
//     //     return this._category;
//     // }

//     // set category(category: VDPAccessoryCategory){
//     //     this._category = category;
//     // }



//     updateUniqueIdentifier(uniqueIdentifier: string) {
//         this.uniqueIdentifier = uniqueIdentifier;
//     }

//     getOn(){
//         return this.state;
//     }

//     setOn(){
//         return !this.state;
//     }

// }
