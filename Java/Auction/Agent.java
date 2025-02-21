/**********************************************************************************************************************
 * Title: Agent.java
 *
 * Date: 24/01/2024
 *
 * Description: A class for creating objects that simulate Agents in a sealed-bid auction, has fields to store the
 *              Products owned by the Agent in an array list, the currentSize of their collection, money and a constant
 *              int MAX_SIZE to limit the size of the collection. Contains getters, setters and a static nested class
 *              currentProduct to store the type of Product.
 *********************************************************************************************************************/

 package Java.Auction;

 import java.util.ArrayList;
 import java.util.Arrays;
 
 public class Agent
 {
     private ArrayList<Product> products = new ArrayList<>();
     private int currentSize;
     private static final int MAX_SIZE = 100;
     private int money;
 
     public ArrayList<Product> getProducts() { return this.products; }
 
     public int getMoney() { return this.money; }
     public void setMoney(int money) { this.money = money; }
     public int getCurrentSize() { return this.currentSize; }
 
     public void addProducts(ArrayList<Product> arr)
     // adds the Products from the ArrayList passed in, into the products ArrayList and increments currentSize
     {
         for (int i = 0; i < arr.size(); i++)
         {
             products.add(arr.get(i));
             currentSize++;
         }
     }
 
     public boolean sellProduct(int price, Product product)
     // searches the products ArrayList for a Product that matches the passed product, if it is found in the ArrayList,
     // it is removed, LastSalePrice, money and currentSize are updated, returns true if a match was found,false overwise
     {
         for (int i = 0; i < products.size(); i++)
         {
             if (products.get(i) == product)
             {
                 products.remove(i);
                 product.setSalePrice(price);
                 product.setLastSalePrice(price);
                 money += price;
                 currentSize--;
 
                 return true;
             }
         }
         return false;
     }
 
     public boolean buyProduct(int price, Product product)
     // if the current number of items in the ArrayList is less than the maximum, adds the products and updates the
     // money and currentSize attributes, returns true if new Produce is bought, false overwise
     {
         if (currentSize < MAX_SIZE)
         {
             products.add(product);
             money -= price;
             currentSize++;
 
             return true;
         }
         else
         {
             return false;
         }
     }
 
     public static Product.ProductType currentProduct = Product.ProductType.BOOK;
 
     public static void setCurrentProduct(Product.ProductType type) { currentProduct = type; }
 
     public Product.ProductType offerProduct(Product p)
     // iterates through the products ArrayList to find the matching Product object, if it is in the ArrayList, the
     // matching Product is printed and the ProductType is returned, else null is returned
     {
         for (int i = 0; i < products.size(); i++)
         {
             setCurrentProduct(p.getType());
             if (products.get(i).getType() == currentProduct)
             {
                 System.out.println(products.get(i).toString());
                 return currentProduct;
             }
         }
         return null;
     }
 
     public int[] countProducts()
     // creates an array of integers and 3 int values to represent the 3 values in the ProductType enum,
     // iterates through the products ArrayList, sets the currentProduct to the type of next Product in the ArrayList
     // and compares the currentProduct to the different values in the ProductType enum and increments their int value,
     // then adds the integer values to the array of integers
     {
         int[] count = new int[3];
 
         int books = 0;
         int coins = 0;
         int stamps = 0;
 
         for (int i = 0; i < products.size(); i++)
         {
             setCurrentProduct(products.get(i).getType());
 
             if (currentProduct == Product.ProductType.BOOK)
             {
                 books++;
             }
             else if (currentProduct == Product.ProductType.COIN)
             {
                 coins++;
             }
             else if (currentProduct == Product.ProductType.STAMP)
             {
                 stamps++;
             }
         }
         count[0] = books;
         count[1] = coins;
         count[2] = stamps;
 
         return count;
     }
 
     public int makeBid(Product product)
     // creates an array of integers and stores the value of the countProducts() method, then compares the Product's type
     // to the different values in the ProductType enum, if the ProductType is a BOOK it will then return an integer
     // value depending on the integer value in count index 0, as index 0 stores the integer representation of the
     // number of Products of ProductType BOOK from the countProducts() method, count index 1 for COIN and count index 2
     // for STAMP.
     {
         int[] count = countProducts();
 
         if (product.getType() == Product.ProductType.BOOK)
         {
             if (count[0] == 0)
             // if the Agent has none of this Product, returns 1/4 of the money value
             {
                 return money/4;
             }
             else if (count[0] == 1)
             // if the Agent has one of this Product, returns 1/5 of the money value
             {
                 return money/5;
             }
             else if (count[0] == 2)
             // if the Agent has two of this Product, returns 1/6 of the money value
             {
                 return money/6;
             }
             // the Agent has more than two of this Product, returns 1/7 of the money value
             else return money/7;
         }
         else if (product.getType() == Product.ProductType.COIN)
         {
             if (count[1] == 0)
             {
                 return money/4;
             }
             else if (count[1] == 1)
             {
                 return money/5;
             }
             else if (count[1] == 2)
             {
                 return money/6;
             }
             else return money/7;
         }
         else if (product.getType() == Product.ProductType.STAMP)
         {
             if (count[2] == 0)
             {
                 return money/4;
             }
             else if (count[2] == 1)
             {
                 return money/5;
             }
             else if (count[2] == 2)
             {
                 return money/6;
             }
             else return money/7;
         }
         return 0;
     }
 /*
     public static void main(String[] args)
     // method for testing
     {
         Agent agent = new Agent();
 
         ArrayList<Product> pro = new ArrayList<>();
         pro.add(new Product(Product.ProductType.COIN, "Pound"));
 
         agent.setMoney(1000);                                                       // sets money to 1000
         agent.addProducts(pro);                                                     // adds the Product
 
         System.out.println(agent.getMoney());                                       // prints 1000
         System.out.println(agent.getCurrentSize());                                 // prints 1
 
         Product product2 = new Product(Product.ProductType.STAMP, "Stamp");
 
         agent.buyProduct(100, product2);                                      // buys a product2 for 100
 
         System.out.println(agent.getMoney());                                       // prints 900
         System.out.println(agent.getCurrentSize());                                 // prints 2
 
         agent.sellProduct(50, product2);                                      // sells product2 for 50
 
         System.out.println(agent.getMoney());                                       // prints 950
         System.out.println(agent.getCurrentSize());                                 // prints 1
 
         Product product3 = new Product(Product.ProductType.STAMP, "Stamp");
 
         agent.offerProduct(product3);
 
         System.out.println(Arrays.toString(agent.countProducts()));                 // prints [0, 1, 0] the 1 representing
                                                                                     // the single COIN in the ArrayList
         Product product4 = new Product(Product.ProductType.BOOK, "Book");
 
         System.out.println(agent.makeBid(product4));                                // prints (950/4) = 237
     }
 
 */
 }
 