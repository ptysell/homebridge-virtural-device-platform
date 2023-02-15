"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Observers = exports.Observer = void 0;
class Observer {
    constructor(_subject, _callback) {
        this._subject = _subject;
        this._callback = _callback;
        this.notify = () => {
            console.log('👁 Observer called for:', this._subject, ', new value:', this._newValue);
            if (this._callback) {
                this._callback(this._newValue);
            }
        };
    }
    get subject() {
        return this._subject;
    }
    get newValue() {
        return this._newValue;
    }
    set newValue(newValue) {
        this._newValue = newValue;
        this.notify();
    }
}
exports.Observer = Observer;
class Observers {
    constructor() {
        this._observers = [];
        this.subscribe = (observer) => {
            if (!this._observers.includes(observer)) {
                this._observers.push(observer);
            }
        };
        this.unsubscribe = (observer) => {
            this._observers.filter((value) => {
                if (value === observer) {
                    return false;
                }
                return true;
            });
        };
        this.notify = (subject, newValue) => {
            this._observers.map(observer => {
                if (observer.subject == subject) {
                    observer.newValue = newValue;
                }
            });
        };
    }
}
exports.Observers = Observers;
//# sourceMappingURL=observer.js.map