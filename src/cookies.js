import CMP_Section from "./scripts";

function create_UUID() {
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

console.log(create_UUID());

let responseData = [];
let categories = [];
// let filteredCookies = [];
let OTHER = [];
let MARKETING = [];
let ANALYTICAL = [];
let PREFERENCES = [];
let NECESSARY = [];
let responseForCookies = []; //?{ cookie_name: "", cookie_status: "" }
let cookiesPerCategory = [];
// let dataForBala = [];
let dataForBala = {};
//*data to be sent to Bala

// let dataForBala = {
//   id: create_UUID(),
//   domains: responseData,
//   NECESSARY: NECESSARY,
//   PREFERENCES: PREFERENCES,
//   ANALYTICAL: ANALYTICAL,
//   MARKETING: MARKETING,
//   OTHER: OTHER,
// };

window.addEventListener("load", function (event) {
  const COOKIE_SETTINGS = document.getElementById("COOKIE_SETTINGS");
  const COOKIE_DISPLAY = document.getElementById("COOKIE_DISPLAY");
  const spinner = document.getElementById("spinner");
  const noData = document.getElementById("noData");
  const goBack = document.getElementById("goBack");
  console.log("🚀 ~ file: cookies.js ~ line 38 ~ goBack", goBack);

  // const cookieSectionInject = document.querySelector(".cookieSectionInject");
  const cookieSectionInject = document.getElementById("cookieSectionInject");
  //! execute the necessary functions on document load
  // window.onload = () => {
  fetchDataFromAPI();
  fetchCategoriesFromAPI();
  // bannerAccordionToggle()

  setTimeout(() => {
    // filterCategories(categories, responseData);
    // fillCookies();
    //  fillCookieSettingItem();
    // accordionToggle();
    // stopParent();
    // homepageAccordionToggle();
    toggleInjected();
    // bannerAccordionToggle()
    // showModal();

    //todo allowAllCookies();
    //todo allowAllCookiesHandler();
    //todo console.log("🚀 ~ file: cookies.js ~ goBack", goBack);
    //todo console.log(
    //todo   "🚀 ~ file: cookies.js ~ cookieSectionInject",
    //todo   cookieSectionInject
    //todo );

    dataForBala = {
      id: create_UUID(),
      domains: responseData,
      NECESSARY: NECESSARY,
      PREFERENCES: PREFERENCES,
      ANALYTICAL: ANALYTICAL,
      MARKETING: MARKETING,
      OTHER: OTHER,
    };
    // console.log("==================vvv=====================");
    // console.log("🚀 ~ categories", categories);
    // console.log("🚀 ~ responseData", responseData);

    console.log("🚀 ~ DATA-4-BALA", dataForBala);
    // console.log("==================^^^=====================");

    // if (responseData.length === 0) {
    //   noData.classList.remove("hidden");
    // }
  }, 500);
  // };
});

//! Handle the dropdown show and hide(FOR THE CATEGORIES OF COOKIES w/caret down)
// function homepageAccordionToggle() {
//   let header = document.querySelectorAll(".homepageAccordion .accordionHeader");
//   console.log(
//     "🚀 ~ file: cookies.js ~ line 68 ~ homepageAccordionToggle ~ header",
//     header
//   );
//   let accordionContent = document.querySelectorAll(
//     ".homepageAccordion .accordionContent"
//   );
//   const carretToggle = document.querySelectorAll(".toggleAccordion");

//   //! fetchDataFromAPI(); THIS MIGHT BE NEEDED LATER
//   for (let item = 0; item <= header.length - 1; item++) {
//     header[item].addEventListener("click", (event) => {
//       // debugger;
//       event.target.stopPropagation();
//       // event.preventDefault();
//       ["h-auto", "hidden"].map((i) =>
//         accordionContent[item]?.classList?.toggle(i)
//       );
//       carretToggle[item]?.classList?.toggle("rotate-180");
//       const children = accordionContent[item].children;
//       for (element in children) {
//         children[element]?.classList?.toggle("opacity-0");
//       }
//       console.log("click");
//     });
//   }
// }

//! Handle the dropdown show and hide(FOR THE CATEGORIE DETAILS)
// function settingsAccordionToggle() {
//   let header = document.querySelectorAll(".settingAccordion .accordionHeader");
//   console.log("🚀 ~ Settings Accordion Elements", header.length);
//   let accordionContent = document.querySelectorAll(
//     ".settingAccordion .accordionContent"
//   );
//   const carretToggle = document.querySelectorAll(".toggleAccordion");
//   //! fetchDataFromAPI(); THIS MIGHT BE NEEDED LATER
//   for (let item = 0; item <= header.length - 1; item++) {
//     header[item].addEventListener("click", (event) => {
//       event.stopPropagation();
//       ["h-auto", "hidden"].map((i) =>
//         accordionContent[item]?.classList?.toggle(i)
//       );
//       carretToggle[item]?.classList?.toggle("rotate-180");
//       const children = accordionContent[item].children;
//       for (element in children) {
//         children[element]?.classList?.toggle("opacity-0");
//       }
//       console.log("click");
//     });
//   }
// }

//! Fetch data from the DOMAIN endpoint

// const bannerAccordionToggle = function () {
//   let header = document.querySelectorAll(".cc-category .accordionHeader");
//   let accordionContent = document.querySelectorAll(
//     ".cc-category .accordionContent"
//   );
//   // const test = event;
//   // console.log("🚀 ~ TEST", test);

//   console.log("🚀 ~ HEADER LENGTH => ", header.length);
//   console.log("🚀 ~ ALL CONTENT => ", accordionContent.length);
//   for (let item = 0; item < accordionContent.length; item++) {
//     header[item].addEventListener("click", (event) => {
//     event.stopPropagation();
//     // debugger;
//     ["h-0", "hidden"].map((i) => accordionContent[item]?.classList?.toggle(i));
//     // carretToggle[item]?.classList?.toggle("rotate-180");
//     const children = accordionContent[item].children;
//     console.log("🚀 ~ children", children.length);
//     for (element in children) {
//       children[element]?.classList?.toggle("opacity-0");
//     }
//     console.log("BANNER CLICK ACCORDION TOGGLE");
//     });
//   }
// };

const fetchDataFromAPI = () => {
  let config = {
    method: "get",
    url: "https://cmp.gjirafa.dev/DomainListViewTestHalabaku",
    headers: {},
  };

  axios(config)
    .then(function (response) {
      responseData = response.data;
      // cookiesPerCategory = response.data;
      // console.log("🚀 ~ file: cookies.js ~ line 159 ~ cookiesPerCategory", cookiesPerCategory)
      // console.log(response.data);
      console.log("==========︾==========");
      console.log("🚀 ~ categories", categories);
      console.log("🚀 ~ responseData", responseData);
      // console.log("🚀 ~ dataForBala", dataForBala);
      console.log("==========xxx==========");
      filterCookiesByCategory(response.data, 5, NECESSARY, "NECESSARY");
      filterCookiesByCategory(response.data, 4, PREFERENCES, "PREFERENCES");
      filterCookiesByCategory(response.data, 3, ANALYTICAL, "ANALYTICAL");
      filterCookiesByCategory(response.data, 2, MARKETING, "MARKETING");
      filterCookiesByCategory(response.data, 1, OTHER, "OTHER");
      console.log("==========︽==========");
    })
    .catch(function (error) {
      console.log(error);
    });
};

//! Fetch data from the CATEGORIES endpoint
const fetchCategoriesFromAPI = () => {
  let config = {
    method: "get",
    url: "https://cmp.gjirafa.dev/CategoryListView",
    headers: {},
  };
  axios(config)
    .then(function (response) {
      // console.log(response.data);
      categories = response.data;
      // createCategoriesContent();
    })
    .catch(function (error) {
      console.log(error);
    });
};

//! filter data by categories
const filterCookiesByCategory = (arr, id, storeVariable, category) => {
  // let res=[];
  arr.filter((el) => {
    // console.log("1st", storeVariable);
    el.cookies.filter((item) => {
      if (item.categoryId === id) {
        storeVariable.push(item);
      }
    });
    // console.log("2nd", storeVariable);
  });
  console.log(`🚀 ~ ${category} id:`, id, `=> ${storeVariable.length}`);

  // fillCookieSettingItem();
};

function stopParent() {
  const qyqe = document.querySelectorAll(".qyqe");
  console.log("🚀 ~ file: cookies.js ~ line 281 ~ stopParent ~ qyqe", qyqe);
  for (const key in qyqe) {
    const qyqeInput = qyqe[key].children[0];
    const dot = qyqe[key].children[2];
    // qyqeInput.style = `width:100%; height:100%; position:absolute; top:0; left:0`;

    // console.log(qyqeInput.checked);
    qyqe[key].addEventListener("click", (e) => {
      // e.stopPropagation();
      // qyqeInput.checked = qyqeInput.checked ^ 1;
      qyqeInput.setAttribute("checked", 1);

      // console.log(qyqeInput.checked);
      dot.style = `transform: translateX(12px);
                          background-color: #1c79f2;`;
      // dot.classList.toggle("categoryChecked")

      // console.log(
      //   "🚀 ~ file: cookies.js ~ line 283 ~ stopParent ~ qyqeInput",
      //   qyqeInput
      // );
      // debugger;
    });
  }
}

function fillCookies() {
  // const event = new Event("this");

  console.log(
    "🚀 ~ file: scripts.js ~ line 416 ~ fillCookies ~ cookieSectionInject",
    cookieSectionInject
  );

  cookieSectionInject.innerHTML = categories
    .slice(0)
    .reverse()
    .map((item) => {
      // console.log(item);
      const isNecessaryCat = item.name.toLowerCase() === "necessary";
      return `
            <div class="homepageAccordion border border-gray-200 my-0.5 xl:my-2 rounded-md ">
              <div class="accordionHeader cursor-pointer flex justify-between p-3.5">
                <p class="category-title font-medium">${item.name}</p>
                <label for="${
                  item.id
                }" class="dotWrapper inline-flex cursor-pointer">
                  <div class="qyqe group relative">
                    <input type="checkbox" id="${
                      item.id
                    }" class="sr-only absolute top-0 left-0 w-full h-full" ${
        isNecessaryCat && "disabled checked"
      }
                      value="${item.name.toLowerCase()}">
                    <div class="switch-holder block border border-primary-stroke  w-9 h-6 rounded-full transition">
                    </div>
                    <div class="dot absolute left-1 top-1 w-4 h-4 rounded-full transition bg-gray-400"></div>
                  </div>
                </label>
              </div>
              <div class="accordionContent border-t mx-4 py-4 h-0 px-2 hidden transition-all duration-500 ease-in-out">
                <p class="category-description opacity-0 mb-4 transition duration-300 ease-in-out transform">
                  ${item.description}
                </p>
                <div class="opacity-0">
                  <p value=${item?.id}
                    class="cookieDetails text-blue-500  transition duration-300 ease-in-out transform cursor-pointer max-w-max">
                    Cookies Details</p>
                </div>
              </div>
            </div>
    `;
    })
    .join("");
}

//!  FILL THE COOKIE SETTINGS SECTION
function fillCookieSettingItem() {
  console.log("fillCookieSettingItem()");
  // console.log(COOKIE_SETTINGS);
  // console.log(COOKIE_DISPLAY);

  const cookieSettingsInject = document.querySelector(".cookieSettingsInject");
  console.log(
    "🚀 ~  fillCookieSettingItem ~ cookieSettingsInject",
    cookieSettingsInject
  );
  // debugger
  cookieSettingsInject.innerHTML = cookiesPerCategory
    .map((item) => {
      let expirationDate = moment(item.expiration).endOf("day").fromNow();
      // console.log(item);
      return `<div class="settingAccordion border border-gray-200 my-0.5 xl:my-2 rounded-md">
      <div class="accordionHeader cursor-pointer flex justify-between p-4">
        <p class="category-title font-medium">${item.name}</p>
        <div class="controlButtons flex">
        <div id="closeIcon" class="carret closeIcon cursor-pointer my-auto"><img src="../../src/assets/images/caretDown.png"
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
  // let cookies = categories.filter((item) => item.id === id);
  // let cookiesPerCategory = [];
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

//! display the Cookie Details modal/data-injection
// function showModal() {
//   let id;
//   const toggle = document.querySelectorAll(".cookieDetails");
//   for (const elmnt of toggle) {
//     elmnt.addEventListener("click", (event) => {
//       id = event.target.attributes.value.value;
//       console.log("CATEGORY ID CLIKED: ", id);
//       COOKIE_SETTINGS.classList.remove("hidden");
//       COOKIE_DISPLAY.classList.add("hidden");
//       filterCookiesByCategory(
//         responseData,
//         +id,
//         cookiesPerCategory,
//         "CLICKED ON"
//       );
//       settingsAccordionToggle();
//       fillCookieSettingItem();
//     });
//   }
//   // if (
//   //   NECESSARY.length === 0 ||
//   //   PREFERENCES.length === 0 ||
//   //   MARKETING.length === 0 ||
//   //   ANALYTICAL.length === 0  ||
//   //   OTHER.lenght === 0
//   // ) {
//   //   //todo noData.classList.remove("hidden");
//   //   console.log("~~~NO DATA TO DISPLAY~~~");
//   // }
// }
const goBackFunc = () => {
  // goBack.addEventListener("click", () => {
  console.log("GO BACK");
  COOKIE_DISPLAY.classList.remove("hidden");
  COOKIE_SETTINGS.classList.add("hidden");
  cookiesPerCategory = [];
  // });
};
//! toggle injected button ON/OFF
function toggleInjected() {
  const injectedLabel = document.querySelectorAll(".dotWrapper");
  // console.log("🚀 ~ file: cookies.js ~ line 290 ~ toggleInjected ~ dot", dot);

  // for (const item of injectedLabel) {
  for (let i = 0; i < injectedLabel.length; i++) {
    console.log("🚀 ~ toggleInjected ~ item", i);
    const injectedInput = injectedLabel[i].getElementsByTagName("input");
    // console.log("=========cheched dots==========");
    // console.log(
    //   "🚀 ~ file: cookies.js ~ line 280 ~ toggleInjected ~ injectedInput",
    //   injectedInput[0].checked
    // );
    responseForCookies.push({
      cookie_name: injectedInput[0].value,
      cookie_status: injectedInput[0].checked,
    });
    // console.log(
    //   "🚀 ~ file: scripts.js ~ line 220 ~ onCheck ~ responseForCookies",
    //   responseForCookies
    // );
    // console.log("=========cheched dots==========");
    setTimeout(() => {
      for (const iterator of inputCheckout) {
        console.log(iterator.value, "-->", iterator.checked);
      }
    }, 500);
  }
}
