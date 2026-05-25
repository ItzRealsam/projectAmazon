import { Product, Clothing, Appliance } from '../../../scripts/data/products.js';

describe('test suite: Product Classes', () => {

  // 1. TEST THE BASE PRODUCT CLASS
  describe('Base Product Class', () => {
    it('creates a standard product object correctly', () => {
      const product = new Product({
        id: 'test-id-1',
        image: 'images/products/test-item.jpg',
        name: 'Standard Test Item',
        rating: { stars: 4.5, count: 50 },
        priceCents: 1000,
        keywords: ['test']
      });

      expect(product.id).toEqual('test-id-1');
      expect(product.name).toEqual('Standard Test Item');
      expect(product.priceCents).toEqual(1000);
      expect(product.getRatingStarsUrl()).toEqual('images/ratings/rating-45.png');
      expect(product.getPrice()).toEqual('$10.00');
      expect(product.extraInfoHTML()).toEqual(''); // Base class must be empty string
    });
  });

  // 2. TEST THE CLOTHING SUBCLASS
  describe('Clothing Subclass', () => {
    it('inherits base properties and includes a functional size chart link', () => {
      const clothing = new Clothing({
        id: 'clothing-id-1',
        image: 'images/products/shirt.jpg',
        name: 'Test T-Shirt',
        rating: { stars: 4, count: 12 },
        priceCents: 1599,
        keywords: ['apparel'],
        sizeChartLink: 'images/clothing-size-chart.png'
      });

      // Verification of baseline inheritance
      expect(clothing.id).toEqual('clothing-id-1');
      expect(clothing.getPrice()).toEqual('$15.99');

      // Verification of specific sub-class data and HTML output polymorphism
      expect(clothing.sizeChartLink).toEqual('images/clothing-size-chart.png');
      expect(clothing.extraInfoHTML()).toContain('href="images/clothing-size-chart.png"');
      expect(clothing.extraInfoHTML()).toContain('Size chart');
    });
  });

  // 3. TEST THE APPLIANCE SUBCLASS
  describe('Appliance Subclass', () => {
    it('inherits base properties and includes instruction/warranty links', () => {
      const appliance = new Appliance({
        id: 'appliance-id-1',
        image: 'images/products/toaster.jpg',
        name: 'Test Toaster',
        rating: { stars: 5, count: 200 },
        priceCents: 4500,
        keywords: ['kitchen'],
        instructionsLink: 'images/appliance-instructions.png',
        warrantyLink: 'images/appliance-warranty.png'
      });

      // Verification of baseline inheritance
      expect(appliance.name).toEqual('Test Toaster');
      expect(appliance.getRatingStarsUrl()).toEqual('images/ratings/rating-50.png');

      // Verification of specific sub-class data and HTML output polymorphism
      expect(appliance.instructionsLink).toEqual('images/appliance-instructions.png');
      expect(appliance.warrantyLink).toEqual('images/appliance-warranty.png');
      expect(appliance.extraInfoHTML()).toContain('href="images/appliance-instructions.png"');
      expect(appliance.extraInfoHTML()).toContain('href="images/appliance-warranty.png"');
      expect(appliance.extraInfoHTML()).toContain('Instructions');
      expect(appliance.extraInfoHTML()).toContain('Warranty');
    });
  });

});
