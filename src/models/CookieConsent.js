import Base from "./Base";
import Legal from "./Legal";
import Location from "./Location";
import Popup from "./Popup";

import { COOKIES_CATEGORIES, COOKIES_STATUSES } from "../constants";
import { getCookie, isValidStatus } from "../utils";
import { cmpDomainCategories } from "../cookies";

// This function initializes the app by combining the use of the Popup, Locator and Law modules
// You can string together these three modules yourself however you want, by writing a new function.

export default class CookieConsent extends Base {
  constructor(options = {}) {
    super(options);

    // const answers = cmpDomainCategories.map((category) => {
    const answers = COOKIES_CATEGORIES.map(({ name }) => {
      const cookieName = this.options?.cookie?.name || "gjirafa_";
      const answer = getCookie(cookieName + name);
      return isValidStatus(answer) ? { [name]: answer } : undefined;
    }).filter((obj) => (obj ? obj[Object.keys(obj)[0]] : false));

    // if they have already answered
    if (answers.length > 0) {
      setTimeout(() => this.emit("initialized", answers));
    } else if (this.options.legal && this.options.legal.countryCode) {
      this.initializationComplete({ code: this.options.legal.countryCode });
    } else if (this.options.location) {
      new Location(this.options.location).locate(this.initializationComplete.bind(this), this.initializationError.bind(this));
    } else {
      this.initializationComplete({});
    }
  }
  initializationComplete(result) {
    if (result.code) {
      this.options = new Legal(this.options.legal).applyLaw(this.options, result.code);
    }
    this.popup = new Popup(this.options);
    setTimeout(() => this.emit("initialized", this.popup), 0);
  }
  initializationError(error) {
    setTimeout(() => this.emit("error", error, new Popup(this.options)), 0);
  }
  getCountryLaws(countryCode) {
    return new Legal(this.options.legal).get(countryCode);
  }
  isOpen() {
    return this.popup.isOpen();
  }
  close() {
    return this.popup.close(), this;
  }
  revokeChoice() {
    return this.popup.revokeChoice(), this;
  }
  open() {
    return this.popup.open(), this;
  }
  toggleRevokeButton(bool) {
    return this.popup.toggleRevokeButton(bool), this;
  }
  setStatuses(status) {
    return this.popup.setStatuses(status), this;
  }
  clearStatuses() {
    return this.popup.clearStatuses(), this;
  }
  destroy() {
    return this.popup.destroy(), this;
  }
}

COOKIES_STATUSES.reduce(
  (obj, status) => (
    Object.defineProperty(CookieConsent, status, {
      get: function () {
        return status;
      },
      set: function () {},
      enumerable: false,
      writeable: false,
      configurable: false,
    }),
    obj
  ),
  CookieConsent
);
