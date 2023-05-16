import React, { FunctionComponent }  from "react";
import { useOgp } from "../hooks/useOgp";
import { OgpData } from "../@types/types";
import { Loading } from "./Loading";

interface BookmarkViewProps {
  ogp: OgpData;
}

// Presentational Component for Desktop
export const BookmarkViewDesktop: FunctionComponent<BookmarkViewProps> = ({ ogp }) => {
  const { title, description, faviconUrl, pageUrl, ogImageUrl } = ogp;
  const w = ogImageUrl ? "w-3/5" : "w-full";
  const ml = faviconUrl ? "ml-2" : "";

  return (
    <a
      href={pageUrl}
      target="_blank"
      rel="noreferrer"
      className="hidden md:block"
    >
      <article className="flex justify-between h-40 rounded border border-gray-400 border-solid">
        <div
          className={`flex flex-col justify-between p-5  hover:bg-gray-100 ${w}`}
        >
          <h3 className="text-2xl truncate">{title}</h3>
          <p className="overflow-hidden h-12 text-base text-gray-500">
            {description}
          </p>
          <div className="flex items-center">
            {faviconUrl && <img src={faviconUrl} className="h-6" alt="" />}
            <p className={`text-base truncate ${ml}`}>{pageUrl}</p>
          </div>
        </div>
        {ogImageUrl && (
          <div className="w-2/5 h-full rounded">
            <img src={ogImageUrl} className="object-cover w-full h-full" alt="" />
          </div>
        )}
      </article>
    </a>
  );
};

// Presentational Component for Mobile
export const BookmarkViewMobile: FunctionComponent<BookmarkViewProps> = ({ ogp }) => {
  const { title, description, faviconUrl, pageUrl, ogImageUrl } = ogp;

  const ml = faviconUrl ? "ml-2" : "";

  return (
    <a href={pageUrl} target="_blank" rel="noreferrer" className="md:hidden">
      <article className="flex flex-col justify-between rounded border border-gray-400 border-solid">
        {ogImageUrl && (
          <div className="object-cover w-full h-40 rounded">
            <img src={ogImageUrl} className="object-cover w-full h-full" alt="" />
          </div>
        )}
        <div
          className={`flex flex-col justify-between p-5 h-40  hover:bg-gray-100 w-full`}
        >
          <h3 className="text-xl truncate">{title}</h3>
          <p className="overflow-hidden h-12 text-base text-gray-500">
            {description}
          </p>
          <div className="flex items-center">
            {faviconUrl && <img src={faviconUrl} className="h-6" alt="" />}
            <p className={`text-base truncate ${ml}`}>{pageUrl}</p>
          </div>
        </div>
      </article>
    </a>
  );
};

// Presentational Component Container
const BookmarkView: FunctionComponent<BookmarkViewProps> = ({ ogp }) => (
  <>
    <BookmarkViewMobile ogp={ogp} />
    <BookmarkViewDesktop ogp={ogp} />
  </>
);

export const Bookmark: FunctionComponent<{ url: string }> = ({ url }) => {
  const { data, error } = useOgp(url);

  // for debug
  if (!error) console.log(error);

  if (!data) return <Loading />;

  return <BookmarkView ogp={data} />;
};
