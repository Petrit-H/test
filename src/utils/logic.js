import { format, formatDistance, fromUnixTime } from "date-fns";
import { CARET_DOWN_ICON } from "../constants";
import {
  categories,
  getCookies,
  getCookiesPerCategory,
  saveNecessaryCookies,
  saveSpecificCookies,
} from "../getDomainsWithCookies";

const COOKIE_SETTINGS = document.getElementById("COOKIE_SETTINGS");
const COOKIE_DISPLAY = document.getElementById("COOKIE_DISPLAY");
let data = [];
let COOKIES = [];

// //!  FILL THE COOKIE SETTINGS SECTION
const fillCookiesSettingItem = (categoryId, domainId) => {
  getCookiesPerCategory(categoryId, 135).then(({ cookies }) => {
    // getCookies().then(( cookies ) => {
    COOKIES = cookies;
    console.log("🚀 ~ ~ ", COOKIES);
  });
  setTimeout(() => {
    const cookieSettingsInject = document.querySelector(
      ".cookieSettingsInject"
    );
    cookieSettingsInject.innerHTML = COOKIES?.map((item) => {
      settingsAccordionToggle();
      // const valid = new Date(item.expiration).getTime();
      // let expirationDate = !!valid
      //   ? formatDistance(new Date(fromUnixTime(valid)), new Date(), {
      //       addSuffix: true,
      //     })
      //   : "Unknown date";

      return `<div class="settingAccordion border border-gray-200 my-0.5 xl:my-2 rounded-md">
        <div class="accordionHeader cursor-pointer flex justify-between p-4" data-cookie-settings-id=${categoryId}>
        <p class="category-title font-medium">${item.name}</p>
        <div class="controlButtons flex">
        <div id="closeIcon" class="carret closeIcon cursor-pointer my-auto"><img src="${CARET_DOWN_ICON}"
        class="toggleAccordion transition transform duration-500 ease-in-out " alt="caret up/down"/></div>
        </div>
        </div>
        <div class="accordionContent border-t mx-4 h-0 hidden transition-all duration-500 ease-in-out">
        <ul class="w-full h-auto bg-gray-100  mb-4 transition duration-300 ease-in-out transform ">
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
        <span class="flex-1" id="cookieDuration">${item.expiration/3600}</span>
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
    }).join("");
  }, 200);
};
const filterCookiesByCategory = function (arr, id, storeToVariable, category) {
  arr.map((item) => {
    // el.filter((item) => {
    if (item.categoryId === id) {
      storeToVariable.push(item);
    }
    // });
  });
  console.log(`🚀 ~ ${category} id:`, id, `=> `, storeToVariable);
  return storeToVariable;
};
const bannerAccordionToggle = function () {
  setTimeout(() => {
    const accordionHeaders = document.querySelectorAll(
      ".cc-category .accordionHeader"
    );
    const accordionContents = document.querySelectorAll(
      ".cc-category .accordionContent"
    );
    const categoryDescription =
      document.getElementsByClassName("cookieDetails");
    const injectedLabel = document.querySelectorAll(".dot-wrapper");

    for (let i = 0; i < accordionHeaders.length; i++) {
      const categoryID = accordionHeaders[i].dataset.categoryId;
      const domainID = accordionHeaders[i].dataset.did;
      injectedLabel[i].addEventListener("click", (event) => {
        event.stopPropagation();
      });
      accordionHeaders[i].addEventListener("click", () => {
        // saveNecessaryCookies(4);
        // acceptSpecificCookies(categoryID);
        const contentData = document.getElementById(
          `CATEGORY_CONTENT_${categoryID}`
        );
        ["h-0", "hidden"].map((cssClass) => {
          contentData?.classList?.toggle(cssClass);
        });
        const children = accordionContents[i].childNodes;
        console.log("BANNER CLICK ACCORDION ", categoryID, " TOGGLE");
      });
      categoryDescription[i].addEventListener("click", () => {
        console.log("dataset", categoryDescription[i].dataset);
        showModal(categoryID, domainID);
      });
    }
  }, 300);
};
const goBackFunc = function () {
  console.log("GO BACK");
  document.getElementById("COOKIE_SETTINGS").classList.add("hidden");
  // COOKIE_SETTINGS.classList.remove("hidden");
  document.getElementById("COOKIE_DISPLAY").classList.remove("hidden");
  // COOKIE_DISPLAY.classList.add("hidden");
  data = [];
  // });
};
const showModal = function (categoryId, domainId) {
  document.getElementById("COOKIE_SETTINGS").classList.remove("hidden");
  document.getElementById("COOKIE_DISPLAY").classList.add("hidden");
  const goBack = document.getElementById("goBack");
  goBack.addEventListener("click", () => {
    goBackFunc();
  });
  fillCookiesSettingItem(categoryId, domainId);
};
const settingsAccordionToggle = function () {
  setTimeout(() => {
    const accordionHeader = document.querySelectorAll(
      ".settingAccordion .accordionHeader"
    );
    const accordionContent = document.querySelectorAll(
      ".settingAccordion .accordionContent"
    );
    const carretToggle = document.querySelectorAll(".toggleAccordion");
    for (let i = 0; i < accordionHeader.length; i++) {
      accordionHeader[i].addEventListener("click", () => {
        ["h-0", "hidden"].map((cssClass) => {
          accordionContent[i]?.classList?.toggle(cssClass);
          console.log(
            "🚀 ~ file: logic.js ~ line 153 ~ accordionHeader[i].addEventListener ~ cssClass",
            cssClass
          );
        });
        console.log(
          " accordionContent[i]?.classList?",
          accordionContent[i]?.classList
        );
        console.log("accordionContent[index]", accordionContent[i]);
        console.log("accordionContent[index]", accordionHeader[i]);
        carretToggle[i]?.classList?.toggle("rotate-180");
      });
    }
  }, 200);
};
const fillCookies = function () {
  setTimeout(() => {
    const cookieCategoriesInject = document.querySelector(
      ".cookie-categories-inject"
    );
    cookieCategoriesInject.innerHTML = categories
      ?.slice(0)
      ?.reverse()
      ?.map((item) => {
        setTimeout(() => {
          const target = document.getElementById(`test-${item.id}`);
          target.addEventListener("click", () => {
            console.log(item);
          });
        }, 200);
        return `<li id=test-${
          item.id
        } class="cc-category flex-col border border-gray-200 my-0.5 xl:my-2 rounded-md  cursor-pointer"  >
      <div class="accordionHeader w-full cursor-pointer flex justify-between p-4" data-category-id=${
        item.id
      } data-did=${item.domainId}
      >
      <p class=" category-title font-medium">${item.name}</p>
      <label for=${item.name.toLowerCase()} class="switch-toggle relative dot-wrapper inline-flex cursor-pointer" tabindex=${
          item.id
        }>
      <button class="cc-btn w-auto group relative consentButton " >
      <input type="checkbox" id="${item.id}" class="radioButtonCookie" name="${
          item.name
        }"
      value="${item.name.toLowerCase()}" ${
          item.name.toLowerCase() === "necessary" && "disabled checked"
        } />
      <div class="switch-holder block border border-primary-stroke  w-9 h-6 rounded-full transition"></div>
      <div class="${
        item.name.toLowerCase() === "necessary" &&
        "translate-x-3 transform cursor-not-allowed"
      } dot absolute left-1 top-1 my-0 w-4 h-4 rounded-full transition
      ${
        item.name.toLowerCase() === "necessary" ? "bg-red-700" : "bg-gray-400"
      }"></div>
                 </button>
                 </label>
                 </div>
                 <div class="accordionContent border-t h-0 hidden transition-all duration-500 ease-in-out " id="CATEGORY_CONTENT_${
                   item.id
                 }">
                  <div class="mx-4 py-4 px-2">
                  <p class="category-description mb-4 transition duration-300 ease-in-out transform">
                  ${item.name}
                  </p>
                  <p value=${item.id} data-settings-details-id=${item.id}
                  class="cookieDetails text-blue-500  transition duration-300 ease-in-out transform cursor-pointer max-w-max">
                  Cookies Details</p>
                  </div>

                  </div>
                  </li>`;
      })
      .join("");
  }, 300);
};
const allowAllCookies = function () {
  getCookies().then((data) => {
    setTimeout(() => {
      const allowAllCookiesButton = document.querySelector(".allow-all");
      const radioButtons = document.querySelectorAll(".radioButtonCookie");
      const cookieRadioButton = document.querySelectorAll(".cc-btn");
      allowAllCookiesButton.addEventListener("click", () => {
        for (let i = 0; i < radioButtons.length; i++) {
          const element = radioButtons[i];
          element.checked = true;
          console.log(element.checked);
          element.addEventListener("change", console.log("change"));
          const event = new Event("change");
          element.dispatchEvent(event);
          saveSpecificCookies(i + 1);
        }
      });
    }, 300);
  });
  // document.removeEventListener("click", allowAllCookiesButton);
};
const acceptNecessary = function () {
  // const ALL_DATA = [];
  setTimeout(() => {
    const gotItButton = document.querySelector(".gotItButton");
    gotItButton.addEventListener("click", () => {
      console.log("================acceptNecessary=================");
      saveNecessaryCookies();
    });
  }, 300);
};
const stopParentClick = function (event) {
  event.stopPropagation();
};

export {
  bannerAccordionToggle,
  showModal,
  goBackFunc,
  filterCookiesByCategory,
  settingsAccordionToggle,
  fillCookies,
  fillCookiesSettingItem,
  allowAllCookies,
  acceptNecessary,
  stopParentClick,
};
