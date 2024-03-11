import Head from "next/head";
import Login from "./login/page";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-purple-200">
      <Head>
        <title>Slider Login / Signup</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login />
    </div>
  );
}
