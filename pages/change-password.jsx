import ChangePassword from "@/page-components/authentication/changePassword";
import GetStaticProps from "@/pages";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React from "react";

const PageChangePassword = () => {
  return (
    <>
      <Head>
        <title>typehook</title>
      </Head>
      <ChangePassword />
    </>
  );
};
PageChangePassword.auth = "ONLY_LOGIN_USER";
PageChangePassword.basicAccess = "LOGIN_USER_WITH_BASIC_ACCESS";
export default PageChangePassword;
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
