import { Loader } from "@/components/loader";
import { useToast } from "@/components/notification";
import DashboardDetails from "@/page-components/dashboard/dashboardDetails";
import { TEMPLATES } from "@/services";
import { useMutation } from "@tanstack/react-query";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React, { useEffect, useState } from "react";

export const getServerSideProps = async (context) => {
  {
    const { query, locale } = context;
    if (query.id && query.id[0]) {
      return {
        props: {
          userId: query.id[0],
          ...(await serverSideTranslations(locale, ["common"]))
        }
      };
    } else {
      return {
        redirect: {
          permanent: false,
          destination: "/dashboard-details"
        },
        props: {
          ...(await serverSideTranslations(locale, ["common"]))
        }
      };
    }
  }
};

const PageDashboardDetails = ({ userId }) => {
  const [formData, setFormData] = useState(null);
  const makeToast = useToast();
  const templateMutation = useMutation({
    mutationFn: TEMPLATES.template,
    onSuccess: (data) => {
      let formData = { ...data?.data };
      formData.variables = Object.values(formData?.variables);
      setFormData(formData);
    },
    onError: (error) => {
      makeToast({
        type: "error",
        message: `${t("error.PageDashboardDetails")}`
      });
    }
  });
  useEffect(() => {
    templateMutation.mutate(userId);
  }, [userId]);
  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.addEventListener('mouseover', initLandbot, { once: true });
            window.addEventListener('touchstart', initLandbot, { once: true });
            var myLandbot;
            function initLandbot() {
              if (!myLandbot) {
                var s = document.createElement('script');s.type = 'text/javascript';s.async = true;
                s.addEventListener('load', function() {
                  var myLandbot = new Landbot.Livechat({
                    configUrl: 'https://storage.googleapis.com/landbot.online/v3/H-1498773-ONELH5GEN9UMB8PD/index.json',
                  });
                });
                s.src = 'https://cdn.landbot.io/landbot-3/landbot-3.0.0.js';
                var x = document.getElementsByTagName('script')[0];
                x.parentNode.insertBefore(s, x);
              }
            }
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2153133464892233');
            fbq('track', 'PageView');`
          }}
        />
        <title>typehook</title>
      </Head>
      {formData ? (
        <DashboardDetails id={userId} formData={formData} />
      ) : (
        <Loader fullScreen={true} />
      )}
    </>
  );
};
PageDashboardDetails.auth = "ONLY_LOGIN_USER";
export default PageDashboardDetails;
