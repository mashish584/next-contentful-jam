import { useRouter } from "next/router";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import Skelton from "../../components/Skelton";
import client from "../../utils/client";

export default function RecipeDetails({ receipe }) {
  const router = useRouter();

  if (router.isFallback) {
    return <Skelton />;
  }

  const { featuredImage, title, cookingTime, ingredients, method } = receipe.fields;

  let imageDetailsProps = {};

  if (featuredImage) {
    imageDetailsProps = {
      src: `https:${featuredImage.fields.file.url}`,
      width: featuredImage.fields.file.details.image.width,
      height: featuredImage.fields.file.details.image.height,
    };
  }

  return (
    <div>
      <div className="banner">
        <Image {...imageDetailsProps} />
        <h2>{title}</h2>
      </div>
      <div className="info">
        <p>Take about {cookingTime} mins to cook.</p>
        <h3>Ingredients</h3>
        {ingredients.map((ingredient, index) => (
          <span key={`${ingredient}_${index}`}>{ingredient}</span>
        ))}
      </div>
      <div className="method">
        <h3>Method:</h3>
        <div>{documentToReactComponents(method)}</div>
      </div>
      <style jsx>{`
        h2,
        h3 {
          text-transform: uppercase;
        }
        .banner h2 {
          margin: 0;
          background: #fff;
          display: inline-block;
          padding: 20px;
          position: relative;
          top: -60px;
          left: -10px;
          transform: rotateZ(-1deg);
          box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
        }
        .info p {
          margin: 0;
        }
        .info span::after {
          content: ", ";
        }
        .info span:last-child::after {
          content: ".";
        }
      `}</style>
    </div>
  );
}

export async function getStaticPaths() {
  const { items: receipes } = await client.getEntries("receipe");
  const paths = receipes.map((receipe) => ({
    params: {
      slug: receipe.fields.slug,
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: "receipe",
    "fields.slug": params.slug,
  });

  return {
    props: {
      receipe: items[0],
    },
    revalidate: 1,
    notFound: items.length === 0,
  };
}
