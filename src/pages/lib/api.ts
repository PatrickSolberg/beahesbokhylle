import dotenv from "dotenv";

dotenv.config();
// save the wordpress api url in a variable to use it in the fetch function with typescript
const API_URL = process.env.WORDPRESS_API_URL || "";

console.log(API_URL);

// fetch data from wordpress api with typescript and graphql

const fetchAPI = async (query: string, { variables }: any = {}) => {
  const headers = { "Content-Type": "application/json" };
  const res = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  json.errors ? console.log(json.errors) : json.data;
};

// get all pages with slugs from wordpress api with typescript and graphql
export const getAllPagesWithSlugs = async () => {
  const data = await fetchAPI(`
    query {
        pages {
        edges {
            node {
            slug
            }
        }
        }
    }
    `);
  return data?.pages;
};

export const getPageBySlug = async (slug: string) => {
  const data: any = await fetchAPI(
    `
    {
        page(id: "${slug}", idType: SLUG) {
        title
        content
        }
    }
    `
  );
  return data?.page;
};
