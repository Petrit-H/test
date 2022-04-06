import {
  settingsAccordionToggle,
  filterCookiesByCategory,
} from "./utils/logic";
import { CARET_DOWN_ICON, COOKIES_CATEGORIES } from "./constants";
import {
  // categories,
  fetchCategoriesFromAPI,
  fetchDomainsFromAPI,
  getCookiesData,
  // responseData,
} from "./getDomainsWithCookies";
import { setCookie } from "./utils/cookie";
import axios from "axios";
import moment from "moment";

console.log(createUUID());
const OTHER = [];
const MARKETING = [];
const ANALYTICAL = [];
const PREFERENCES = [];
const NECESSARY = [];
// let responseData = [];
// let categories = [];
// let filteredCookies = [];
let responseForCookies = []; //?{ cookie_name: "", cookie_status: "" }
let cookiesPerCategory = [];
// let dataForBala = [];
let dataForBala = {};

window.addEventListener("load", function (event) {
  console.log(
    "welcome to🔐 \n",
    `
      CCCCCCCCCCCCC MMMMMMMM              MMMMMMMMM PPPPPPPPPPPPPPP
    CCC:::::::::::C M:::::::M             M:::::::M P:::::::::::::::P
  CC::::::::::::::C M::::::::M           M::::::::M P:::::PPPPPP:::::P
 C:::::CCCCCCCC:::C M:::::::::M         M:::::::::M P:::::P     P:::::P
C:::::C       CCCCC M::::::::::M       M::::::::::M P:::::P     P:::::P
C:::::C              M::::::::::M     M::::::::::M   P::::P     P:::::P
C:::::C              M::::::M::::M   M::::M::::::M   P::::PPPPPP:::::P
C:::::C              M:::::M M::::M M::::M M:::::M   P:::::::::::::PP
C:::::C              M:::::M  M::::M::::M  M:::::M   P::::PPPPPPPPP
C:::::C              M:::::M   M:::::::M   M:::::M   P::::P
C:::::C              M:::::M    M:::::M    M:::::M   P::::P
C:::::C       CCCCC M::::::M     MMMMM     M::::::M P::::::P
 C:::::CCCCCCCC:::C M::::::M               M::::::M P::::::P
  CC::::::::::::::C M::::::M               M::::::M P::::::P
    CCC:::::::::::C M::::::M               M::::::M P::::::P
       CCCCCCCCCCCC MMMMMMMM               MMMMMMMM PPPPPPPP
    `
  );
  const COOKIE_SETTINGS = document.getElementById("COOKIE_SETTINGS");
  const COOKIE_DISPLAY = document.getElementById("COOKIE_DISPLAY");
  const spinner = document.getElementById("spinner");
  const noData = document.getElementById("noData");
  const goBack = document.getElementById("goBack");

  // const cookieSectionInject = document.querySelector(".cookieSectionInject");
  const cookieSectionInject = document.getElementById("cookieSectionInject");

  // bannerAccordionToggle()

  setTimeout(() => {
    let categories = fetchCategoriesFromAPI();
    let responseData = fetchDomainsFromAPI();
    toggleInjectedRadioButtons();

    // bannerAccordionToggle()
    // showModal();

    dataForBala = {
      id: createUUID(),
      domains: responseData,
      NECESSARY: NECESSARY,
      PREFERENCES: PREFERENCES,
      ANALYTICAL: ANALYTICAL,
      MARKETING: MARKETING,
      OTHER: OTHER,
    };
    console.log("==================🧲🧲🧲🧲====================");
    console.log("🚀 ~ categories", categories);
    console.log("🚀 ~ responseData", responseData);
    console.log("🚀 ~ DATA-4-BALA", dataForBala);
    console.log("==================🧲🧲🧲🧲=====================");

    // if (responseData.length === 0) {
    //   noData.classList.remove("hidden");
    // }
  }, 400);
});

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
  return uuid;
}

