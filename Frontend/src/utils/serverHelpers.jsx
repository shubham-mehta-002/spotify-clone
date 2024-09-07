import { baseUrl } from "./config";

export async function makeUnauthenticatedPOSTRequuest(route, body) {
  const response = await fetch(baseUrl + route, {
    method: "POST",
    body: JSON.stringify(body),
  });
  const formattedResponse = await response;
  return formattedResponse;
}
