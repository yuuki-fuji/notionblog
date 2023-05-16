import Head from "next/head";
import Link from "next/link";
import { getDatabase } from "../lib/notion";
import { Text } from "./[id].js";
import { Bookmark } from "../components/Bookmark";

export const databaseId = process.env.NOTION_DATABASE_ID;


export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Notion Next.js blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="px-8 max-w-[700px] mx-auto">
        <header className="mb-12">
          <h2>便利Toolの紹介ページです</h2>
        </header>

        <h2 className="mb-5 pb-5 border-b border-[#dedede] uppercase opacity-60 tracking-wider dark:border-[#343539]">
          All Posts
        </h2>
        <ol className="list-none m-0 p-0">
          {posts.map((post) => {
            const date = new Date(post.last_edited_time).toLocaleString(
              "en-US",
              {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }
            );
            return (
              <li key={post.id} className="mb-12">
                <h3 className="mb-7 text-2xl">
                  <Link href={`/${post.id}`}>
                    <a className="text-inherit">
                      <Text text={post.properties.Name.title} />
                    </a>
                  </Link>
                </h3>
                <div className="h-full">
                {post.properties.URL.url && <Bookmark url={post.properties.URL.url} />}
                    <div className="h-4"></div>
                </div>
                <p className="mt-0 mb-3 opacity-60">{date}</p>
                <Link href={`/${post.id}`}>
                  <a> Read post →</a>
                </Link>
              </li>
            );
          })}
        </ol>
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);

  return {
    props: {
      posts: database,
    },
    revalidate: 1,
  };
};
