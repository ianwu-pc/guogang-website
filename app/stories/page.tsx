import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "協會歷程",
  description: "社區故事已整合至關於我們的協會歷程。",
};

export default function StoriesPage() {
  redirect("/about#history");
}
