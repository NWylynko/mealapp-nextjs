import absoluteUrl from 'next-absolute-url';
import styled from 'styled-components';
import Image from "next/image";

interface Meal {
  id: string;
  name: string;
  drinkAlternate: any;
  category: string;
  area: string;
  instructions: string;
  thumbnail: string;
  tags: string[];
  youtubeUrl: string;
  ingredients: {
    ingredient: string;
    measurement: string;
  }[];
  source: {
    url: string;
    thumbnail: any;
    isCreativeCommons: any;
  };
  dateModified: any;
}

const fetchRelative = (req, path: string) => {
  const {origin} = absoluteUrl(req, 'localhost:3000');
  return fetch(`${origin}${path}`);
}


export async function getServerSideProps(context) {
  try {
    const res = await fetchRelative(context.req, `/api/meal?id=${context.params.id}`);

    if (res.status !== 200) {
      throw new Error("failed to retrieve meal");
    }

    const meal: Meal = await res.json();

    const props: HomeProps = { meal };

    return {
      props,
    };
  } catch (error) {
    const props: HomeProps = { error: error.message };

    return {
      props,
    };
  }
}

interface HomeProps {
  meal?: Meal;
  error?: Error["message"];
}

export default function Home({ meal, error }: HomeProps) {
  if (error) {
    return (
      <div>
        <h3>Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <Container>
      <h2>{meal.name}</h2>
      <h3>{meal.category} | {meal.area}</h3>
      <Image src={meal.thumbnail} width="100%" height={400} objectFit="cover" />
      {meal.ingredients.map((item) => ( <p>{item.ingredient} {item.measurement}</p> ))}
    </Container>
  );
}

const Container = styled.div`

  display: grid;

  margin: 16px;
  padding: 16px;

`;