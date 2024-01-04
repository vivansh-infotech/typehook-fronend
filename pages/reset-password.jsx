import ResetPassword from "@/page-components/authentication/resetPassword";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React from "react";

const PageResetPassword = () => {
  return (
    <>
      <Head>
        <title>typehook</title>
      </Head>
      <ResetPassword />
    </>
  );
};
PageResetPassword.auth = "ONLY_NON_LOGIN_USER";
export default PageResetPassword;
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
