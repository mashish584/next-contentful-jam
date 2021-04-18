import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const NotFound = () => {
  const router = useRouter();
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds === 1) {
        router.push("/");
        return;
      }
      setSeconds((seconds) => seconds - 1);
    }, 1000);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [seconds]);

  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Oops! That page cannot be found :(</h2>
      <p>
        Redirecting to the{" "}
        <Link href="/">
          <a>Homepage</a>
        </Link>{" "}
        for more marmite goodness in {seconds} seconds...
      </p>
      <style jsx>
        {`
          .not-found {
            background: #fff;
            padding: 30px;
            box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
            transform: rotateZ(-1deg);
          }
          h1 {
            font-size: 3em;
          }
        `}
      </style>
    </div>
  );
};

export default NotFound;
