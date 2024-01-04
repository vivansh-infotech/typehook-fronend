import {
  DropdownIndicator,
  DropdownStyle,
  MultiValueRemove,
} from "@/containers/MultiSelect";
import useCategory from "@/hooks/useCategory";
import { AXIOS_SET_LANGUAGE } from "@/middleware/axios";
import { TEMPLATES } from "@/services";
import { useLanguagesStore, useSidebarStore } from "@/store";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Select from "react-select";
import { useToast } from "../notification";
const LanguageSwitch = () => {
  const router = useRouter();
  const makeToast = useToast();
  const { categoriesMutation } = useCategory();
  const { locales, locale: activeLocale } = router;
  const { asPath } = router;
  const [allLanguages, setAllLanguages] = useState();
  const setLanguages = useLanguagesStore((state) => state.setLanguages);
  const languageMutation = useMutation({
    mutationFn: TEMPLATES.language,
    onSuccess: (data) => {
      setAllLanguages(data?.data);
    },
  });

  useEffect(() => {
    languageMutation.mutate();
  }, []);

  const selectLanguage = (e) => {
    categoriesMutation.mutate();
    setLanguages(e.locale);
    AXIOS_SET_LANGUAGE(e.locale);
    router.push("/dashboard", "/dashboard", {
      locale: e.locale,
    });
  };

  return (
    <span className="text-muted cursor-pointer">
      <Select
        className="multi-language"
        components={{
          IndicatorSeparator: () => null,
          DropdownIndicator,
          MultiValueRemove,
        }}
        styles={DropdownStyle}
        isMulti={false}
        onChange={(e) => selectLanguage(e.value)}
        defaultValue={{
          value: activeLocale,
          label: activeLocale,
        }}
        options={
          allLanguages &&
          allLanguages.map((item) => {
            return {
              value: { locale: item.code, asPath: asPath },
              label: (
                // <Link
                //   href={{ pathname, query }}
                //   as={asPath}
                //   locale={item.code}
                //   legacyBehavior
                // >
                <span className="uppercase">{item.code}</span>
                // </Link>
              ),
            };
          })
        }
      />
    </span>
  );
};
export default LanguageSwitch;

{
  /*
  for flag

<a>
<img
src={`/image/svg/${item.code}.svg`}
alt="Picture of the author"
/>
</a>  */
}
