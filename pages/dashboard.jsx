import Dashboard from "@/page-components/dashboard/dashboard";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React from "react";

const PageDashboard = () => {
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
            fbq('track', 'PageView');`,
          }}
        />
        <title>typehook</title>
      </Head>
      <Dashboard />
    </>
  );
};
PageDashboard.auth = "ONLY_LOGIN_USER";
export default PageDashboard;
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