// //! fetch all the domains, their cookies and filter cookies for categories
// const fetchDomainsFromAPI = () => {
//   let config = {
//     method: "get",
//     url: "https://cmp.gjirafa.dev/DomainListViewTestHalabaku",
//     headers: {},
//   };

//   axios(config)
//     .then(function (response) {
//       responseData = response.data;
//       console.log("==========︾==========");
//       console.log("🚀 ~ categories", categories);
//       console.log("🚀 ~ responseData", responseData);
//       // console.log("🚀 ~ dataForBala", dataForBala);
//       // console.log("==========xxx==========");
//       filterCookiesByCategory(
//         response.data,
//         5,
//         NECESSARY,
//         "NECESSARY"
//       );
//       filterCookiesByCategory(
//         response.data,
//         4,
//         PREFERENCES,
//         "PREFERENCES"
//       );
//       filterCookiesByCategory(
//         response.data,
//         3,
//         ANALYTICAL,
//         "ANALYTICAL"
//       );
//       filterCookiesByCategory(
//         response.data,
//         2,
//         MARKETING,
//         "MARKETING"
//       );
//       filterCookiesByCategory(response.data, 1, OTHER, "OTHER");
//       console.log("==========︽==========");
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// };

// //! Fetch data from the CATEGORIES endpoint
// const fetchCategoriesFromAPI = () => {
//   let config = {
//     method: "get",
//     url: "https://cmp.gjirafa.dev/CategoryListView",
//     headers: {},
//   };
//   axios(config)
//     .then(function (response) {
//       // console.log(response.data);
//       categories = response.data;
//       // createCategoriesContent();
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// };

//!  FILL THE COOKIE SETTINGS SECTION
function fillCookieSettingItem() {
  console.log("fillCookieSettingItem()");
  // console.log(COOKIE_SETTINGS);
  // console.log(COOKIE_DISPLAY);

  const cookieSettingsInject = document.querySelector(".cookieSettingsInject");
  console.log("🚀 ~  FILL COOKIES w/INJECT", cookieSettingsInject);
  // debugger
  cookieSettingsInject.innerHTML = cookiesPerCategory
    .map((item, index) => {
      let expirationDate = moment(item.expiration).endOf("day").fromNow();
      // console.log(item);
      return `<div class="settingAccordion border border-gray-200 my-0.5 xl:my-2 rounded-md">
      <div class="accordionHeader cursor-pointer flex justify-between p-4" onclick="settingsAccordionToggle(${index})">
        <p class="category-title font-medium">${item.name}</p>
        <div class="controlButtons flex">
        <div id="closeIcon" class="carret closeIcon cursor-pointer my-auto"><img src="${CARET_DOWN_ICON}"
            class="toggleAccordion transition transform duration-500 ease-in-out " alt="caret up/down"/></div>
        </div>
      </div>
      <div class="accordionContent border-t mx-4 h-0 hidden transition-all duration-500 ease-in-out">
        <ul class="w-full h-auto bg-gray-100 opacity-0 mb-4 transition duration-300 ease-in-out transform ">
            <li class="flex justify-between my-4 p-2">
              <span class="flex-1 text-primary-light">Name</span>
              <span class="flex-1" id="cookieName">${item.name}</span>
            </li>
            <li class="flex justify-between my-4 p-2">
              <span class="flex-1 text-primary-light">Host</span>
              <span class="flex-1" id="cookieHost">${item.cookieDomain}</span>
            </li>
            <li class="flex justify-between my-4 p-2">
              <span class="flex-1 text-primary-light">Duration</span>
              <span class="flex-1" id="cookieDuration">${expirationDate}</span>
            </li>
            <li class="flex justify-between my-4 p-2">
              <span class="flex-1 text-primary-light">Category</span>
              <span class="flex-1" id="cookieCategory">${item.category}</span>
             </li>
            <li class="flex justify-between my-4 p-2">
              <span class="flex-1 text-primary-light">Description</span>
              <span class="flex-1" id="cookieDescription">${item.description}</span>
            </li>
        </ul>
      </div>
    </div>
    </div>
    `;
    })
    .join("");
}

