import axios from "axios";

export default async function callApi(page, query = "") {
  const config = {
    method: "get",
    baseURL: "https://api.dev.pastorsline.com/api/contacts.json",
    responseType: "json",
    proxy: {
      protocol: "https",
      host: "127.0.0.1",
      port: 30080,
    },
    headers: {
      Authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU2MCwiZXhwIjoxNzI2NTY3MTc5LCJ0eXBlIjoiYWNjZXNzIiwidGltZXN0YW1wIjoxNjk1MDMxMTc5fQ.0y7NtuVDCvcPvmWbliMs1q02sov2oFC6u2Hi6H4A2W4",
    },
    params: {
      companyId: 560,
      page: page,
      query: query,
    },
  };
  try {
    const response = await axios.get("", { ...config });
    return response;
  } catch (error) {
    console.error(error);
  }
}
