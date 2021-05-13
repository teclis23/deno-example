import { Application, Router } from "https://deno.land/x/oak/mod.ts";

import { addFriend } from "./Controllers/addFriend.ts";
import { getFriend } from "./Controllers/getFriend.ts";
import { updateFriend } from "./Controllers/updateFriend.ts";
import { deleteFriend } from "./Controllers/deleteFriend.ts";

const router = new Router();
const app = new Application();
const PORT = 3000;

router
  .post("/addFriend", addFriend)
  .get("/getFriend/:id", getFriend)
  .patch("/updateFriend/:id", updateFriend)
  .delete("/deleteFriend/:id", deleteFriend);

app.use(router.routes());
app.use(router.allowedMethods());

let netPermission = await Deno.permissions.query({ name: "net" });
if (netPermission.state === "prompt") {
  console.log("Net permission needed to serve.");
  netPermission = await Deno.permissions.request({ name: "net" });
}
if (netPermission.state === "granted") {
  await app.listen({ port: PORT });
  console.log(`Server run on port ${PORT}`);
} else {
  console.log("Can’t serve without net permission.");
}