//! fetch category cookies
function categoryCookieFetch(id, storeVariable) {
  responseData.filter((el) => {
    el.cookies.filter((item) => {
      if (item.categoryId === id) {
        storeVariable.push(item);
      }
    });
  });
  console.log(
    "🚀 ~ file: cookies.js ~ line 377 ~ categoryCookieFetch ~ id",
    id
  );
  console.log("🚀 ~ cookiesPerCategory", storeVariable);
}

//! toggle injected radio button ON/OFF to accept and/or decline cookies
function toggleInjectedRadioButtons() {
  const injectedLabel = document.querySelectorAll(".dotWrapper");
  for (let i = 0; i < injectedLabel.length; i++) {
    console.log("🚀 ~ toggleInjectedRadioButtons ~ item", i);
    const injectedInput = injectedLabel[i].getElementsByTagName("input");
    const injectedInputButton =
      injectedLabel[i].getElementsByClassName("consentButton");
    responseForCookies.push({
      cookie_name: injectedInput[0].value,
      cookie_status: injectedInput[0].checked,
    });
    injectedInputButton.addEventListener("click", (event) => {
      event.stopPropagation();
    });
    setTimeout(() => {
      for (const iterator of inputCheckout) {
        console.log(iterator.value, "-->", iterator.checked);
      }
    }, 500);
  }
  console.log("responseForCookies", responseForCookies);
}
// !============================================================================================================

// // import CMP_Section from "./scripts";

// const { CARET_DOWN_ICON, COOKIES_CATEGORIES } = require("./constants");
// const { getCookiesData } = require("./getDomainsWithCookies");
// const { setCookie } = require("./utils/cookie");
// const axios = require("axios");
// const moment = require("moment");

// console.log(create_UUID());
// const OTHER = [];
// const MARKETING = [];
// const ANALYTICAL = [];
// const PREFERENCES = [];
// const NECESSARY = [];
// let responseData = [];
// let categories = [];
// // let filteredCookies = [];
// let responseForCookies = []; //?{ cookie_name: "", cookie_status: "" }
// let cookiesPerCategory = [];
// // let dataForBala = [];
// let dataForBala = {};

// window.addEventListener("load", function (event) {
//   console.log(
//     "welcome to🔐 \n",
//     `
//       CCCCCCCCCCCCC MMMMMMMM              MMMMMMMMM PPPPPPPPPPPPPPP
//     CCC:::::::::::C M:::::::M             M:::::::M P:::::::::::::::P
//   CC::::::::::::::C M::::::::M           M::::::::M P:::::PPPPPP:::::P
//  C:::::CCCCCCCC:::C M:::::::::M         M:::::::::M P:::::P     P:::::P
// C:::::C       CCCCC M::::::::::M       M::::::::::M P:::::P     P:::::P
// C:::::C              M::::::::::M     M::::::::::M   P::::P     P:::::P
// C:::::C              M::::::M::::M   M::::M::::::M   P::::PPPPPP:::::P
// C:::::C              M:::::M M::::M M::::M M:::::M   P:::::::::::::PP
// C:::::C              M:::::M  M::::M::::M  M:::::M   P::::PPPPPPPPP
// C:::::C              M:::::M   M:::::::M   M:::::M   P::::P
// C:::::C              M:::::M    M:::::M    M:::::M   P::::P
// C:::::C       CCCCC M::::::M     MMMMM     M::::::M P::::::P
//  C:::::CCCCCCCC:::C M::::::M               M::::::M P::::::P
//   CC::::::::::::::C M::::::M               M::::::M P::::::P
//     CCC:::::::::::C M::::::M               M::::::M P::::::P
//        CCCCCCCCCCCC MMMMMMMM               MMMMMMMM PPPPPPPP
//     `
//   );
//   const COOKIE_SETTINGS = document.getElementById("COOKIE_SETTINGS");
//   const COOKIE_DISPLAY = document.getElementById("COOKIE_DISPLAY");
//   const spinner = document.getElementById("spinner");
//   const noData = document.getElementById("noData");
//   const goBack = document.getElementById("goBack");

