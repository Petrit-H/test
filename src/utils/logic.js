import {
  ANALYTICAL,
  CARET_DOWN_ICON,
  MARKETING,
  NECESSARY,
  OTHER,
  PREFERENCES,
} from "../constants";
import {
  categories,
  fetchDataFromJSONFile,
  getCookies,
  getCookiesPerCategory,
  saveNecessaryCookies,
  saveSpecificCookies,
  User,
  DomainId,
  DomainName,
  DomainWebsiteUrl,
  Language,
  LanguagesList,
  DomainCategoriesWithCookies,
  DomainCategories,
  CookiesPerDomain,
} from "../getDomainsWithCookies";

// const COOKIE_SETTINGS = document.getElementById("COOKIE_SETTINGS");
// const COOKIE_DISPLAY = document.getElementById("COOKIE_DISPLAY");
let data = [];
let COOKIES = [];
let cookiesPerCateroryArr = [];

let response = [];
const filterCookiesByCategory = (arr, id, storeToVariable, category) => {
  //  arr.map((item) => {
  response = arr.filter((item) => item.categoryId === +id);
  // });
  console.log(`🚀 ~ ${category} id:`, +id, `=> `, response);
  return response;
  // return storeToVariable;
};

// //!  FILL THE COOKIE SETTINGS SECTION
const fillCookiesSettingItem = (categoryId, domainId) => {
  // fetchDataFromJSONFile().then((json) => console.log("kkkk", json));

  // getCookiesPerCategory(categoryId, 135).then(({ cookies }) => {
  //   // getCookies().then(( cookies ) => {
  //     COOKIES = cookies;
  //     const noData = document.getElementById("noData");
  //     if (COOKIES.length === 0) {
  //       noData.classList.remove("hidden");
  //     } else {
  //       noData.classList.add("hidden");
  //     }
  //   });
  COOKIES = filterCookiesByCategory(
    CookiesPerDomain,
    categoryId,
    cookiesPerCateroryArr,
    "COOKIES"
  );
  console.log(
    "🚀 ~ file: logic.js ~ line 48 ~ //getCookiesPerCategory ~ COOKIES",
    COOKIES
  );
  console.log("==========︾==========");
  filterCookiesByCategory(CookiesPerDomain, 5, NECESSARY, "NECESSARY");
  filterCookiesByCategory(CookiesPerDomain, 4, PREFERENCES, "PREFERENCES");
  filterCookiesByCategory(CookiesPerDomain, 3, ANALYTICAL, "ANALYTICAL");
  filterCookiesByCategory(CookiesPerDomain, 2, MARKETING, "MARKETING");
  filterCookiesByCategory(CookiesPerDomain, 1, OTHER, "OTHER");
  console.log("==========︽==========");
  // COOKIES = cookies;
  // COOKIES = CookiesPerDomain;
  const noData = document.getElementById("noData");
  if (COOKIES.length === 0) {
    noData.classList.remove("hidden");
  } else {
    noData.classList.add("hidden");
  }

  setTimeout(() => {
    const customCategoriesBanner = document.querySelector(
      ".custom-categories-banner"
    );

    customCategoriesBanner.innerHTML = COOKIES?.map((item) => {
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
        <span class="flex-1" id="cookieDuration">${item.expiration}</span>
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
    settingsAccordionToggle();
  }, 200);
};

//? Toggle the category accordion
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
        const contentData = document.getElementById(
          `CATEGORY_CONTENT_${categoryID}`
        );
        ["h-0", "hidden"].map((cssClass) => {
          contentData?.classList?.toggle(cssClass);
        });
        const children = accordionContents[i].childNodes;
      });
      categoryDescription[i].addEventListener("click", () => {
        showModal(categoryID, domainID);
      });
    }
  }, 300);
};

