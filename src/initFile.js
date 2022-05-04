import CookieConsent from "../src/models/CookieConsent";
import { getCategories } from "./getDomainsWithCookies";
import Legal from "./models/Legal";
import { fetchClientIp } from "./options/location";
import "./styles/main.scss";
import {
  acceptNecessary,
  allowAllCookies,
  bannerAccordionToggle,
  fillCookies,
} from "./utils/logic";
// import {getCountryLaws} from './models/CookieConsent'

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
    // law: {
    //   regionalLaw: true,
    // },
    location: true,
    // position: 'right',
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
  // ccInstance = new CookieConsent(optionsObj(country, testType));
  draw(country);
});

const draw = function (countryCode) {
  getCategories();
  // ccInstance = new CookieConsent(optionsObj(countryCode, "opt-in"));
  ccInstance = new CookieConsent(optionsObj(countryCode, testType));
  ccInstance.autoOpen = true;
  ccInstance
    .on("initialized", function (popup) {
      // ccInstance.popup?.open();
    })
    .on("popupOpened", (...args) => {
      acceptNecessary();
      initiateTypeChangeAndBannerShow();
    })
    .on("popupClosed", (...args) => {
      acceptNecessary();
      // ccInstance.popup?.close();
    })
    .on("error", console.error);
};

function initiateTypeChangeAndBannerShow() {
  // setTimeout(() => {
  const bannerTypeChangeButtons = document.querySelectorAll(
    ".banner-type-change"
  );
  for (const typeChangeElement of bannerTypeChangeButtons) {
    typeChangeElement.addEventListener("click", (event) => {
      timeStamp();
      // toggleType.addEventListener("click", (e) => {
      if (testType === "info") {
        testType = "categories";
        optionsObj("XK", "categories");
        ccInstance.destroy();
        draw(CountryCode);
        setTimeout(() => {
          fillCookies();
          bannerAccordionToggle();
          allowAllCookies();
        }, 200);
      } else if (testType === "categories") {
        testType = "info ";
        optionsObj("XK", "info");
        ccInstance.destroy();
        // ccInstance.clearStatuses().destroy();
        draw(CountryCode);
      } else {
        return this;
      }
    });
  }
  // }, 400);
}

// draw("XK");
// setTimeout(() => {
//   const testData = ccInstance.getCountryLaws(CountryCode);
//   console.log("🚀 ~ ~ ~ testData", CountryCode, testData);
// },200);
