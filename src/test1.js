// getData.js
async function getData() {
  const response = await fetch(
    "https://cmp.gjirafa.dev/DomainListViewTestHalabaku"
  );
  const data = await response.json();
  return data;
}

export { getData };
// getData.js
export const getTestData = async function () {
  const response = await fetch(
    "https://cmp.gjirafa.dev/DomainListViewTestHalabaku"
  );
  const data = await response.json();
  return data;
};

export const PITI = function () {
  console.log(
    "⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️"
  );
  return "⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️⚾️";
};
