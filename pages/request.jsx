import RequestPurchase from "@/page-components/request";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
const Request = () => {
  return <RequestPurchase />;
};

export default Request;
Request.auth = "ONLY_LOGIN_USER";
Request.basicAccess = "LOGIN_USER_WITH_BASIC_ACCESS";
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  };
}
