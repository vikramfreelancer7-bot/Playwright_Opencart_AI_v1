# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: web\add-to-cart.spec.ts >> Add Product to Cart @master @regression @web
- Location: tests\web\add-to-cart.spec.ts:22:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: expect(received).toBeTruthy()

Received: false
```

# Page snapshot

```yaml
- generic [active] [ref=f3e1]:
  - navigation [ref=f3e2]:
    - generic [ref=f3e3]:
      - button "$ Currency " [ref=f3e7] [cursor=pointer]:
        - strong [ref=f3e8]: $
        - text: Currency
        - generic [ref=f3e9]: 
      - list [ref=f3e11]:
        - listitem [ref=f3e12]:
          - link "" [ref=f3e13] [cursor=pointer]:
            - /url: http://localhost/opencart/index.php?route=information/contact
          - text: "123456789"
        - listitem [ref=f3e15]:
          - link " My Account" [ref=f3e16] [cursor=pointer]:
            - /url: http://localhost/opencart/index.php?route=account/account
            - generic [ref=f3e17]: 
            - text: My Account
        - listitem [ref=f3e19]:
          - link " Wish List (0)" [ref=f3e20] [cursor=pointer]:
            - /url: http://localhost/opencart/index.php?route=account/wishlist
            - generic [ref=f3e21]: 
            - text: Wish List (0)
        - listitem [ref=f3e22]:
          - link " Shopping Cart" [ref=f3e23] [cursor=pointer]:
            - /url: http://localhost/opencart/index.php?route=checkout/cart
            - generic [ref=f3e24]: 
            - text: Shopping Cart
        - listitem [ref=f3e25]:
          - link " Checkout" [ref=f3e26] [cursor=pointer]:
            - /url: http://localhost/opencart/index.php?route=checkout/checkout
            - generic [ref=f3e27]: 
            - text: Checkout
  - banner [ref=f3e28]:
    - generic [ref=f3e30]:
      - link [ref=f3e33] [cursor=pointer]:
        - /url: http://localhost/opencart/index.php?route=common/home
        - img "Your Store" [ref=f3e34]
      - generic [ref=f3e36]:
        - textbox "Search" [ref=f3e37]: MacBook
        - button "" [ref=f3e39] [cursor=pointer]
      - button " 0 item(s) - $0.00" [ref=f3e43] [cursor=pointer]:
        - generic [ref=f3e44]: 
        - text: 0 item(s) - $0.00
  - navigation [ref=f3e46]:
    - generic: 
    - list [ref=f3e48]:
      - listitem [ref=f3e49]:
        - link "Desktops" [ref=f3e50] [cursor=pointer]:
          - /url: http://localhost/opencart/index.php?route=product/category&path=20
      - listitem [ref=f3e51]:
        - link "Laptops & Notebooks" [ref=f3e52] [cursor=pointer]:
          - /url: http://localhost/opencart/index.php?route=product/category&path=18
      - listitem [ref=f3e53]:
        - link "Components" [ref=f3e54] [cursor=pointer]:
          - /url: http://localhost/opencart/index.php?route=product/category&path=25
      - listitem [ref=f3e55]:
        - link "Tablets" [ref=f3e56] [cursor=pointer]:
          - /url: http://localhost/opencart/index.php?route=product/category&path=57
      - listitem [ref=f3e57]:
        - link "Software" [ref=f3e58] [cursor=pointer]:
          - /url: http://localhost/opencart/index.php?route=product/category&path=17
      - listitem [ref=f3e59]:
        - link "Phones & PDAs" [ref=f3e60] [cursor=pointer]:
          - /url: http://localhost/opencart/index.php?route=product/category&path=24
      - listitem [ref=f3e61]:
        - link "Cameras" [ref=f3e62] [cursor=pointer]:
          - /url: http://localhost/opencart/index.php?route=product/category&path=33
      - listitem [ref=f3e63]:
        - link "MP3 Players" [ref=f3e64] [cursor=pointer]:
          - /url: http://localhost/opencart/index.php?route=product/category&path=34
  - generic [ref=f3e65]:
    - list [ref=f3e66]:
      - listitem [ref=f3e67]:
        - link "" [ref=f3e68] [cursor=pointer]:
          - /url: http://localhost/opencart/index.php?route=common/home
      - listitem [ref=f3e70]:
        - link "Search" [ref=f3e71] [cursor=pointer]:
          - /url: http://localhost/opencart/index.php?route=product/search&search=MacBook
      - listitem [ref=f3e72]:
        - link "MacBook" [ref=f3e73] [cursor=pointer]:
          - /url: http://localhost/opencart/index.php?route=product/product&search=MacBook&product_id=43
    - generic [ref=f3e76]:
      - generic [ref=f3e77]:
        - list [ref=f3e78]:
          - listitem [ref=f3e79]:
            - link [ref=f3e80] [cursor=pointer]:
              - /url: http://localhost/opencart/image/cache/catalog/demo/macbook_1-500x500.jpg
              - img "MacBook" [ref=f3e81]
          - listitem [ref=f3e82]:
            - link [ref=f3e83] [cursor=pointer]:
              - /url: http://localhost/opencart/image/cache/catalog/demo/macbook_5-500x500.jpg
              - img "MacBook" [ref=f3e84]
          - listitem [ref=f3e85]:
            - link [ref=f3e86] [cursor=pointer]:
              - /url: http://localhost/opencart/image/cache/catalog/demo/macbook_4-500x500.jpg
              - img "MacBook" [ref=f3e87]
          - listitem [ref=f3e88]:
            - link [ref=f3e89] [cursor=pointer]:
              - /url: http://localhost/opencart/image/cache/catalog/demo/macbook_2-500x500.jpg
              - img "MacBook" [ref=f3e90]
          - listitem [ref=f3e91]:
            - link [ref=f3e92] [cursor=pointer]:
              - /url: http://localhost/opencart/image/cache/catalog/demo/macbook_3-500x500.jpg
              - img "MacBook" [ref=f3e93]
        - list [ref=f3e94]:
          - listitem [ref=f3e95]:
            - link "Description" [ref=f3e96]:
              - /url: "#tab-description"
          - listitem [ref=f3e97]:
            - link "Specification" [ref=f3e98] [cursor=pointer]:
              - /url: "#tab-specification"
          - listitem [ref=f3e99]:
            - link "Reviews (0)" [ref=f3e100] [cursor=pointer]:
              - /url: "#tab-review"
        - generic [ref=f3e101]:
          - generic [ref=f3e103]:
            - paragraph [ref=f3e104]: Intel Core 2 Duo processor
            - paragraph [ref=f3e105]: Powered by an Intel Core 2 Duo processor at speeds up to 2.16GHz, the new MacBook is the fastest ever.
            - paragraph [ref=f3e106]: 1GB memory, larger hard drives
            - paragraph [ref=f3e107]: The new MacBook now comes with 1GB of memory standard and larger hard drives for the entire line perfect for running more of your favorite applications and storing growing media collections.
            - paragraph [ref=f3e108]: Sleek, 1.08-inch-thin design
            - paragraph [ref=f3e109]: MacBook makes it easy to hit the road thanks to its tough polycarbonate case, built-in wireless technologies, and innovative MagSafe Power Adapter that releases automatically if someone accidentally trips on the cord.
            - paragraph [ref=f3e110]: Built-in iSight camera
            - paragraph [ref=f3e111]: Right out of the box, you can have a video chat with friends or family,2 record a video at your desk, or take fun pictures with Photo Booth
          - text: "* * *"
      - generic [ref=f3e112]:
        - generic [ref=f3e113]:
          - button "" [ref=f3e114] [cursor=pointer]
          - button "" [ref=f3e116] [cursor=pointer]
        - heading "MacBook" [level=1] [ref=f3e118]
        - list [ref=f3e119]:
          - listitem [ref=f3e120]:
            - text: "Brand:"
            - link "Apple" [ref=f3e121] [cursor=pointer]:
              - /url: http://localhost/opencart/index.php?route=product/manufacturer/info&manufacturer_id=8
          - listitem [ref=f3e122]: "Product Code: Product 16"
          - listitem [ref=f3e123]: "Reward Points: 600"
          - listitem [ref=f3e124]: "Availability: In Stock"
        - list [ref=f3e125]:
          - listitem [ref=f3e126]:
            - heading "$602.00" [level=2] [ref=f3e127]
          - listitem [ref=f3e128]: "Ex Tax: $500.00"
        - generic [ref=f3e130]:
          - generic [ref=f3e131]: Qty
          - textbox "Qty" [ref=f3e132]: "1"
          - button "Add to Cart" [ref=f3e133] [cursor=pointer]
        - paragraph [ref=f3e135]:
          - generic [ref=f3e136]: 
          - generic [ref=f3e138]: 
          - generic [ref=f3e140]: 
          - generic [ref=f3e142]: 
          - generic [ref=f3e144]: 
          - link "0 reviews" [ref=f3e146] [cursor=pointer]:
            - /url: ""
          - text: /
          - link "Write a review" [ref=f3e147] [cursor=pointer]:
            - /url: ""
  - contentinfo [ref=f3e148]:
    - generic [ref=f3e149]:
      - generic [ref=f3e150]:
        - generic [ref=f3e151]:
          - heading "Information" [level=5] [ref=f3e152]
          - list [ref=f3e153]:
            - listitem [ref=f3e154]:
              - link "About Us" [ref=f3e155] [cursor=pointer]:
                - /url: http://localhost/opencart/index.php?route=information/information&information_id=4
            - listitem [ref=f3e156]:
              - link "Delivery Information" [ref=f3e157] [cursor=pointer]:
                - /url: http://localhost/opencart/index.php?route=information/information&information_id=6
            - listitem [ref=f3e158]:
              - link "Privacy Policy" [ref=f3e159] [cursor=pointer]:
                - /url: http://localhost/opencart/index.php?route=information/information&information_id=3
            - listitem [ref=f3e160]:
              - link "Terms & Conditions" [ref=f3e161] [cursor=pointer]:
                - /url: http://localhost/opencart/index.php?route=information/information&information_id=5
        - generic [ref=f3e162]:
          - heading "Customer Service" [level=5] [ref=f3e163]
          - list [ref=f3e164]:
            - listitem [ref=f3e165]:
              - link "Contact Us" [ref=f3e166] [cursor=pointer]:
                - /url: http://localhost/opencart/index.php?route=information/contact
            - listitem [ref=f3e167]:
              - link "Returns" [ref=f3e168] [cursor=pointer]:
                - /url: http://localhost/opencart/index.php?route=account/return/add
            - listitem [ref=f3e169]:
              - link "Site Map" [ref=f3e170] [cursor=pointer]:
                - /url: http://localhost/opencart/index.php?route=information/sitemap
        - generic [ref=f3e171]:
          - heading "Extras" [level=5] [ref=f3e172]
          - list [ref=f3e173]:
            - listitem [ref=f3e174]:
              - link "Brands" [ref=f3e175] [cursor=pointer]:
                - /url: http://localhost/opencart/index.php?route=product/manufacturer
            - listitem [ref=f3e176]:
              - link "Gift Certificates" [ref=f3e177] [cursor=pointer]:
                - /url: http://localhost/opencart/index.php?route=account/voucher
            - listitem [ref=f3e178]:
              - link "Affiliate" [ref=f3e179] [cursor=pointer]:
                - /url: http://localhost/opencart/index.php?route=affiliate/login
            - listitem [ref=f3e180]:
              - link "Specials" [ref=f3e181] [cursor=pointer]:
                - /url: http://localhost/opencart/index.php?route=product/special
        - generic [ref=f3e182]:
          - heading "My Account" [level=5] [ref=f3e183]
          - list [ref=f3e184]:
            - listitem [ref=f3e185]:
              - link "My Account" [ref=f3e186] [cursor=pointer]:
                - /url: http://localhost/opencart/index.php?route=account/account
            - listitem [ref=f3e187]:
              - link "Order History" [ref=f3e188] [cursor=pointer]:
                - /url: http://localhost/opencart/index.php?route=account/order
            - listitem [ref=f3e189]:
              - link "Wish List" [ref=f3e190] [cursor=pointer]:
                - /url: http://localhost/opencart/index.php?route=account/wishlist
            - listitem [ref=f3e191]:
              - link "Newsletter" [ref=f3e192] [cursor=pointer]:
                - /url: http://localhost/opencart/index.php?route=account/newsletter
      - separator [ref=f3e193]
      - paragraph [ref=f3e194]:
        - text: Powered By
        - link "OpenCart" [ref=f3e195] [cursor=pointer]:
          - /url: http://www.opencart.com
        - text: Your Store © 2026
