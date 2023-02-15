"use strict";
// import { Logger } from 'homebridge';
// import { VDPAccessory } from '../accessory/VDPAccessory';
// import { VDPRoom } from './VDPRoom';
// import { VDPZone } from './VDPZone';
// export class VDPHome {
//     private _classPrefix = '[VDPHome]';
//     private _name: string;
//     private _uniqueIdentifier: string;
//     private _zones: VDPZone[];
//     private _rooms: VDPRoom[];
//     private _defaultRoom: VDPRoom | void;
//     private _classAccessory: VDPAccessory;
//     private _accessories: VDPAccessory[];
//     private _log: Logger | void;
//     constructor(
//         name: string,
//         log?: Logger,
//     ){
//         this._name = name;
//         this._uniqueIdentifier = '';
//         this._zones = [];
//         this._rooms = [];
//         this._defaultRoom = this.addRoom('Default');
//         this._accessories = [];
//         if (log){
//             this._log = log;
//         }
//     }
//     get classPrefix(): string {
//         return this._classPrefix;
//     }
//     get rooms(): VDPRoom[] {
//         return this._rooms;
//     }
//     get zones(): VDPZone[] {
//         return this.zones;
//     }
//     roomForEntireHome(): VDPRoom | void {
//         return this._defaultRoom;
//     }
//     addRoom(name:string): VDPRoom | void {
//         const functionPrefix = 'addRoom';
//         let status = 'N/A';
//         let message = 'N/A';
//         let results: VDPRoom | void;
//         try {
//             //Create new Room object
//             const room = new VDPRoom(name);
//             //Add Room to Home
//             this._rooms.push(room);
//             status = 'ADDED';
//             message = room.name;
//             results = room;
//         } catch (error) {
//             status = 'ERROR';
//             if (error instanceof Error) {
//                 message = error.message;
//             }
//         } finally {
//             this.addRoomCompletionHandler(functionPrefix, status, message);
//         }
//         return results;
//     }
//     private addRoomCompletionHandler(functionPrefix: string, status: string, message: string){
//         this._log.debug('[', this.classPrefix + '](' + functionPrefix + '): ' + status + ' | ' + message);
//     }
//     removeRoom(room: VDPRoom): void {
//         const functionPrefix = 'removeRoom';
//         let status = 'N/A';
//         let message = 'N/A';
//         try {
//             //Get Room Index by uniqueIdentifier in Rooms Array
//             const roomIndex = this._rooms.findIndex(searchObject => searchObject._uniqueIdentifier === room._uniqueIdentifier);
//             //Check if Room exists in Home
//             if(roomIndex === -1) {
//                 //Room does NOT exist in Home, throw Error
//                 throw new Error('Room does not exist in Home');
//             }
//             //If Room has Accessories
//             if (room.accessories.length > 0){
//                 //Reassign Accessories for Room to Default Room
//                 for (const accessory of room.accessories) {
//                     this.assignAccessory(accessory, this.roomForEntireHome());
//                 }
//             }
//             //Remove Room from Rooms Array at roomIndex
//             this._rooms.splice(roomIndex, 1);
//             status = 'REMOVED';
//             message = room.name;
//         } catch (error) {
//             status = 'ERROR';
//             if (error instanceof Error) {
//                 message = error.message;
//             }
//         } finally {
//             this.removeRoomCompletionHandler(functionPrefix, status, message);
//         }
//     }
//     private removeRoomCompletionHandler(functionPrefix: string, status: string, message: string){
//         this._log.debug('[', this.classPrefix + '](' + functionPrefix + '): ' + status + ' | ' + message);
//     }
//     addZone(name: string): VDPZone | void {
//         const functionPrefix = 'addZone';
//         let status = 'N/A';
//         let message = 'N/A';
//         let results: VDPZone | void;
//         try {
//             //Create new Zone object
//             const zone = new VDPZone(name, '');
//             //Add Zone to Home
//             this._zones.push(zone);
//             status = 'ADDED';
//             message = zone.name;
//             results = zone;
//         } catch (error) {
//             status = 'ERROR';
//             if (error instanceof Error) {
//                 message = error.message;
//             }
//         } finally {
//             this.addZoneCompletionHandler(functionPrefix, status, message);
//         }
//         return results;
//     }
//     private addZoneCompletionHandler(functionPrefix: string, status: string, message: string){
//         this._log.debug('[', this.classPrefix + '](' + functionPrefix + '): ' + status + ' | ' + message);
//     }
//     removeZone(zone: VDPZone): void {
//         const functionPrefix = 'removeZone';
//         let status = 'N/A';
//         let message = 'N/A';
//         try {
//             //Get Zone Index by uniqueIdentifier in Zone Array
//             const zoneIndex = this._zones.findIndex(searchObject => searchObject.uniqueIdentifier === zone.uniqueIdentifier);
//             //Check if Zone exists in Home
//             if(zoneIndex === -1) {
//                 //Room does NOT exist in Home, throw Error
//                 throw new Error('Zone does not exist in Home');
//             }
//             //Remove Zone from Zone Array at zoneIndex
//             this._zones.splice(zoneIndex, 1);
//             status = 'REMOVED';
//             message = zone.name;
//         } catch (error) {
//             status = 'ERROR';
//             if (error instanceof Error) {
//                 message = error.message;
//             }
//         } finally {
//             this.removeZoneCompletionHandler(functionPrefix, status, message);
//         }
//     }
//     private removeZoneCompletionHandler(functionPrefix: string, status: string, message: string){
//         this._log.debug('[', this.classPrefix + '](' + functionPrefix + '): ' + status + ' | ' + message);
//     }
//     addAccessory(accessory: VDPAccessory){
//         const functionPrefix = 'addAccessory';
//         let status = 'N/A';
//         let message = 'N/A';
//         try {
//             //-------
//             //-------
//             //-------
//             //PUT CODE HERE
//             //-------
//             //-------
//             //-------
//             status = 'ADDED';
//             message = accessory.name;
//         } catch (error) {
//             status = 'ERROR';
//             if (error instanceof Error) {
//                 message = error.message;
//             }
//         } finally {
//             this.addAccessoryCompletionHandler(functionPrefix, status, message);
//         }
//     }
//     private addAccessoryCompletionHandler(functionPrefix: string, status: string, message: string){
//         this._log.debug('[', this.classPrefix + '](' + functionPrefix + '): ' + status + ' | ' + message);
//     }
//     removeAccessory(accessory: VDPAccessory){
//         const functionPrefix = 'removeAccessory';
//         let status = 'N/A';
//         let message = 'N/A';
//         try {
//             //-------
//             //-------
//             //-------
//             //PUT CODE HERE
//             //-------
//             //-------
//             //-------
//             status = 'REMOVED';
//             message = accessory.name;
//         } catch (error) {
//             status = 'ERROR';
//             if (error instanceof Error) {
//                 message = error.message;
//             }
//         } finally {
//             this.removeAccessoryCompletionHandler(functionPrefix, status, message);
//         }
//     }
//     private removeAccessoryCompletionHandler(functionPrefix: string, status: string, message: string){
//         this._log.debug('[', this.classPrefix + '](' + functionPrefix + '): ' + status + ' | ' + message);
//     }
//     w;
//     assignAccessory(accessory: VDPAccessory, room:VDPRoom){
//         const functionPrefix = 'assignAccessory';
//         let status = 'N/A';
//         let message = 'N/A';
//         const prevRoom = accessory.room;
//         const prevRoomIndex = 0;
//         const prevRoomAccessoryIndex = 0;
//         try {
//             //-------
//             //-------
//             //-------
//             //PUT CODE HERE
//             //-------
//             //-------
//             //-------
//             status = 'ASSIGNED';
//             message = accessory.name + ' from Room ' + '' + ' to Room ' + room.name;
//         } catch (error) {
//             status = 'ERROR';
//             if (error instanceof Error) {
//                 message = error.message;
//             }
//         } finally {
//             this.assignAccessoryCompletionHandler(functionPrefix, status, message);
//         }
//     }
//     private assignAccessoryCompletionHandler(functionPrefix: string, status: string, message: string){
//         this._log.debug('[', this.classPrefix + '](' + functionPrefix + '): ' + status + ' | ' + message);
//     }
// }
//# sourceMappingURL=VDPHome.js.map