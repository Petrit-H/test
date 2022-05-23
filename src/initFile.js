import CookieConsent from "../src/models/CookieConsent";
import { fetchClientIp } from "./options/location";
import {
  acceptNecessary,
  allowAllCookies,
  bannerAccordionToggle,
  fillCategories,
  fillCookiesSettingItem,
  languageButtonToggle,
} from "./utils/logic";
// import { DomainCategories } from "./getDomainsWithCookies";
import "./styles/main.scss";
import {
  DomainCategories,
  CookiesPerDomain,
  fetchDataFromJSONFile,
} from "./cookies";
import { saveAllCookies } from "./getDomainsWithCookies";

let ccInstance;
let testType = "info";
let CountryCode = "";
let acceptedCategories = [];

export let responseJSON = {
  userId: createUUID(),
  categories: acceptedCategories,
};

export const fillJSONWithCheckedCategory = () => {
  const radioButtons = document.querySelectorAll(".radioButtonCookie");
  if (radioButtons.length !== 0 && radioButtons !== null) {
    // console.log("🚀 ~ ~ radioButtons", radioButtons.length);
    for (let index = 0; index < radioButtons.length; index++) {
      const element = radioButtons[index];
      if (element.checked) {
        // console.log(element.id, element.name);
        acceptedCategories.push(element.name);
      }
    }
  } else {
    for (let index = 0; index < DomainCategories.length; index++) {
      const element = DomainCategories[index];
      if (element.checked) {
        acceptedCategories.push(element.name);
      }
    }
  }

  console.log(responseJSON);
  acceptedCategories = [];
};

function createUUID() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  fetchDataFromJSONFile().then((json) => json);
  return uuid;
}

//!the config file for the consent manager/library to start
const optionsObj = (countryCode, type) => {
  const options = {
    cookieconsent: CookieConsent,
    container: document.getElementById("CMP_Selector"),
    type: type,
    regionalLaw: true,
    legal: countryCode,
    location: true,
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
  // console.log("🚀 ~  timeStamp", "[" + time.join(":") + "] ");
  return "[" + time.join(":") + "] ";
}
fetchClientIp().then((country) => {

  CountryCode = country;
  ccInstance = new CookieConsent(optionsObj(country, testType));
  ccInstance.autoOpen = true;
  ccInstance
    .on("initialized", function (popup) {
      // ccInstance.popup?.open();
    })
    .on("popupOpened", (...args) => {
      acceptNecessary();
      initiateTypeChangeAndBannerShow();
      languageButtonToggle()
    })
    .on("popupClosed", (...args) => {
      acceptNecessary();
      // ccInstance.popup?.close();
    })
    .on("error", console.error);
});

const draw = function (countryCode) {
  // getCategories();
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
        optionsObj(CountryCode, "categories");
        ccInstance.destroy();
        draw(CountryCode);
        setTimeout(() => {
          fillCategories();
          fillCookiesSettingItem();
          bannerAccordionToggle();
          allowAllCookies();
        }, 300);
      } else if (testType === "categories") {
        testType = "info ";
        optionsObj(CountryCode, "info");
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

setTimeout(() => {
  const testData = ccInstance.getCountryLaws(CountryCode);
  console.log(CountryCode, testData);
  // saveAllCookies()
}, 300);
