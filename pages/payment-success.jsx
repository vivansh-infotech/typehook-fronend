import Header from "@/components/layout/Header";
import PaymentStatus from "@/page-components/payment/paymentStatus";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React from "react";

const PagePaymentSuccess = () => {
  return (
    <>
      <Head>
        <title>typehook</title>
      </Head>

      <PaymentStatus />
    </>
  );
};
PagePaymentSuccess.auth = "ONLY_LOGIN_USER";
PagePaymentSuccess.paymentStatus = "ONLY_LOGIN_USER_NON_PAID";
export default PagePaymentSuccess;
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
