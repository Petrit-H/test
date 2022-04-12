import CookieConsent from "../src/models/CookieConsent";
// import CookieConsent from "./models/CookieConsent";
// import CMP_Section from "./utils/logic";
import { fetchClientIp } from "./options/location";
import "./styles/main.scss";
import {
  acceptNecessary,
  allowAllCookies,
  bannerAccordionToggle,
  fillCookies,
  // showModal,
} from "./utils/logic";
// import {fillCookies} from './cookies'

let testType = "info";
let CountryCode = "";
// debugger
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

// console.log("🚀 ~ OPTIONS", optionsObj());

// var type = optionsObj().type

const locationElement = document.getElementById("location");
const categoriesType = document.querySelector(".cc-window");
const infoType = document.querySelector(".cc-window.cc-type-info");
let ccInstance;

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

const draw = function (countryCode) {
  ccInstance = new CookieConsent(optionsObj(countryCode, testType));
  ccInstance.autoOpen = false;
  console.log("🚀 ~ ccInstance.autoOpen ", ccInstance.autoOpen);
  ccInstance
    .on("initialized", function (popup) {
      console.log("🚀 ~ POPUP INIT", popup);
      // ccInstance.popup?.open();
    })
    .on("popupOpened", (...args) => console.log("Popup Open", args))
    .on("popupClosed", (...args) => {
      console.log("Popup Closed", args);
      // ccInstance.popup?.close();
    })
    .on("error", console.error);
};

setTimeout(() => {
  acceptNecessary();
  // bannerAccordionToggle(1);

  const toggleType = document.querySelectorAll(".typeChange");
  console.log("🚀 ~ TOGGLE TYPE", toggleType);

  for (const key of toggleType) {
    console.log(key);
    key.addEventListener("click", (event) => {
      timeStamp();
      fillCookies();
      // allowAllCookies()
      console.log("🚀 ~ file: index.html ~ line 193 ~ type", testType);
      // toggleType.addEventListener("click", (e) => {
      console.log(
        "🚀 ~ file: index.html ~ line 204 ~ categoriesType => ",
        categoriesType
      );
      console.log("🚀 ~ file: index.html ~ line 205 ~ infoType => ", infoType);
      if (testType === "info") {
        testType = "categories";
        optionsObj(
          // locationElement[locationElement.selectedIndex].value,
          "XK",
          "categories"
        );
        ccInstance.destroy();
        // draw(locationElement[locationElement.selectedIndex].value);
        draw("XK");
        bannerAccordionToggle();
        document.getElementById("COOKIE_SETTINGS").classList.remove("hidden");
        document.getElementById("COOKIE_DISPLAY").classList.add("hidden");
      } else if (testType === "categories") {
        testType = "info ";
        optionsObj(
          // locationElement[locationElement.selectedIndex].value,
          "XK",
          "info"
        );
        ccInstance.destroy();
        // draw(locationElement[locationElement.selectedIndex].value);
        draw("XK");
        console.log("🚀 ~TYPE->  options.type", testType);
      } else {
        return this;
      }
    });
    console.log("LISTA NR 4", document.getElementById("list-4"));
  }
  // CountryCode = fetchClientIp();
  console.log("🚀 ~ LOCATIONNNNNNN ", fetchClientIp());
  // console.log("🚀 ~ LOCATIONNNNNNN ", CountryCode);
}, 500);
draw("XK");
