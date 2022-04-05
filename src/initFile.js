import CookieConsent from "../src/models/CookieConsent";
// import CookieConsent from "./models/CookieConsent";
// import CMP_Section from "./utils/logic";
import { fetchClientIp } from "./options/location";
import "./styles/main.scss";
import { allowAllCookies, bannerAccordionToggle, fillCookies, showModal } from "./utils/logic";
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
  const toggleType = document.querySelectorAll(".typeChange");

  console.log("🚀 ~ TOGGLE TYPE", toggleType);

  for (const key of toggleType) {
    console.log(key);
    key.addEventListener("click", (event) => {
      timeStamp();
      fillCookies();
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
        ccInstance.clearStatuses().destroy();
        // draw(locationElement[locationElement.selectedIndex].value);
        draw("XK");
        // bannerAccordionToggle();
        showModal();
        console.log("🚀 ~ TYPE-> options.type", testType);
      } else if (testType === "categories") {
        testType = "info";
        optionsObj(
          // locationElement[locationElement.selectedIndex].value,
          "XK",
          "info"
        );
        ccInstance.clearStatuses().destroy();
        // draw(locationElement[locationElement.selectedIndex].value);
        draw("XK");
        console.log("🚀 ~TYPE->  options.type", testType);
        allowAllCookies();
      } else {
        return this;
      }
    });
  }
  // CountryCode = fetchClientIp();
  console.log("🚀 ~ LOCATIONNNNNNN ", fetchClientIp());
  // console.log("🚀 ~ LOCATIONNNNNNN ", CountryCode);
}, 500);
draw("XK");





// import CookieConsent from "../src/models/CookieConsent";
// // import CookieConsent from "./models/CookieConsent";
// import CMP_Section from "./cookies";
// import { fetchClientIp } from "./options/location";
// import "./styles/main.scss";
// // import {fillCookies} from './cookies'

// const COUNTRY_CODES = {
//   // Representative group of countries with key differences
//   AT: "Austria",
//   BE: "Belgium",
//   BG: "Bulgaria",
//   CY: "Cyprus ",
//   CZ: "Czech Republic",
//   DK: "Denmark",
//   EE: "Estonia",
//   FI: "Finland",
//   FR: "France",
//   DE: "Germany",
//   GR: "Greece",
//   HU: "Hungary",
//   IE: "Ireland",
//   IT: "Italy ",
//   LV: "Latvia",
//   LT: "Lithuania ",
//   LU: "Luxembourg",
//   MT: "Malta ",
//   NL: "The Netherlands",
//   PL: "Poland",
//   PT: "Portugal ",
//   RO: "Romania ",
//   SK: "Slovakia ",
//   SI: "Slovenia ",
//   ES: "Spain ",
//   SE: "Sweden ",
//   GB: "United Kingdom ",
// };
// let testType = "info";
// let CountryCode = "";
// // debugger
// const optionsObj = (countryCode, type) => {
//   // debugger;
//   console.log("CODE ", countryCode);
//   const options = {
//     cookieconsent: CookieConsent,
//     // selector: document.querySelector(".example-selector"),
//     container: document.getElementById("CMP_Selector"),
//     // container: document.getElementById("CMP"),
//     type: type,
//     // type: "opt-in",
//     regionalLaw: true,
//     legal: countryCode,
//     // legal: {
//     //   countryCode: countryCode,
//     // },
//     law: {
//       regionalLaw: true,
//     },
//     location: true,
//     // position: 'top-right',
//     revokable: true,
//     palette: {
//       categories: {
//         display: "flex",
//         "flex-direction": "column",
//         height: "100vh",
//       },
//     },
//   };
//   return options;
// };

// // console.log("🚀 ~ OPTIONS", optionsObj());

// // var type = optionsObj().type

// const locationElement = document.getElementById("location");
// const categoriesType = document.querySelector(".cc-window");
// const infoType = document.querySelector(".cc-window.cc-type-info");
// let ccInstance;

// function timeStamp() {
//   const now = new Date();
//   const time = [now.getHours(), now.getMinutes(), now.getSeconds()];
//   for (let i = 1; i < 3; i++) {
//     if (time[i] < 10) {
//       time[i] = "0" + time[i];
//     }
//   }
//   console.log("🚀 ~  timeStamp", "[" + time.join(":") + "] ");
//   return "[" + time.join(":") + "] ";
// }

// const draw = function (countryCode) {
//   ccInstance = new CookieConsent(optionsObj(countryCode, testType));
//   ccInstance.autoOpen = false;
//   console.log("🚀 ~ ccInstance.autoOpen ", ccInstance.autoOpen);
//   ccInstance
//     .on("initialized", function (popup) {
//       console.log("🚀 ~ POPUP INIT", popup);
//       // ccInstance.popup?.open();
//     })
//     .on("popupOpened", (...args) => console.log("Popup Open", args))
//     .on("popupClosed", (...args) => {
//       console.log("Popup Closed", args);
//       // ccInstance.popup?.close();
//     })
//     .on("error", console.error);
// };

// setTimeout(() => {
//   const toggleType = document.querySelectorAll(".typeChange");

//   console.log("🚀 ~ TOGGLE TYPE", toggleType);

//   for (const key of toggleType) {
//     console.log(key);
//     key.addEventListener("click", (event) => {
//       timeStamp();
//       CMP_Section.fillCookies();
//       console.log("🚀 ~ file: index.html ~ line 193 ~ type", testType);
//       // toggleType.addEventListener("click", (e) => {
//       console.log(
//         "🚀 ~ file: index.html ~ line 204 ~ categoriesType => ",
//         categoriesType
//       );
//       console.log("🚀 ~ file: index.html ~ line 205 ~ infoType => ", infoType);
//       if (testType === "info") {
//         testType = "categories";
//         optionsObj(
//           // locationElement[locationElement.selectedIndex].value,
//           "XK",
//           "categories"
//         );
//         ccInstance.clearStatuses().destroy();
//         // draw(locationElement[locationElement.selectedIndex].value);
//         draw("XK");
//         // CMP_Section.bannerAccordionToggle();
//         CMP_Section.showModal();
//         console.log("🚀 ~ TYPE-> options.type", testType);
//       } else if (testType === "categories") {
//         testType = "info";
//         optionsObj(
//           // locationElement[locationElement.selectedIndex].value,
//           "XK",
//           "info"
//         );
//         ccInstance.clearStatuses().destroy();
//         // draw(locationElement[locationElement.selectedIndex].value);
//         draw("XK");
//         console.log("🚀 ~TYPE->  options.type", testType);
//         CMP_Section.allowAllCookies();
//       } else {
//         return this;
//       }
//     });
//   }
//   // CountryCode = fetchClientIp();
//   console.log("🚀 ~ LOCATIONNNNNNN ", fetchClientIp());
//   // console.log("🚀 ~ LOCATIONNNNNNN ", CountryCode);
// }, 400);
// draw("XK");
