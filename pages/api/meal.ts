import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import URL from "url";

interface FilterTerms {
  id?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const url = new URL.URL(
      "https://www.themealdb.com/api/json/v1/1/lookup.php"
    );

    const { id }: FilterTerms = req.query;

    id && url.searchParams.append("i", id);

    const response = await fetch(url);

    if (response.status !== 200) {
      throw new Error("failed to retrieve meal");
    }

    const { meals }: { meals: Meal[] } = await response.json();

    const cleanData = transformMeals(meals[0]);

    res.status(200).json(cleanData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const transformMeals = (item: Meal) => ({
  id: item.idMeal,
  name: item.strMeal,
  drinkAlternate: item.strDrinkAlternate,
  category: item.strCategory,
  area: item.strArea,
  instructions: item.strInstructions,
  thumbnail: item.strMealThumb,
  tags: item.strTags && item.strTags.split(","),
  youtubeUrl: item.strYoutube === "" ? null : item.strYoutube,
  ingredients: transformIngredients(item),
  source: {
    url: item.strSource === "" ? null : item.strSource,
    thumbnail: item.strImageSource,
    isCreativeCommons: item.strCreativeCommonsConfirmed,
  },
  dateModified: item.dateModified,
});

interface Ingredient {
  ingredient: string;
  measurement: string;
}

const transformIngredients = (item: Meal): Ingredient[] => {
  return range(20).map((i) => {
    const n = i + 1
    if (["", " ", null].includes(item[`strIngredient${n}`])) return;
    if (["", " ", null].includes(item[`strMeasure${n}`])) return;

    return {
      ingredient: item[`strIngredient${n}`],
      measurement: item[`strMeasure${n}`],
    };
  }).filter((i) => i !== undefined)
};

let range = (n: number) => [...Array(n).keys()]

interface Meal {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate?: any;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string;
  strMeasure17: string;
  strMeasure18: string;
  strMeasure19: string;
  strMeasure20: string;
  strSource: string;
  strImageSource?: any;
  strCreativeCommonsConfirmed?: any;
  dateModified?: any;
}
