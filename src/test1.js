import { COOKIES_CATEGORIES } from "./constants";

export let categories = [];
export let domains = [];
// console.log("🚀 ~ file: test1.js ~ line 3 ~ domains", domains)

// // getData.js
// export const getData = async function () {
//   const response = await fetch(
//     "https://cmp.gjirafa.dev/DomainListViewTestHalabaku"
//   );
//   const data = await response.json();
//   domains = data;
//   return data;
// };

// export { getData };
// getData.js
// export const getTestData = async function () {
//   const response = await fetch(
//     "https://cmp.gjirafa.dev/DomainListViewTestHalabaku"
//   );
//   const data = await response.json();
//   domains = data;
//   return domains;
// };

export const getResponseData = async function (id) {
  let storeVariable = [];
  const response = await fetch(
    "https://cmp.gjirafa.dev/DomainListViewTestHalabaku"
  );
  const data = await response.json();
  console.log("🚀 ~ file: test1.js ~ line 34 ~ getResponseData ~ data", data)
  data.filter((el) => {
    // console.log("1st", storeVariable);
    el.cookies.filter((item) => {
      if (item.categoryId === id) {
        storeVariable.push(item);
      }
    });
    // console.log("FILTERED DATA",storeVariable)
  });

  // console.log("🚀 ~ ID", id)
  console.log("🚀 ~ QAZAAAAAAAA", storeVariable);
  return storeVariable;
};

// export const saveAllCookies = function () {
//   for (let i = 0; i < COOKIES_CATEGORIES.length; i++) {
//     getResponseData(i + 1);
//   }
// };
export const PITI = function () {
  console.log(
    "⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️"
  );
  return "⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️";
};
