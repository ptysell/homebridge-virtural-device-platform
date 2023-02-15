"use strict";
// import { VDPAccessory } from '../accessory/VDPAccessory';
// import { VDPChracteristic as VDPCharacteristic } from '../accessory/VDPCharacteristic';
// import { VDPRoom } from './VDPRoom';
// export class VDPZone {
//     private _name: string;
//     private _uniqueIdentifier: string;
//     private _rooms: VDPRoom[] = [];
//     private _switchAccessory: VDPAccessory;
//     constructor(
//         name: string,
//         uniqueIdentifier: string,
//     ){
//         this._name = name;
//         this._uniqueIdentifier = uniqueIdentifier;
//         this._rooms = [];
//     }
//     get name():string {
//         return this._name;
//     }
//     get uniqueIdentifier(): string {
//         return this._uniqueIdentifier;
//     }
//     addRoom(room: VDPRoom){
//         this._rooms.push(room);
//         this.addRoomCompletionHandler();
//     }
//     addRoomCompletionHandler(){
//     //
//     }
//     removeRoom(room:VDPRoom){
//         this._rooms.splice(this._rooms.findIndex(searchRoom => searchRoom.uniqueIdentifier, room.uniqueIdentifier), 1);
//         this.removeRoomCompletionHandler();
//     }
//     removeRoomCompletionHandler(){
//     //
//     }
//     setOn(characteristic: VDPCharacteristic){
//         for (const room of this._rooms){
//             //
//         }
//     }
//     getOn(): Promise<VDPCharacteristic> | void {
//         for (const room of this._rooms){
//             //
//         }
//     }
// }
//# sourceMappingURL=VDPZone.js.map