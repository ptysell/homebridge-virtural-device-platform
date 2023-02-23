"use strict";
// import { VDPAccessorySwitch } from "../../accessories/VDPAccessorySwitch";
// import { VDPAccessory } from "../accessories/accessory/VDPAccessory";
// import { VDPObservable } from "../system/observable";
// import { VDPObserver } from "../system/observer";
// import { VDPRoom } from "./VDPRoom";
// export class VDPZone implements VDPObserver, VDPObservable {
// 	private _name: string;
// 	public get name(): string { return this._name; }
// 	protected set name(name: string) { this._name = name; }
// 	private _uniqueIdentifier: string;
// 	public get uniqueIdentifier(): string { return this._uniqueIdentifier; }
// 	protected set uniqueIdentifier(uniqueIdentifier: string) { this._uniqueIdentifier = uniqueIdentifier; }
// 	private _rooms: VDPRoom[];
// 	public get rooms(): VDPRoom[] { return this._rooms; }
// 	protected set rooms(rooms: VDPRoom[]) { this._rooms = rooms; }
// 	private _accessory: VDPAccessory;
// 	public get accessory(): VDPAccessory { return this._accessory; }
// 	protected set accessory(accessory: VDPAccessory) { this._accessory = accessory; }
// 	private _state: boolean;
// 	public get state(): boolean { return this._state; }
// 	protected set state(state: boolean) { this._state = state; }
// 	private _observers: VDPObserver[];
// 	protected get observers(): VDPObserver[] { return this._observers; }
// 	protected set observers(observers: VDPObserver[]) { this._observers = observers} 
// 	constructor (
// 		withName: string,
// 	) {
// 		this._name = withName;
// 		this._uniqueIdentifier = 'NOT IMPLEMENTED';
// 		this._rooms = [];
// 		this._accessory = new VDPAccessorySwitch('', '');
// 		this.attach(this._accessory);
// 		this._state = false; //this.accessory.accessoryCharacteristics.
// 		this._observers = [];
// 	}
// 	public addRoom(room: VDPRoom) {
// 		try {
// 			const isExist = this.rooms.includes(room);
// 			if (isExist) {
// 				throw new Error('NOT IMPLEMENTED');
// 			}
// 			this._rooms.push(room);
// 			this.attach(room);
// 		} catch (error) {
// 			//NOt IMPLEMENTED
// 		} finally {
// 			//NOt IMPLEMENTED
// 		}
// 	}
// 	public removeRoom(room: VDPRoom) {
// 		try {
// 			const roomIndex = this._rooms.indexOf(room);
// 			if (roomIndex === -1) {
// 				throw new Error('NOT IMPLEMENTED');
// 			}
//         	this._rooms.splice(roomIndex, 1);
// 			this.detach(room);
// 		} catch (error) {
// 			//NOT IMPLEMENTED
// 		} finally {
// 			//NOT IMPLEMENTED
// 		}
// 	}
// 	update(observable: VDPObservable, sender?: string | undefined, action?: string | undefined, state?: string | undefined, message?: string | undefined): void {
// 		try {
// 			//NOT IMPLEMENTED
// 		} catch (error) {
// 			//NOT IMPLEMENTED
// 		} finally {
// 			//NOT IMPLEMENTED
// 		}
// 	}
// 	attach(observer: VDPObserver): void {
// 		try {
// 			//NOT IMPLEMENTED
// 		} catch (error) {
// 			//NOT IMPLEMENTED
// 		} finally {
// 			//NOT IMPLEMENTED
// 		}
// 	}
// 	detach(observer: VDPObserver): void {
// 		try {
// 			//NOT IMPLEMENTED
// 		} catch (error) {
// 			//NOT IMPLEMENTED
// 		} finally {
// 			//NOT IMPLEMENTED
// 		}
// 	}
// 	notify(sender?: string | undefined, action?: string | undefined, state?: string | undefined, message?: string | undefined): void {
// 		try {
// 			//NOT IMPLEMENTED
// 		} catch (error) {
// 			//NOT IMPLEMENTED
// 		} finally {
// 			//NOT IMPLEMENTED
// 		}
// 	}
// }
//# sourceMappingURL=VDPZone.js.map