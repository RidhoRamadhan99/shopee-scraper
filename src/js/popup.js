document.addEventListener("DOMContentLoaded", () => {
  if (typeof XLSX === "undefined") {
    console.error("XLSX library is not available");
    document.getElementById("status").textContent =
      "Error: Muat ulang Extension";
    return;
  }

  const startButton = document.getElementById("startScraping");
  const downloadButton = document.getElementById("downloadExcel");
  const status = document.getElementById("status");
  const progressBar = document.querySelector(".progress");
  const progressText = document.getElementById("progressText");

  let scrapedData = [];

  startButton.addEventListener("click", async () => {
    try {
      status.textContent = "Scraping...";
      startButton.disabled = true;
      downloadButton.disabled = true;
      progressBar.style.width = "0%";
      progressText.textContent = "0%";
      scrapedData = [];

      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      const response = await chrome.tabs.sendMessage(tab.id, {
        action: "scrape",
      });

      if (response) {
        scrapedData.push(response);
        progressBar.style.width = "100%";
        progressText.textContent = "100%";
        status.textContent = "Scraping Selesai!";
        downloadButton.disabled = false;
      } else {
        throw new Error("Tidak ada data yang di-scrape");
      }
    } catch (error) {
      console.error(error);
      status.textContent = "Error: " + error.message;
      startButton.disabled = false;
      downloadButton.disabled = true;
    }
  });

  downloadButton.addEventListener("click", () => {
    if (scrapedData.length > 0) {
      exportToExcel(scrapedData);
    }
  });

  function exportToExcel(data) {
    try {
      if (!data || data.length === 0) {
        throw new Error("Tidak ada data untuk di-export");
      }

      // worksheet dari data JSON
      const worksheet = XLSX.utils.json_to_sheet(data);

      // Buat workbook baru
      const workbook = XLSX.utils.book_new();

      // menambahkan worksheet ke workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Produk");

      // Generate file Excel
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });


      const url = URL.createObjectURL(blob);
      chrome.downloads.download({
        url: url,
        filename: "shopee_products.xlsx",
        saveAs: true, 
      });

      status.textContent = "Excel berhasil dibuat!";
    } catch (error) {
      console.error(error);
      status.textContent = "Error membuat Excel: " + error.message;
    }
  }
});
