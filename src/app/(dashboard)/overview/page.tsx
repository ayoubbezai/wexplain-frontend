import NavBar from "@/components/NavBar";
import { useTranslation } from "react-i18next";

export default function Overview() {
      const { t } = useTranslation("common");
  return (
    <NavBar>
      <h1>{t("")}</h1>
    </NavBar>
  );
}
