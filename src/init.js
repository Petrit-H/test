import CookieConsent from "./models/CookieConsent";


const COUNTRY_CODES = {
  // Representative group of countries with key differences
  AT: "Austria",
  BE: "Belgium",
  BG: "Bulgaria",
  CY: "Cyprus ",
  CZ: "Czech Republic",
  DK: "Denmark",
  EE: "Estonia",
  FI: "Finland",
  FR: "France",
  DE: "Germany",
  GR: "Greece",
  HU: "Hungary",
  IE: "Ireland",
  IT: "Italy ",
  LV: "Latvia",
  LT: "Lithuania ",
  LU: "Luxembourg",
  MT: "Malta ",
  NL: "The Netherlands",
  PL: "Poland",
  PT: "Portugal ",
  RO: "Romania ",
  SK: "Slovakia ",
  SI: "Slovenia ",
  ES: "Spain ",
  SE: "Sweden ",
  GB: "United Kingdom ",
};

let testType = "info";
// debugger
const optionsObj = (countryCode, type) => {
  // debugger;
  console.log("CODE ", countryCode);
  const options = {
    cookieconsent: CookieConsent,
    selector: document.querySelector(".example-selector"),
    container: document.getElementById("CMP"),
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
    // position: 'bottom',
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

console.log("🚀 ~ OPTIONS", optionsObj());

// var type = optionsObj().type

const locationElement = document.getElementById("location");
const categoriesType = document.querySelector(".cc-window");
const infoType = document.querySelector(".cc-window.cc-type-info");
let ccInstance;

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
  const countryOpts = ccInstance.getCountryLaws(countryCode);
  // const countryOpts = instances[index].getCountryLaws("EN");
  console.log("🚀 ~ file: scripts.js ~ line 156 ~ countryOpts", countryOpts);
  // ccInstance.popup.open();

  // show country options on screen (so user knows how this country affected the settings)
  document.getElementById("message").innerHTML = !countryOpts.hasLaw
    ? "Has cookie law? no"
    : CMP_Section.tabularObject({
        "Has cookie law?": countryOpts.hasLaw ? "yes" : "no",
        "Choice has to be revokable?": countryOpts.revokable ? "yes" : "no",
        "Can be automatically dismissed?": countryOpts.explicitAction
          ? "no"
          : "yes",
        "Option tye:": testType,
      });
};

//fill the countries dropdown
CMP_Section.fillSelect(locationElement, COUNTRY_CODES, COUNTRY_CODES);

// locationElement.onchange = function () {
if (locationElement.selectedIndex >= 0) {
  // draw(locationElement[locationElement.selectedIndex].value);
  console.log(
    "🚀 ~ LOCATION =>",
    locationElement[locationElement.selectedIndex].value
  );
}
// };
const toggleType = document.querySelector(".typeChange");
// const toggleType = document.getElementById("toggleType");

const typeToggleFunction = (e) => {
  timeStamp();
  console.log("🚀 ~ file: index.html ~ line 193 ~ type", testType);
  // toggleType.addEventListener("click", (e) => {
  console.log(
    "🚀 ~ file: index.html ~ line 204 ~ categoriesType => ",
    categoriesType
  );
  console.log("🚀 ~ file: index.html ~ line 205 ~ infoType => ", infoType);
  // debugger
  // console.log("🚀 ~ file: index.html ~ line 193 ~ type", testType)
  if (testType === "info") {
    testType = "categories";
    optionsObj(
      locationElement[locationElement.selectedIndex].value,
      "categories"
    );
    ccInstance.clearStatuses().destroy();
    draw(locationElement[locationElement.selectedIndex].value);
    bannerAccordionToggle();
    showModal();
    console.log("🚀 ~ TYPE-> options.type", testType);
  } else if (testType === "categories") {
    testType = "info";
    optionsObj(locationElement[locationElement.selectedIndex].value, "info");
    ccInstance.clearStatuses().destroy();
    draw(locationElement[locationElement.selectedIndex].value);
    console.log("🚀 ~TYPE->  options.type", testType);
  } else {
    return this;
  }
  // })
};

// draw("XK");
draw(locationElement[locationElement.selectedIndex].value);
// draw(locationElement[2].value);
// console.log("🚀 ~ locationElement[0].value", locationElement[0].value)
locationElement.focus();
