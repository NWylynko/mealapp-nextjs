import { List } from "../components/List"
import { useRouter } from 'next/router'

interface Category {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
}

export async function getServerSideProps() {
  try {
    const res = await fetch("http://localhost:3000/api/categories");

    if (res.status !== 200) {
      throw new Error("failed to retrieve categories");
    }

    const categories: Category[] = await res.json();

    const props: HomeProps = { categories };

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
  categories?: Category[];
  error?: Error["message"];
}

export default function Home({ categories, error }: HomeProps) {

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
      {categories.map((item) => (
        <List key={item.id} {...item} onClick={({name}) => { router.push(`/meals/${name}`) }} />
      ))}
    </div>
  );
}
