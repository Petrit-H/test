// import CMP_Section from "./cookies";
// import CMP_Section from "./utils/logic.js";

import axios from "axios";

export let categories = [];
export let responseData = [];
//
export const getCookiesData = async function (id) {
  let filteredCookiesPerCategory = [];
  try {
    const response = await fetch(
      "https://cmp.gjirafa.dev/DomainListViewTestHalabaku"
    );
    const data = await response.json();
    console.log("🚀 ~ file: test1.js ~ line 34 ~ getCookiesData ~ data", data);
    data.filter((el) => {
      el.cookies.filter((item) => {
        if (item.categoryId === id) {
          filteredCookiesPerCategory.push(item);
          // filteredCookiesPerCategory.concat(item)
        }
      });
    });
    return filteredCookiesPerCategory;
  } catch (error) {
    console.log(error.message);
  }
};

//! fetch all the domains, their cookies and filter cookies for categories
export const fetchDomainsFromAPI = () => {
  let config = {
    method: "get",
    url: "https://cmp.gjirafa.dev/DomainListViewTestHalabaku",
    headers: {},
  };

  axios(config)
    .then(function (response) {
      responseData = response.data;
      console.log("==========︾==========");
      console.log("🚀 ~ categories", categories);
      console.log("🚀 ~ responseData", responseData);
      // console.log("🚀 ~ dataForBala", dataForBala);
      // console.log("==========xxx==========");
      CMP_Section.filterCookiesByCategory(
        response.data,
        5,
        NECESSARY,
        "NECESSARY"
      );
      CMP_Section.filterCookiesByCategory(
        response.data,
        4,
        PREFERENCES,
        "PREFERENCES"
      );
      CMP_Section.filterCookiesByCategory(
        response.data,
        3,
        ANALYTICAL,
        "ANALYTICAL"
      );
      CMP_Section.filterCookiesByCategory(
        response.data,
        2,
        MARKETING,
        "MARKETING"
      );
      CMP_Section.filterCookiesByCategory(response.data, 1, OTHER, "OTHER");
      console.log("==========︽==========");
      return responseData;
    })
    .catch(function (error) {
      console.log(error);
    });
};

//! Fetch data from the CATEGORIES endpoint
export const fetchCategoriesFromAPI = () => {
  let config = {
    method: "get",
    url: "https://cmp.gjirafa.dev/CategoryListView",
    headers: {},
  };
  axios(config)
    .then(function (response) {
      categories = response.data;
      console.log("CATEGORIES: ", response.data);
      // createCategoriesContent();
      return categories;
    })
    .catch(function (error) {
      console.log(error);
    });
  console.log("CATEGORIES: ", categories);
  return categories;
};

// export let categories = [];
// export let domains = [];

// export const getCookiesData = async function (id) {
//   let filteredCookiesPerCategory = [];
//   try {
//     const response = await fetch(
//       "https://cmp.gjirafa.dev/DomainListViewTestHalabaku"
//     );
//     const data = await response.json();
//     console.log("🚀 ~ file: test1.js ~ line 34 ~ getCookiesData ~ data", data);
//     data.filter((el) => {
//       el.cookies.filter((item) => {
//         if (item.categoryId === id) {
//           filteredCookiesPerCategory.push(item);
//           // filteredCookiesPerCategory.concat(item)
//         }
//       });
//     });
//     return filteredCookiesPerCategory;
//   } catch (error) {
//     console.log(error.message);
//   }
// };
