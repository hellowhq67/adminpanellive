import SellForm from "@/components/Forms/sellfrom/SellForm";
import Header from "@/components/Header/Header";
import AdminSidebar from "@/components/Sidebar/AdminSidebar";
import React from "react";
import style from "./style.module.css"
export default function page() {
  return (
    <div>
      <Header />
      <div className={style.wrapper}>
        <AdminSidebar />
        <SellForm />
      </div>
    </div>
  );
}