//   // const cookieSectionInject = document.querySelector(".cookieSectionInject");
//   const cookieSectionInject = document.getElementById("cookieSectionInject");
//   //! execute the necessary functions on document load
//   // window.onload = () => {
//   fetchDomainsFromAPI();
//   fetchCategoriesFromAPI();
//   // bannerAccordionToggle()

//   setTimeout(() => {
//     toggleInjectedRadioButtons();

//     // bannerAccordionToggle()
//     // showModal();

//     dataForBala = {
//       id: create_UUID(),
//       domains: responseData,
//       NECESSARY: NECESSARY,
//       PREFERENCES: PREFERENCES,
//       ANALYTICAL: ANALYTICAL,
//       MARKETING: MARKETING,
//       OTHER: OTHER,
//     };
//     console.log("==================🧲🧲🧲🧲====================");
//     console.log("🚀 ~ categories", categories);
//     console.log("🚀 ~ responseData", responseData);

//     console.log("🚀 ~ DATA-4-BALA", dataForBala);
//     console.log("==================🧲🧲🧲🧲=====================");

//     // if (responseData.length === 0) {
//     //   noData.classList.remove("hidden");
//     // }
//   }, 300);
//   // };
// });

// function create_UUID() {
//   var dt = new Date().getTime();
//   var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
//     /[xy]/g,
//     function (c) {
//       var r = (dt + Math.random() * 16) % 16 | 0;
//       dt = Math.floor(dt / 16);
//       return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
//     }
//   );
//   return uuid;
// }

// //! fetch all the domains, their cookies and filter cookies for categories
// const fetchDomainsFromAPI = () => {
//   let config = {
//     method: "get",
//     url: "https://cmp.gjirafa.dev/DomainListViewTestHalabaku",
//     headers: {},
//   };

//   axios(config)
//     .then(function (response) {
//       responseData = response.data;
//       // cookiesPerCategory = response.data;
//       // console.log("🚀 ~ file: cookies.js ~ line 159 ~ cookiesPerCategory", cookiesPerCategory)
//       // console.log(response.data);
//       console.log("==========︾==========");
//       console.log("🚀 ~ categories", categories);
//       console.log("🚀 ~ responseData", responseData);
//       // console.log("🚀 ~ dataForBala", dataForBala);
//       // console.log("==========xxx==========");
//       CMP_Section.filterCookiesByCategory(
//         response.data,
//         5,
//         NECESSARY,
//         "NECESSARY"
//       );
//       CMP_Section.filterCookiesByCategory(
//         response.data,
//         4,
//         PREFERENCES,
//         "PREFERENCES"
//       );
//       CMP_Section.filterCookiesByCategory(
//         response.data,
//         3,
//         ANALYTICAL,
//         "ANALYTICAL"
//       );
//       CMP_Section.filterCookiesByCategory(
//         response.data,
//         2,
//         MARKETING,
//         "MARKETING"
//       );
//       CMP_Section.filterCookiesByCategory(response.data, 1, OTHER, "OTHER");
//       console.log("==========︽==========");
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// };

// //! Fetch data from the CATEGORIES endpoint
// const fetchCategoriesFromAPI = () => {
//   let config = {
//     method: "get",
//     url: "https://cmp.gjirafa.dev/CategoryListView",
//     headers: {},
//   };
//   axios(config)
//     .then(function (response) {
//       // console.log(response.data);
//       categories = response.data;
//       // createCategoriesContent();
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// };

// //!  FILL THE COOKIE SETTINGS SECTION
// function fillCookieSettingItem() {
//   console.log("fillCookieSettingItem()");
//   // console.log(COOKIE_SETTINGS);
//   // console.log(COOKIE_DISPLAY);

