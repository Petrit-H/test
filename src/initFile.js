import CookieConsent from "../src/models/CookieConsent";
import { getCategories } from "./getDomainsWithCookies";
import { fetchClientIp } from "./options/location";
import "./styles/main.scss";
import {
  acceptNecessary,
  allowAllCookies,
  bannerAccordionToggle,
  fillCookies,
} from "./utils/logic";

const locationElement = document.getElementById("location");
const categoriesType = document.querySelector(".cc-window");
const infoType = document.querySelector(".cc-window.cc-type-info");
let ccInstance;
let testType = "info";
let CountryCode = "";

//!the config file for the consent manager/library to start
/**
 * @param {String} countryCode the country code
 * @param {String} type    the banner type (info and/or categories)
 * @returns {Object} the config object to start the Cookie Consent
 */
const optionsObj = (countryCode, type) => {
  // debugger;
  console.log("CODE ", countryCode);
  const options = {
    cookieconsent: CookieConsent,
    // selector: document.querySelector(".example-selector"),
    container: document.getElementById("CMP_Selector"),
    // container: document.getElementById("CMP"),
    type: type,
    // type: "opt-in",
    regionalLaw: true,
    legal: countryCode,
    // legal: {
    //   countryCode: countryCode,
    // },
    law: {
      regionalLaw: true,
    },
    location: true,
    // position: 'top-right',
    revokable: true,
    palette: {
      categories: {
        display: "flex",
        "flex-direction": "column",
        height: "100vh",
      },
    },
  };
  return options;
};

function timeStamp() {
  const now = new Date();
  const time = [now.getHours(), now.getMinutes(), now.getSeconds()];
  for (let i = 1; i < 3; i++) {
    if (time[i] < 10) {
      time[i] = "0" + time[i];
    }
  }
  console.log("🚀 ~  timeStamp", "[" + time.join(":") + "] ");
  return "[" + time.join(":") + "] ";
}
fetchClientIp().then((country) => {
  CountryCode = country;
  draw(country);
});
console.log("🚀 ~ file: initFile.js ~ line 70 ~ fetchClientIp ~ CountryCode", CountryCode)

const draw = function (countryCode) {
  getCategories();
  ccInstance = new CookieConsent(optionsObj(countryCode, testType));
  ccInstance.autoOpen = false;
  ccInstance
    .on("initialized", function (popup) {
      // console.log("🚀 ~ POPUP INIT", popup);
      // ccInstance.popup?.open();
    })
    .on("popupOpened", (...args) => {
      console.log("Popup Open", args);
      acceptNecessary();
      initiateTypeChangeAndBannerShow();
    })
    .on("popupClosed", (...args) => {
      console.log("Popup Closed", args);
      acceptNecessary();
      // ccInstance.popup?.close();
    })
    .on("error", console.error);
};

function initiateTypeChangeAndBannerShow() {
  // setTimeout(() => {
  const bannertypeChangeButtons = document.querySelectorAll(
    ".banner-type-change"
  );
  for (const typeChangeElement of bannertypeChangeButtons) {
    typeChangeElement.addEventListener("click", (event) => {
      console.log("🚀 ~ CLICKED TYPE CHEANGE", event.target);
      timeStamp();
      console.log("🚀 ~ type", testType);
      // toggleType.addEventListener("click", (e) => {
      console.log("🚀 ~ categoriesType => ", categoriesType);
      console.log("🚀 ~ file: index.html ~ line 205 ~ infoType => ", infoType);
      if (testType === "info") {
        testType = "categories";
        optionsObj("XK", "categories");
        ccInstance.destroy();
        // draw(locationElement[locationElement.selectedIndex].value);
        draw("XK");
        setTimeout(() => {
          fillCookies();
          bannerAccordionToggle();
          allowAllCookies();
        }, 150);
      } else if (testType === "categories") {
        testType = "info ";
        optionsObj("XK", "info");
        ccInstance.destroy();
        // ccInstance.clearStatuses().destroy();
        // draw(locationElement[locationElement.selectedIndex].value);
        draw("XK");
        console.log("🚀 ~TYPE->  options.type", testType);
      } else {
        return this;
      }
    });
  }
  // CountryCode = fetchClientIp();
  // console.log("🚀 ~ LOCATIONNNNNNN ", CountryCode);
  // }, 400);
}

console.log("CountryCode", CountryCode);

// draw("XK");
