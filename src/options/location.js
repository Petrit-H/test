import axios from "axios";
import { CLIENT_GEOLOCATION_API_URL } from "../constants";
let countryCode = "";

const toError = (obj) => {
  console.log("🚀 ~ file: location.js ~ line 4 ~ toError ~ obj", obj);
  setTimeout(() => {
    let errorMessage = new Error(
      "Error [" + (obj.code || "UNKNOWN") + "]: " + obj.error
    );
    return errorMessage;
  }, 200);
};

export const fetchClientIp = () => {
  let url = "";
  let config = {
    method: "get",
    url: CLIENT_GEOLOCATION_API_URL,
    headers: {},
  };

  axios(config)
    .then(function (response) {
      url = response.data;
      countryCode = response.data.CountryCode;

      console.log("🚀 ~ ", countryCode);
      console.log("==========︾==========");
      console.log("🚀 ~ ", url);
      console.log("🚀 ~ ", url.Country);
      console.log("🚀 ~ ", url.CountryCode);
      console.log("🚀 ~ ", url.Timezone);
      console.log("🚀 ~ ", url.CountryID);
      console.log("==========︽==========");
      // toError({ code: url.CountryCode, error: "Invalid response" });
    })
    .catch(function (error) {
      console.log(error);
    });
  return countryCode;
};

export default {
  // The default timeout is 5 seconds. This is mainly needed to catch JSONP requests that error.
  // Otherwise there is no easy way to catch JSONP errors. That means that if a JSONP fails, the
  // app will take `timeout` milliseconds to react to a JSONP network error.

  timeout: 1000,

  // the order that services will be attempted in
  serviceDefinitions: {
    ipinfo: function (options) {
      fetchClientIp();
      return {
        url: CLIENT_GEOLOCATION_API_URL,
        callback: function (done, response) {
          try {
            var json = JSON.parse(response);
            console.log("🚀 ~ JSON ", json);
            if (json.CountryCode) {
              return { code: json.CountryCode };
            }
          } catch (error) {
            return toError({
              code: json.CountryCode,
              error: "Invalid response (" + error + ")",
            });
          }
        },
      };
    },
  },
  services: [
    // 'ipinfo' ,
    {
      name: "ipinfo",
      // interpolateUrl: {
      //   // obviously, this is a fake key
      //   api_key:
      //     "vOgI3748dnIytIrsJcxS7qsDf6kbJkE9lN4yEDrXAqXcKUNvjjZPox3ekXqmMMld",
      // },
    },

    function () {
      return { name: "ipinfo" };
    },
  ],
};