//   const cookieSettingsInject = document.querySelector(".cookieSettingsInject");
//   console.log("🚀 ~  FILL COOKIES w/INJECT", cookieSettingsInject);
//   // debugger
//   cookieSettingsInject.innerHTML = cookiesPerCategory
//     .map((item, index) => {
//       let expirationDate = moment(item.expiration).endOf("day").fromNow();
//       // console.log(item);
//       return `<div class="settingAccordion border border-gray-200 my-0.5 xl:my-2 rounded-md">
//       <div class="accordionHeader cursor-pointer flex justify-between p-4" onclick="CMP_Section.settingsAccordionToggle(${index})">
//         <p class="category-title font-medium">${item.name}</p>
//         <div class="controlButtons flex">
//         <div id="closeIcon" class="carret closeIcon cursor-pointer my-auto"><img src="${CARET_DOWN_ICON}"
//             class="toggleAccordion transition transform duration-500 ease-in-out " alt="caret up/down"/></div>
//         </div>
//       </div>
//       <div class="accordionContent border-t mx-4 h-0 hidden transition-all duration-500 ease-in-out">
//         <ul class="w-full h-auto bg-gray-100 opacity-0 mb-4 transition duration-300 ease-in-out transform ">
//             <li class="flex justify-between my-4 p-2">
//               <span class="flex-1 text-primary-light">Name</span>
//               <span class="flex-1" id="cookieName">${item.name}</span>
//             </li>
//             <li class="flex justify-between my-4 p-2">
//               <span class="flex-1 text-primary-light">Host</span>
//               <span class="flex-1" id="cookieHost">${item.cookieDomain}</span>
//             </li>
//             <li class="flex justify-between my-4 p-2">
//               <span class="flex-1 text-primary-light">Duration</span>
//               <span class="flex-1" id="cookieDuration">${expirationDate}</span>
//             </li>
//             <li class="flex justify-between my-4 p-2">
//               <span class="flex-1 text-primary-light">Category</span>
//               <span class="flex-1" id="cookieCategory">${item.category}</span>
//              </li>
//             <li class="flex justify-between my-4 p-2">
//               <span class="flex-1 text-primary-light">Description</span>
//               <span class="flex-1" id="cookieDescription">${item.description}</span>
//             </li>
//         </ul>
//       </div>
//     </div>
//     </div>
//     `;
//     })
//     .join("");
// }

// //! fetch category cookies
// function categoryCookieFetch(id, storeVariable) {
//   responseData.filter((el) => {
//     el.cookies.filter((item) => {
//       if (item.categoryId === id) {
//         storeVariable.push(item);
//       }
//     });
//   });
//   console.log(
//     "🚀 ~ file: cookies.js ~ line 377 ~ categoryCookieFetch ~ id",
//     id
//   );
//   console.log("🚀 ~ cookiesPerCategory", storeVariable);
// }

// //! toggle injected radio button ON/OFF to accept and/or decline cookies
// function toggleInjectedRadioButtons() {
//   const injectedLabel = document.querySelectorAll(".dotWrapper");
//   for (let i = 0; i < injectedLabel.length; i++) {
//     console.log("🚀 ~ toggleInjectedRadioButtons ~ item", i);
//     const injectedInput = injectedLabel[i].getElementsByTagName("input");
//     responseForCookies.push({
//       cookie_name: injectedInput[0].value,
//       cookie_status: injectedInput[0].checked,
//     });
//     setTimeout(() => {
//       for (const iterator of inputCheckout) {
//         console.log(iterator.value, "-->", iterator.checked);
//       }
//     }, 500);
//   }
// }

// module.exports = CMP_Section = {
//   fillSelect: function (select, options, selected, cb) {
//     if (typeof cb != "function") {
//       cb = this.getSimpleOption;
//     }
//     select.innerHTML = Object.keys(options).reduce(function (str, key) {
//       return str + cb(options[key], key, key == selected);
//     }, "");
//   },
//   getSimpleOption: function (label, value, selected) {
//     return (
//       "<option " +
//       (selected ? 'selected="selected"' : "") +
//       ' value="' +
//       value +
//       '">' +
//       label +
//       "</option>"
//     );
//   },

