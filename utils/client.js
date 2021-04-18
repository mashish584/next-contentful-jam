import { createClient } from "contentful";

export default createClient({
  accessToken: process.env.SPACE_ACCESS_TOKEN,
  space: process.env.SPACE_ID
});