//? Send the user one step back
const goBackFunc = function () {
  console.log("go back");
  document.getElementById("COOKIE_SETTINGS").classList.add("hidden");
  document.getElementById("COOKIE_DISPLAY").classList.remove("hidden");
  data = [];
  COOKIES = [];
};
//? Show the "Cookies Settings" modal
const showModal = function (categoryId, domainId) {
  document.getElementById("COOKIE_SETTINGS").classList.remove("hidden");
  document.getElementById("COOKIE_DISPLAY").classList.add("hidden");
  const goBack = document.getElementById("goBack");
  goBack.addEventListener("click", () => {
    goBackFunc();
  });
  fillCookiesSettingItem(categoryId, domainId);
};

/**
 * @param {HTMLElement} el
 * @param  {...any} cls
 */
const toggleCSSclasses = (el, ...cls) => {
  cls.map((cl) => el.classList.toggle(cl));
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
      accordionHeader[i].addEventListener("click", function () {
        toggleCSSclasses(accordionContent[i], "hidden", "h-0");
        carretToggle[i].classList.toggle("rotate-180");
      });
    }
  }, 200);
};

const fillCategories = function () {
  fetchDataFromJSONFile().then((json) => console.log("kkkk", json));
  setTimeout(() => {
    console.log("LOGIC", {
      User,
      DomainId,
      DomainName,
      DomainWebsiteUrl,
      Language,
      LanguagesList,
      DomainCategoriesWithCookies,
      DomainCategories,
    });
    const basicCategoriesBanner = document.querySelector(
      ".basic-categories-banner"
    );
    console.log("🚀 ~ ~ ~ basicCategoriesBanner", basicCategoriesBanner);
    console.log(DomainCategories);
    basicCategoriesBanner.innerHTML = DomainCategories
      // basicCategoriesBanner.innerHTML = categories
      ?.slice(0)
      ?.reverse()
      ?.map((item) => {
        // setTimeout(() => {
        //   const target = document.getElementById(`test-${item.id}`);
        //   target.addEventListener("click", () => {
        //     console.log(item);
        //   });
        // }, 200);
        return `<li id=test-${
          item.id
        } class="cc-category flex-col border border-gray-200 my-0.5 xl:my-2 rounded-md  cursor-pointer"  >
      <div class="accordionHeader w-full cursor-pointer flex justify-between p-4" data-category-id=${
        item.id
      } data-did=${DomainId}
      >
      <p class=" category-title font-medium">${item.name}</p>
      <label for=${item.name.toLowerCase()} class="switch-toggle relative dot-wrapper inline-flex cursor-pointer" tabindex=${
          item.id
        }>
      <button class="cc-btn w-auto group relative consentButton " >
      <input type="checkbox" id="${item.id}" ${
          item.checked && "checked"
        } class="radioButtonCookie" name="${item.name}"
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
                  ${item.description}
                  </p>
                  <p value=${item.id} data-settings-details-id=${item.id}
                  class="cookieDetails text-blue-500  transition duration-300 ease-in-out transform cursor-pointer max-w-max">
                  Cookies Details</p>
                  </div>

                  </div>
                  </li>`;
      })
      .join("");
  }, 150);
};
const allowAllCookies = function () {
  // getCookies().then((data) => {
  setTimeout(() => {
    const allowAllCookiesButton = document.querySelector(".allow-all");
    const radioButtons = document.querySelectorAll(".radioButtonCookie");
    const cookieRadioButton = document.querySelectorAll(".cc-btn");
    allowAllCookiesButton.addEventListener("click", () => {
      for (let i = 0; i < radioButtons.length; i++) {
        const element = radioButtons[i];
        element.checked = true;
        // element.addEventListener("change", console.log("change"));
        //!get the id of the category being clicked not the index of the category
        saveSpecificCookies(element.id);
      }
    });
  }, 300);
  // });
  // document.removeEventListener("click", allowAllCookiesButton);
};
const acceptNecessary = function () {
  // const ALL_DATA = [];
  setTimeout(() => {
    const gotItButton = document.querySelector(".gotItButton");
    gotItButton.addEventListener("click", () => {
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
  fillCategories,
  fillCookiesSettingItem,
  allowAllCookies,
  acceptNecessary,
  stopParentClick,
};
