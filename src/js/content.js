
console.log("Content script loaded");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  console.log("Message received in content script:", request);

  if (request.action === "scrape") {
    try {
      const productData = scrapeProductData();

      console.log("Scraped product data:", productData);

      if (productData && Object.keys(productData).length > 0) {
        sendResponse(productData);
      } else {
        throw new Error("Tidak dapat menemukan data produk");
      }
    } catch (error) {
      console.error("Scraping error:", error);
      sendResponse(null);
    }
    return true; 
  }
});

function scrapeProductData() {
  //  Log proses scraping
  console.log("Scraping product data...");

  // Selector  Shopee
  const productInfo = {
    title:
      document.querySelector(".XD5xU")?.textContent.trim() || "Tidak ada judul",
    productLink: window.location.href,
    price:
      document.querySelector("._3-rad")?.textContent.trim() ||
      "Tidak ada harga",
    rating:
      document.querySelector(".UMhmYh")?.textContent.trim() ||
      "Tidak ada rating",
    soldCount:
      document.querySelector(".WTIuefa")?.textContent.trim() ||
      "Tidak ada data penjualan",
    image1:
      document.querySelector(".product-photo img")?.src || "Tidak ada gambar",
    description:
      document.querySelector(".product-description")?.textContent.trim() ||
      "Tidak ada deskripsi",
    shopName:
      document.querySelector(".page-store-name")?.textContent.trim() ||
      "Tidak ada nama toko",
  };

  // Debug: Log hasil scraping
  console.log("Product info:", productInfo);

  return productInfo;
}
