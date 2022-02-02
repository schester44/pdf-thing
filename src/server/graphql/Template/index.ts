export * from "./mutation";
export * from "./query";

import { objectType } from "@nexus/schema";

export const Template = objectType({
  name: "ProjectTemplate",
  definition(t) {
    t.model.id();
    t.model.key();
    t.model.name();

    t.field("data", { type: "JSONObject" });

    // TODO: Return template data.
  },
});
