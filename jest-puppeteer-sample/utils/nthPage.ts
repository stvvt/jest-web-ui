const nthPage = async (n: number) => {
  const pages = await browser.pages();
  return pages[n < 0 ? pages.length + n : n];
};

export default nthPage;
