"use client";
import NavBar from "@/components/NavBar";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t } = useTranslation("common");
  return (
    <NavBar>
      <h1>{t("logout")}</h1>
    </NavBar>
  );
}
