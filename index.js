const puppeteer = require('puppeteer');

/**
 * Scrapes product information from Daraz website.
 */
(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized']
  });
  const page = await browser.newPage();

  // Navigate to the Daraz website with the specified search query
  await page.goto('https://www.daraz.com.bd/catalog/?q=discount&_keyori=ss&from=input&spm=a2a0e.home.search.go.735212f7z8UKL7');

  // Array to store extracted product information
  let products = [];

  // Extract product elements using XPath
  const productElements = await page.$x('//div[@data-qa-locator="product-item"]');

  // Iterate through each product element and extract information
  // Iterate through each product element and extract information
  for (const productElement of productElements) {
    try {
      const productInfo = {
        name: await productElement.$eval('#id-img', element => element.alt),
        discountPrice: await productElement.$eval('span.currency--GVKjl', element => element.innerText),
        originalPrice: await productElement.$eval('del.currency--GVKjl', element => element.innerText),
      };

      // Add the product information to the array
      products.push(productInfo);
    } catch (error) {
      console.error(error);
    }
  }


  // Display the extracted product information
  console.log(products);

  // Close the browser
  await browser.close();
})();