```

# Test source

```ts
  1  | /**
  2  |  * Test Case: Add Product to Cart
  3  |  *
  4  |  * Tags: @master @sanity @regression
  5  |  *
  6  |  * Steps:
  7  |  * 1) Open the application
  8  |  * 2) Search for a valid known product
  9  |  * 3) Open the product details page
  10 |  * 4) Verify the product details are displayed
  11 |  * 5) Set the required quantity
  12 |  * 6) Click Add to Cart
  13 |  * 7) Verify the success message
  14 |  * 8) Open the shopping cart
  15 |  * 9) Verify the selected product is present
  16 |  * 10) Verify the displayed quantity matches
  17 |  */
  18 | 
  19 | import { test, expect } from '../../fixtures/pageFixtures';
  20 | import { Helper } from '../../utils/helper';
  21 | 
  22 | test('Add Product to Cart @master @regression @web', async ({ homePage, searchResultsPage, productPage, cartPage }) => {
  23 |     const { productName, productQuantity } = Helper.getProductDetails();
  24 | 
  25 |     await test.step('1) Open the application', async () => {
  26 |         await homePage.navigateTo(process.env.WEB_APP_URL || 'http://localhost/opencart/upload/');
  27 |     });
  28 | 
  29 |     await test.step('2) Search for a valid known product', async () => {
  30 |         await homePage.searchProduct(productName);
  31 |     });
  32 | 
  33 |     await test.step('3) Open the product details page', async () => {
  34 |         await searchResultsPage.clickProduct(productName);
  35 |     });
  36 | 
  37 |     await test.step('4) Verify the product details are displayed', async () => {
  38 |         const isProductPage = await productPage.isProductPageExists();
  39 |         expect(isProductPage).toBeTruthy();
  40 | 
  41 |         const actualProductName = await productPage.getProductName();
  42 |         expect(actualProductName).toContain(productName);
  43 |     });
  44 | 
  45 |     await test.step('5) Set the required quantity', async () => {
  46 |         await productPage.setQuantity(productQuantity);
  47 |     });
  48 | 
  49 |     await test.step('6) Click Add to Cart', async () => {
  50 |         await productPage.clickAddToCart();
  51 |     });
  52 | 
  53 |     await test.step('7) Verify the success message', async () => {
  54 |         const isSuccess = await productPage.isSuccessMessageVisible();
> 55 |         expect(isSuccess).toBeTruthy();
     |                           ^ Error: expect(received).toBeTruthy()
  56 | 
  57 |         const successMsg = await productPage.getSuccessMessage();
  58 |         expect(successMsg).toContain('Success');
  59 |     });
  60 | 
  61 |     await test.step('8) Open the shopping cart', async () => {
  62 |         await homePage.navigateTo(process.env.WEB_APP_URL || 'http://localhost/opencart/upload/');
  63 |         await homePage.clickMyAccount();
  64 |         // Navigate directly to cart
  65 |         await homePage.navigateTo(process.env.WEB_APP_URL + 'index.php?route=checkout/cart');
  66 |     });
  67 | 
  68 |     await test.step('9) Verify the selected product is present in cart', async () => {
  69 |         const isInCart = await cartPage.isProductInCart(productName);
  70 |         expect(isInCart).toBeTruthy();
  71 |     });
  72 | 
  73 |     await test.step('10) Verify the displayed quantity matches', async () => {
  74 |         const quantity = await cartPage.getProductQuantity();
  75 |         expect(quantity).toBe(productQuantity);
  76 |     });
  77 | 
  78 |     console.log('✅ Add Product to Cart completed successfully!');
  79 | });
```