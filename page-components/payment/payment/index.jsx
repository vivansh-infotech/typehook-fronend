import { IconLogo } from "@/components/icon";
import Layout from "@/components/layout";
import { useUserStore } from "@/store";
import Link from "next/link";
import React from "react";

const Payment = () => {
  const loginToken = useUserStore((state) => state);
  return (
    <Layout>
      <div className="min-h-[calc(100vh-48px)] w-full flex justify-center items-center">
        <div className="px-4 md:p-0 md:py-4 py-2">
          <div className="flex justify-center items-center gap-x-[18px] mb-[33px]">
            <IconLogo className="w-5 h-[33px] object-cover dark:text-white text-black" />
            <p className="text-24 font-700">typehook.</p>
          </div>
          <div className="mx-auto mb-[46px]">
            <p className="text-[15px] font-700 text-center dark:text-white text-black">
              Gebe deine Zahlungsinformationen an.
              <span className="block">
                {" "}
                Deine Daten werden vertraulich behandelt und sind verschlüsselt.
              </span>
            </p>
          </div>
          <div className="max-w-[416px] mx-auto mb-[50px]">
            <stripe-pricing-table
              pricing-table-id={process.env.NEXT_PUBLIC_PRICING_TABLE_ID}
              publishable-key={process.env.NEXT_PUBLIC_PUBLISHABLE_KEY}
              client-reference-id={loginToken?.id}
              customer-email={loginToken?.email}
            ></stripe-pricing-table>
          </div>
          <div className="text-gray-700 text-[10px] text-center font-500">
            By using Typehook.com you agree <br /> automatically to the{" "}
            <Link
              target="_blank"
              href="https://www.typehook.com/terms"
              className="dark:text-white text-gray-800"
            >
              Terms of Service{" "}
            </Link>
            and the{" "}
            <Link
              target="_blank"
              href="https://www.typehook.com/privacy"
              className="dark:text-white text-gray-800"
            >
              Privacy Policy{" "}
            </Link>{" "}
            .
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;
