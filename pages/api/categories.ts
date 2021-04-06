import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = "https://www.themealdb.com/api/json/v1/1/categories.php";
  try {
    const response = await fetch(url);

    if (response.status !== 200) {
      throw new Error("failed to retrieve categories");
    }

    const { categories }: { categories: Category[] } = await response.json();

    const cleanData = transformCategories(categories);

    res.status(200).json(cleanData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const transformCategories = (categories: Category[]) => {
  return categories.map((item) => ({
    id: item.idCategory,
    name: item.strCategory,
    description: item.strCategoryDescription,
    thumbnail: item.strCategoryThumb,
  }));
};
