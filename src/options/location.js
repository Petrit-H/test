import axios from "axios";
import { CLIENT_GEOLOCATION_API_URL, CMP_API_BASE_URL } from "../constants";
import { changeBannerTypeOnLocation } from "../initFile";
let countryCode = "";

const toError = (obj) => {
  setTimeout(() => {
    let errorMessage = new Error(
      "Error [" + (obj.code || "UNKNOWN") + "]: " + obj.error
    );
    return errorMessage;
  }, 200);
};

export const fetchClientIp = async () => {
  let url = "";
  let data = "";
  let config = {
    method: "get",
    url: `${CMP_API_BASE_URL}/GetPublicIp`,
    headers: {},
  };
  try {
    const response = await axios(config);
    // const response = await fetch(`${CMP_API_BASE_URL}/GetPublicIp`, config);
    data = response.data;
    // data = await response.json();
    console.log(data);
    // countryCode = data.countryCode;
    const { countryCode, ipFrom, browser } = data;
    return { countryCode, ipFrom, browser };
  } catch (error) {
    console.error(error.message);
  }
};

export default {
  // The default timeout is 5 seconds. This is mainly needed to catch JSONP requests that error.
  // Otherwise there is no easy way to catch JSONP errors. That means that if a JSONP fails, the
  // app will take `timeout` milliseconds to react to a JSONP network error.

  timeout: 500,

  // the order that services will be attempted in
  serviceDefinitions: {
    ipinfo: function (options) {
      fetchClientIp().then((location) => location);
      // fetchClientIp()
      return {
        url: `${CMP_API_BASE_URL}/GetPublicIp`,
        callback: function (done, response) {
          try {
            var json = JSON.parse(response);
            if (json.countryCode) {
              return { code: json.countryCode };
            }
          } catch (error) {
            return toError({
              code: json.countryCode,
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
