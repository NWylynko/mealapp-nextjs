import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import URL from "url"

export interface Meal {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}

interface FilterTerms {
  category?: string;
  ingredient?: string;
  area?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const url = new URL.URL("https://www.themealdb.com/api/json/v1/1/filter.php");

    const { category, ingredient, area }: FilterTerms = req.query

    category && url.searchParams.append("c", category)
    ingredient && url.searchParams.append("i", ingredient)
    area && url.searchParams.append("a", area)

    const response = await fetch(url);

    if (response.status !== 200) {
      throw new Error("failed to retrieve meals");
    }

    const { meals }: { meals: Meal[] } = await response.json();

    const cleanData = transformMeals(meals);

    res.status(200).json(cleanData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const transformMeals = (categories: Meal[]) => {
  return categories.map((item) => ({
    id: item.idMeal,
    name: item.strMeal,
    thumbnail: item.strMealThumb,
  }));
};
