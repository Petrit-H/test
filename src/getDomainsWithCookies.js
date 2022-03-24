export let categories = [];
export let domains = [];

export const getCookiesData = async function (id) {
  let storeVariable = [];
  const response = await fetch(
    "https://cmp.gjirafa.dev/DomainListViewTestHalabaku"
  );
  const data = await response.json();
  console.log("🚀 ~ file: test1.js ~ line 34 ~ getCookiesData ~ data", data)
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
//     getCookiesData(i + 1);
//   }
// };
export const PITI = function () {
  console.log(
    "⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️"
  );
  return "⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️";
};
