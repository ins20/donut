import { httpRouter } from "convex/server";
import { auth } from "./auth";
import { createDonation } from "./donations";

const http = httpRouter();
http.route({
  path: "/postDonation",
  method: "POST",
  handler: createDonation,
});
auth.addHttpRoutes(http);

export default http;
