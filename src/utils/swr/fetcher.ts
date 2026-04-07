const fetcher = async (url: string) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const res = await fetch(url);
  return res.json();
};

export default fetcher;