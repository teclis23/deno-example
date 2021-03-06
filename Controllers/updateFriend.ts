import { Friend } from "../helpers/dbconnect";

export const updateFriend: any = async (context: any) => {
  try {
    const id: string = context.params.id;
    let body: any = await context.request.body();

    let data: { email?: String; pno?: String } = {};
    if (body.value.email) {
      data["email"] = body.value.email;
    }
    if (body.value.pno) {
      data["pno"] = body.value.pno;
    }

    const result = await Friend.updateOne(
      { _id: { $oid: id } },
      { $set: data }
    );
    console.log(result);
    context.response.body = result;
    context.response.status = 200;
  } catch (e) {
    context.response.body = null;
    context.response.status = 500;
    console.log(e);
  }
};
