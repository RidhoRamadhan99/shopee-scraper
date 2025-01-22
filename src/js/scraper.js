class ShopeeScraper {
  constructor() {
    this.data = [];
  }

  async scrapeProduct(url) {
    try {
      const response = await fetch(url);
      const html = await response.text();
      const $ = cheerio.load(html);

      const productData = {
        title: $(".product-title").text().trim(),
        productLink: url,
        image1: $(".product-image").eq(0).find("img").attr("src"),
        image2: $(".product-image").eq(1).find("img").attr("src"),
        image3: $(".product-image").eq(2).find("img").attr("src"),
        description: $(".product-description").text().trim(),
        category: $(".product-category").text().trim(),
      };

      this.data.push(productData);
      return productData;
    } catch (error) {
      console.error("Error scraping product:", error);
      throw error;
    }
  }

  async exportToExcel() {
    const worksheet = XLSX.utils.json_to_sheet(this.data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
    return workbook;
  }
}

export default ShopeeScraper;