//   allowAllCookies: function (event) {
//     setTimeout(() => {
//       console.log("🚀 ~ ALLOW ALL", event);
//       // const allowAllCookiesButton = document.querySelectorAll("allowAll");
//       // console.log("🚀 ~ ALLOW ALL", allowAllCookiesButton);
//       const radioButtons = document.querySelectorAll(".radioButtonCookie");
//       const cookieRadioButton = document.querySelectorAll(".cc-btn");

//       // allowAllCookiesButton.forEach((element) => {
//       // event.target.addEventListener("click", () => {
//       console.log("click allow all");
//       for (let index = 0; index < radioButtons.length; index++) {
//         const element = radioButtons[index];
//         element.checked = true;
//         // setTimeout(() => {
//         console.log(element.checked);
//         // cookieRadioButton[index].change()
//         element.addEventListener("change", console.log("change"));
//         const event = new Event("change");
//         element.dispatchEvent(event);
//         // }, 500);
//       }
//       // });
//       // });
//       for (let i = 0; i < COOKIES_CATEGORIES.length; i++) {
//         // getCookiesData(i + 1);
//         getCookiesData(i + 1).then((data) => {
//           // ALL_DATA.push(data); // console.log("DATaAaaaaaaaaa",data)
//           console.log("ALL COOKIES ", data);
//           for (const cookie of data) {
//             setCookie(
              // cookie.name, //name
              // "", //value
              // cookie.expiryDays, //expiration day
              // "", //domain
              // cookie.path, //path
              // // "/",
              // cookie.is_secure //is secure
//             );
//           }
//         });
//       }
//       // saveAllCookies();
//     }, 500);
//     // console.log(radioButtons);
//     document.removeEventListener("click", event.target);
//   },
//   acceptNecessary: function () {
//     let ALL_DATA = [];
//     getCookiesData(5).then((data) => {
//       // ALL_DATA.push(data); // console.log("DATaAaaaaaaaaa",data)
//       console.log("NECESSARY COOKIES ONLY", data);
//       for (const cookie of data) {
//         setCookie(
//           cookie.name, //name
//           "", //value
//           cookie.expiryDays, //expiration day
//           "", //domain
//           cookie.path, //path
//           // "/",
//           cookie.is_secure //is secure
//         );
//       }
//     });
//   },

//   bannerAccordionToggle: function (index) {
//     console.log("🚀 ~ IDDDDD", index);
//     // debugger;
//     let accordionHeader = document.querySelectorAll(
//       ".cc-category .accordionHeader"
//     );
//     let accordionContent = document.querySelectorAll(
//       ".cc-category .accordionContent"
//     );

//     ["h-0", "hidden"].map((i) => {
//       console.log(i);
//       document
//         .getElementById(`CATEGORY_CONTENT_${index}`)
//         ?.classList?.toggle(i);
//     });
//     const children = accordionContent[index]?.children;
//     console.log("🚀 ~ CHILDREN", accordionContent[index]);
//     console.log("BANNER CLICK ACCORDION ", index, " TOGGLE");
//   },

