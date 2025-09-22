import { i18n } from "@/i18nConfig";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(`/${i18n.defaultLocale}`);
}