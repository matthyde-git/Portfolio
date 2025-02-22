/**********************************************************************************************************************
 * Title: Product.java
 *
 * Date: 24/01/2024
 *
 * Description: A class for creating objects that simulate products in a sealed-bid auction, has fields to store the
 *              type of product, name, salePrice, lastSalePrice, maxSalePrice, provides setter and getter methods for
 *              the fields and has a toString method for printing all the fields of a Product object. Implements the
 *              Serializable interface so that Product objects can be saved to files.
 *********************************************************************************************************************/

 package Java.Auction;

 import java.io.Serializable;

 public class Product implements Serializable
 {
     public enum ProductType {BOOK,COIN,STAMP}
 
     private int lastSalePrice = 0;
     private int maxSalePrice = 0;
     private ProductType type;
     private int salePrice;
     private String name;
 
     public Product(ProductType type, String name)
     {
         this.type = type;
         this.name = name;
     }
 
     // getters and setters
     public ProductType getType() { return this.type; }
     public void setType(ProductType type) { this.type = type; }
 
     public int getLastSalePrice() { return this.lastSalePrice; }
     public void setLastSalePrice(int lastSalePrice)
     {
         this.lastSalePrice = lastSalePrice;
 
         if (lastSalePrice > this.maxSalePrice) // updates the maxSalePrice if it's less than the lastSalePrice
         {
             this.maxSalePrice = lastSalePrice;
         }
     }
 
     public int getMaxSalePrice() { return this.maxSalePrice; }
     public void setMaxSalePrice(int maxSalePrice) { this.maxSalePrice = maxSalePrice; }
 
     public int getSalePrice() { return this.salePrice; }
     public void setSalePrice(int salePrice) { this.salePrice = salePrice; }
 
     public String getName() { return this.name; }
     public void setName(String name) { this.name = name; }
 
     public String toString() {
         // toString method to return the object as a String
         return  "Product type: " + type + "\n" +
                 "Name: " + name + "\n" +
                 "salePrice: " + salePrice + "\n" +
                 "lastSalePrice: " + lastSalePrice + "\n" +
                 "maxSalePrice: " + maxSalePrice + "\n";
     }
 
     public static ProductType randomProductType()
     // method that returns a random ProductType value
     {
         int random = (int) (3 * Math.random() + 1); // generates a random int between 1 and 3
 
         if (random == 1)
         {
             return ProductType.BOOK;
         }
         else if (random == 2)
         {
             return ProductType.COIN;
         }
         else return ProductType.STAMP;
     }

     // tests
 /*
     public static void main(String[] args)
     //  method for testing
     {
         Product p1 = new Product(ProductType.BOOK, "The Silmarillion");
 
         System.out.println(p1.getType());           // prints BOOK
         System.out.println(p1.getName());           // prints The Silmarillion
         System.out.println(p1.getLastSalePrice());  // prints 0
         System.out.println(p1.getMaxSalePrice());   // prints 0
         System.out.println(p1.getSalePrice());      // prints 0
 
         p1.setLastSalePrice(50);
         System.out.println(p1.getLastSalePrice());  // prints 50
         System.out.println(p1.getMaxSalePrice());   // prints 50
 
         p1.setLastSalePrice(25);
         System.out.println(p1.getLastSalePrice());  // prints 25
         System.out.println(p1.getMaxSalePrice());   // prints 50
 
         p1.setName("The Hobbit");                   // updates name
         p1.setSalePrice(10);                        // updates salePrice
         p1.setType(ProductType.STAMP);              // updates ProductType
 
         System.out.println(p1.toString());          // prints STAMP, The Hobbit, 10, 25, 50
 
         Product product = new Product(randomProductType(), "product1"); // Product object with random ProductType
         System.out.println(product.toString()); // ProductType is random
     }
 */
 }
 