//   showModal: function (event, index) {
//     let id;
//     const toggle = document.querySelectorAll(".cookieDetails");
//     console.log("CATEGORY ID CLIKED: ", index);
//     COOKIE_SETTINGS.classList.remove("hidden");
//     COOKIE_DISPLAY.classList.add("hidden");
//     CMP_Section.filterCookiesByCategory(
//       responseData,
//       index,
//       cookiesPerCategory,
//       "CLICKED ON"
//     );
//     // settingsAccordionToggle();
//     fillCookieSettingItem();
//   },
//   goBackFunc: function () {
//     // goBack.addEventListener("click", () => {
//     console.log("GO BACK");
//     COOKIE_DISPLAY.classList.remove("hidden");
//     COOKIE_SETTINGS.classList.add("hidden");
//     cookiesPerCategory = [];
//     // });
//   },
//   filterCookiesByCategory: function (arr, id, storeVariable, category) {
//     // let res=[];
//     arr.filter((el) => {
//       // console.log("1st", storeVariable);
//       el.cookies.filter((item) => {
//         if (item.categoryId === id) {
//           storeVariable.push(item);
//         }
//       });
//     });
//     // console.log(`🚀 ~ ${category} id:`, id, `=> `, storeVariable);
//   },
//   settingsAccordionToggle: function (index) {
//     let accordionHeader = document.querySelectorAll(
//       ".settingAccordion .accordionHeader"
//     );
//     console.log("🚀 ~ Settings Accordion Elements", accordionHeader.length);
//     let accordionContent = document.querySelectorAll(
//       ".settingAccordion .accordionContent"
//     );
//     const carretToggle = document.querySelectorAll(".toggleAccordion");
//     ["h-0", "hidden"].map((i) => accordionContent[index]?.classList?.toggle(i));
//     carretToggle[index]?.classList?.toggle("rotate-180");
//     const children = accordionContent[index].children;
//     for (element in children) {
//       children[element]?.classList?.toggle("opacity-0");
//     }
//     console.log("click");
//   },
//   fillCookies: function () {
//     setTimeout(() => {
//       console.log("fillCookie()");
//       // console.log(COOKIE_SETTINGS);
//       // console.log(COOKIE_DISPLAY);

//       const cookieCategoriesInject = document.querySelector(
//         ".cookieCategoriesInject"
//       );
//       console.log("🚀 ~  FILL COOKIES w/INJECT PETRIT", cookieCategoriesInject);

//       console.log(
//         "🚀 ~ file: scripts.js ~ line 416 ~ fillCookies ~ cookieCategoriesInject",
//         cookieCategoriesInject
//       );
//       console.log("========================================================");
//       cookieCategoriesInject.innerHTML = categories
//         ?.slice(0)
//         ?.reverse()
//         ?.map((item) => {
//           console.log("ID", item.id);
//           return `<li class="cc-category flex-col border border-gray-200 my-0.5 xl:my-2 rounded-md  cursor-pointer"  >
//           <div class="accordionHeader w-full cursor-pointer flex justify-between p-4" onclick="CMP_Section.bannerAccordionToggle(${
//             item.id
//           })">
//             <p class=" category-title font-medium">${item.name}</p>
//             <label for=${item.name.toLowerCase()} class="switch-toggle relative dotWrapper inline-flex cursor-pointer" tabindex=${
//             item.id
//           }>
//             <button class="cc-btn  group relative" onclick="CMP_Section.stopParent(event)">
//               <input type="checkbox" id="${
//                 item.id
//               }" class="radioButtonCookie" name="${item.name}"
//                 value="${item.name.toLowerCase()}" ${
//             item.name.toLowerCase() === "necessary" && "disabled checked"
//           } />
//               <div class="switch-holder block border border-primary-stroke  w-9 h-6 rounded-full transition"></div>
//               <div class="${
//                 item.name.toLowerCase() === "necessary" &&
//                 "translate-x-3 transform cursor-not-allowed"
//               } dot absolute left-1 top-1 my-0 w-4 h-4 rounded-full transition
//                 ${
//                   item.name.toLowerCase() === "necessary"
//                     ? "bg-red-700"
//                     : "bg-gray-400"
//                 }"></div>
//             </button>
//             </label>
//           </div>
//           <div class="accordionContent border-t h-0 hidden transition-all duration-500 ease-in-out " id="CATEGORY_CONTENT_${
//             item.id
//           }">
//           <div class="mx-4 py-4 px-2">
//           <p class="category-description mb-4 transition duration-300 ease-in-out transform">
//           ${item.name}
//         </p>
//         <div onclick="CMP_Section.showModal(event,${item.id})">
//           <p value=${item.id}
//             class="cookieDetails text-blue-500  transition duration-300 ease-in-out transform cursor-pointer max-w-max">
//             Cookies Details</p>
//         </div>
//           </div>

//           </div>
//         </li>`;
//         })
//         .join("");
//     }, 400);
//   },
//   stopParent: function (event) {
//     event.stopPropagation();
//   },
//   testClick: function (event) {
//     console.log("TEST SETTINGS CLICK", event.target);
//   },
// };
