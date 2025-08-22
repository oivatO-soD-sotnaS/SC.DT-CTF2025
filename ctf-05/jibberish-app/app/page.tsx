import { ME_QUERY } from "@/lib/queries";
import { cookies } from "next/headers";
import Forbidden from "../components/forbidden";
import Unauthorized from "@/components/unauthorized";
import FuzzyText from "@/components/react-bits/FuzzyText/FuzzyText";

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "http://jibber-jabber_container:4001/graphql";

export default async function Page() {
  const jwt_token = (await cookies()).get("jwt_token")?.value;

  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwt_token}`
        },
        body: JSON.stringify({
          query: ME_QUERY,
      })
    })

    if (!response.ok) {
      if (response.status === 401) {
        return <Unauthorized />;
      }
    }

    const user = (await response.json()).data.me;

    if (user.role !== "admin") {
      return <Forbidden />;
    }
  } catch (error) {
    console.error("Could not fetch data:", error);
  }

  return (
    <main className="h-screen w-screen flex flex-col items-center justify-center">
      <FuzzyText 
        baseIntensity={0.2}
        fontSize={32} 
        enableHover
      >
        Am i finally a real hacker now, mom?
      </FuzzyText>
      {"FLAG{7448f2fbc1d7c84b01ca199ab1238ec4f049cfa79d5c002114af8f6755bd084d}"}
    </main>
  );
}
