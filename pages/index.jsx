const Home = () => {
  return (
    <div className="container font-mono text-cyan-400 flex h-[100vh] ">
      <h1 className="text-3xl font-bold underline m-auto justify-center  ">
        Welcome to unchained admin panel
        {process.env.NEXT_PUBLIC_UNCHAINED_ENDPOINT}
      </h1>
    </div>
  );
};

export default Home;
