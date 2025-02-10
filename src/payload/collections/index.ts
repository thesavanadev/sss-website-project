import { Categories } from "@/payload/collections/categories/schema";
import { Media } from "@/payload/collections/media/schema";
import { Pages } from "@/payload/collections/pages/schema";
import { Posts } from "@/payload/collections/posts/schema";
import { Users } from "@/payload/collections/users/schema";
import { Sites } from "@/payload/collections/sites/schema";

export const collections = [Pages, Posts, Categories, Media, Users, Sites];
