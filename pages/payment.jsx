import Header from "@/components/layout/Header";
import Payment from "@/page-components/payment/payment";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React from "react";

const PagePayment = () => {
  return (
    <>
      <Head>
        <title>typehook</title>
      </Head>
      <Payment />
    </>
  );
};
PagePayment.auth = "ONLY_LOGIN_USER";
PagePayment.paymentStatus = "ONLY_LOGIN_USER_NON_PAID";
PagePayment.theme = "light";
export default PagePayment;
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  };
}
