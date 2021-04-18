import client from "../utils/client";
import RecipeCard from "../components/RecipeCard";

export async function getStaticProps() {
  const response = await client.getEntries("receipe");

  return {
    props: {
      recipes: response.items,
      revalidate: 1,
    },
  };
}

export default function Recipes({ recipes }) {
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.sys.id} recipe={recipe} />
      ))}
      <style jsx>{`
        .recipe-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 20px 60px;
        }
      `}</style>
    </div>
  );
}
