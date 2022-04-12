// import CMP_Section from "./cookies";
// import CMP_Section from "./utils/logic.js";

import axios from "axios";
import {
  ANALYTICAL,
  MARKETING,
  NECESSARY,
  OTHER,
  PREFERENCES,
} from "./constants";
import { setCookie } from "./utils/cookie";
import { filterCookiesByCategory } from "./utils/logic";

export let categories = [];
export let responseData = [];
export let cookiesPerCategory = [];
//
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
//           cookiesPerCategory = filteredCookiesPerCategory;
//           // filteredCookiesPerCategory.concat(item)
//         }
//       });
//     });
//     console.log(
//       "🚀 ~ ~ filteredCookiesPerCategory",
//       filteredCookiesPerCategory
//     );
//     // return filteredCookiesPerCategory;
//   } catch (error) {
//     console.log(error.message);
//   }
// };
export const getCookiesData = () => {
  let filteredCookiesPerCategory = [];
  let config = {
    method: "GET",
    url: "https://cmp.gjirafa.dev/GetAllCookiesByDomainId?domainId=1",
    // headers: { "Access-Control-Allow-Origin": "*" },
  };
  axios(config)
    .then(function (response) {
      cookiesPerCategory = response.data;
      // const data = response.data;
      console.log("🚀 ~~~~ getCookiesData ~ data", cookiesPerCategory);
      console.log("DATA", response.data);
      // callback(filteredCookiesPerCategory);
      return cookiesPerCategory;
    })
    .catch(function (err) {
      console.log(err.message);
    });
  return cookiesPerCategory;
};
// export const getCookiesData = async (id, callback) => {
//   let filteredCookiesPerCategory = [];
//   let config = {
//     method: "GET",
//     // url: "https://cmp.gjirafa.dev/GetAllCookiesByDomainId?domainId=1",
//     url: "https://cmp.gjirafa.dev/DomainListViewTestHalabaku",
//     // headers: { "Access-Control-Allow-Origin": "*" },
//   };
//   // try {
//   //   const request = await axios(config);

//   //   // const response = request.data;
//   //   console.log(
//   //     "🚀 ~ file: getDomainsWithCookies.js ~ line 45 ~ getCookiesData ~ response",
//   //     response
//   //   );
//   //   // response.map((el) => {
//   //   //   el.cookies.filter((item) => {
//   //   //     if (item.categoryId === +id) {
//   //   //       filteredCookiesPerCategory.push(item);
//   //   //     }
//   //   //   });
//   //   // });
//   //   filteredCookiesPerCategory = request.data;
//   //   return request.data;
//   //   // return filteredCookiesPerCategory;
//   // } catch (error) {
//   //   console.log(err.message);
//   // }
//   axios(config)
//     .then(function (response) {
//       const data = response.data;
//       console.log("🚀 ~~~~ getCookiesData ~ data", data);
//       data.map((el) => {
//         el.cookies.filter((item) => {
//           if (item.categoryId === +id) {
//             // console.log(
//             //   "🚀 ~ ~ item.categoryId === id",
//             //   item.categoryId === +id
//             // );
//             filteredCookiesPerCategory.push(item);

//             // console.log(
//             //   "🚀 ~ ~ filteredCookiesPerCategory",
//             //   filteredCookiesPerCategory
//             // );
//             // cookiesPerCategory = filteredCookiesPerCategory;
//             // filteredCookiesPerCategory.concat(item)
//           }
//         });
//       });
//       console.log("DATA", response.data);
//       // console.log("DATA",response.data)
//       callback(filteredCookiesPerCategory);
//     })
//     .catch(function (err) {
//       console.log(err.message);
//     });
//   // return filteredCookiesPerCategory;
// };

//! fetch all the domains, their cookies and filter cookies for categories
export const fetchDomainsFromAPI = () => {
  let config = {
    method: "GET",
    // url: "https://cmp.gjirafa.dev/GetAllCookiesByDomainId?domainId=1",
    url: "https://cmp.gjirafa.dev/DomainListViewTestHalabaku",
    // headers: { "Access-Control-Allow-Origin": "*" },
  };

  axios(config)
    .then(function (response) {
      responseData = response.data;
      console.log("==========︾==========");
      console.log("🚀 ~ categories", categories);
      console.log("🚀 ~ responseData", responseData);
      // console.log("🚀 ~ dataForBala", dataForBala);
      // console.log("==========xxx==========");
      filterCookiesByCategory(response.data, 5, NECESSARY, "NECESSARY");
      filterCookiesByCategory(response.data, 4, PREFERENCES, "PREFERENCES");
      filterCookiesByCategory(response.data, 3, ANALYTICAL, "ANALYTICAL");
      filterCookiesByCategory(response.data, 2, MARKETING, "MARKETING");
      filterCookiesByCategory(response.data, 0, OTHER, "OTHER");
      console.log("==========︽==========");
      return responseData;
    })
    .catch(function (error) {
      console.log(error);
    });
  console.log("DOMAINS LIST", responseData);
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

export const acceptAllTheCookies = (index) => {
  console.info("🔞ALL COOKIES INDEX", index);
  let dataTest = getCookiesData();
  console.info("🔞ALL COOKIES ", dataTest);
  console.info("🔞ALL COOKIES INDEX", index);
  for (const cookie of dataTest) {
    console.log("🅿️", cookie);
    // setCookie(
    //   cookie.name, // name
    //   // cookie.value, // value
    //   "", // value
    //   cookie.expiryDays, // expiration day
    //   cookie.domain, // domain
    //   "", // domain
    //   cookie.path, // path
    //   // "/",
    //   cookie.is_secure // is secure
    // );
  }
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
