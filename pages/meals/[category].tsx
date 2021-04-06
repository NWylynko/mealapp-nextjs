import { List } from "../../components/List"
import absoluteUrl from 'next-absolute-url';
import { useRouter } from 'next/router'

interface Meal {
  id: string;
  name: string;
  thumbnail: string;
}


const fetchRelative = (req, path: string) => {
  const {origin} = absoluteUrl(req, 'localhost:3000');
  return fetch(`${origin}${path}`);
}


export async function getServerSideProps(context) {
  try {
    const res = await fetchRelative(context.req, `/api/meals?category=${context.params.category}`);

    if (res.status !== 200) {
      throw new Error("failed to retrieve meals");
    }

    const meals: Meal[] = await res.json();

    const props: HomeProps = { meals };

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
  meals?: Meal[];
  error?: Error["message"];
}

export default function Home({ meals, error }: HomeProps) {

  const router = useRouter()

  if (error) {
    return (
      <div>
        <h3>Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      {meals.map((item) => (
        <List key={item.id} {...item} onClick={({id}) => { router.push(`/meal/${id}`)}} />
      ))}
    </div>
  );
}
