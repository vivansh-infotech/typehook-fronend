import { IconSqureLeftDirection, LogoTypehook } from "@/components/icon";
import Header from "@/components/layout/Header";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import DashboardSidebar from "@/page-components/dashboard/dashboardSidebar";
import { useSidebarStore } from "@/store";
import Link from "next/link";
import React, { useEffect } from "react";

const Layout = ({ sidebar = false, children }) => {
  const isResponsive = useMediaQuery("(min-width: 1280px)");
  const setSidebar = useSidebarStore((state) => state.setSidebar);
  const activeSidebar = useSidebarStore((state) => state.ActiveSidebar);

  // useEffect(() => {
  //   if (activeSidebar) {
  //     document.getElementsByTagName("body")[0].classList.add("overflow-hidden");
  //   } else {
  //     document
  //       .getElementsByTagName("body")[0]
  //       .classList.remove("overflow-hidden");
  //   }
  // }, [activeSidebar]);

  //

  useEffect(() => {
    if (typeof document !== "undefined") {
      if (activeSidebar) {
        document
          .getElementsByTagName("body")[0]
          .classList.add("overflow-hidden");
      } else {
        document
          .getElementsByTagName("body")[0]
          .classList.remove("overflow-hidden");
      }
    }
  }, [activeSidebar]);

  // document.body.className += " home";

  return (
    <div className="max-h-[100vh]">
      <div
        className={`grid grid-cols-1  ${
          sidebar ? "xl:grid-cols-[267px_1fr]" : ""
        } min-h-full`}
      >
        {sidebar && (
          <div
            className={`${
              activeSidebar ? "!left-0" : ""
            } dark:bg-[#292A2A] h-screen fixed xl:relative z-[11] top-[67px] xl:top-0 left-[-412px] xl:left-0 max-w-[300px]  sm:max-w-[350px] xl:max-w-[412px] bg-white border-r dark:border-black border-gray`}
          >
            <div className="py-5 px-6 border-b border-gray dark:border-black relative xl:block hidden max-h-[67px] h-full">
              <Link className="" href="/dashboard">
                <LogoTypehook className="logo inline-block dark:text-white text-black w-[113px] h-[21px]" />
              </Link>
              <span onClick={() => setSidebar(false)}>
                <IconSqureLeftDirection className="w-5 h-5 block xl:hidden absolute top-4 right-4" />
              </span>
            </div>
            <div className="max-h-[calc(100vh-95px)] flex flex-col overflow-y-auto">
              <DashboardSidebar />
            </div>
          </div>
        )}
        <div className="relative">
          <Header
            logo={sidebar ? false : true}
            setMenu={() => setSidebar(!activeSidebar)}
            setOpen={activeSidebar}
          />
          {children}
          {sidebar && (
            <div
              onClick={() => setSidebar(false)}
              className={`${
                activeSidebar
                  ? "absolute xl:relative top-[67px] left-0 w-full min-h-screen bg-black/40 z-10 xl:z-0"
                  : ""
              }`}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;
