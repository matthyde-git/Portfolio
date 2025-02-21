/**********************************************************************************************************************
 * Title: Main.java
 * 
 * Date: 24/01/2024
 *
 * Description: A class for testing the classes Auction, Agent, Product and their methods. Also contains static
 *              methods writeToFile and readFromFile that allow you to store and load serializable objects from files.
 *********************************************************************************************************************/

 package Java.Auction;

 import java.io.*;

 public class Main
 {
     public static void main(String[] args)
     {
         // Testing the Product class
 
         // initialising the Product objects
         Product product1 = new Product(Product.ProductType.BOOK, "The Lord of the Rings");
         Product product2 = new Product(Product.ProductType.COIN, "Matt");
         Product product3 = new Product(Product.ProductType.STAMP, "Italy");
 
         // writing the Product objects to files
         writeToFile(product1, "product1.ser");
         writeToFile(product2, "product2.ser");
         writeToFile(product3, "product3.ser");
 
         // updating the salePrice values with the setSalePrice method
         product1.setSalePrice(100);
         product2.setSalePrice(50);
         product3.setSalePrice(200);
 
         // printing the Product objects by reference
 
         System.out.println("Product objects printed by reference-" + System.lineSeparator());
 
         System.out.println(product1.toString());
         System.out.println(product2.toString());
         System.out.println(product3.toString());
 
         System.out.println("Product objects loaded from file-" + System.lineSeparator());
 
         readFromFile("product1.ser");
         readFromFile("product2.ser");
         readFromFile("product3.ser");
 
         // Testing the Agent class
 
         // initialising an Agent object
         Agent myAgent = new Agent();
         myAgent.setMoney(1000);
 
         // another Product object of ProductType BOOK for testing
         Product product4 = new Product(Product.ProductType.BOOK, "1984");
 
         // buying the products, removes 200 from the money attribute
         myAgent.buyProduct(50, product1);
         myAgent.buyProduct(50, product4);
         myAgent.buyProduct(50, product2);
         myAgent.buyProduct(50, product3);
 
         // prints all the Product objects where the ProductType is BOOK
 
         System.out.println("Products of ProductType: BOOK- " + System.lineSeparator());
 
         for (int i = 0; i < myAgent.getProducts().size(); i++)
         {
             if (myAgent.getProducts().get(i).getType() == Product.ProductType.BOOK)
             {
                 System.out.println(myAgent.getProducts().get(i).toString());
             }
         }
 
         // offers and prints the STAMP product
 
         System.out.println("Offered product- " + System.lineSeparator());
 
         myAgent.offerProduct(product3);
 
         myAgent.sellProduct(100, product3);
 
         // printing the remaining money after 100 has been added to the money attribute, prints 900
         System.out.println("Agent money remaining = " + myAgent.getMoney() + System.lineSeparator());
 
         // printing the remaining Product objects in the products ArrayList
 
         System.out.println("Products remaining after sellProduct call- " + System.lineSeparator());
 
         for (int i = 0; i < myAgent.getProducts().size(); i++)
         {
             System.out.println(myAgent.getProducts().get(i).toString());
         }
 
         System.out.println("Updated information on the successfully sold Product- " + System.lineSeparator());
 
         System.out.println(product3.toString());
 
         // simulating an Auction with four Agents
 
         System.out.println("Auction simulation- " + System.lineSeparator());
 
         Auction.multipleAuctionSimulation();
 
     }
 
     public static void writeToFile(Serializable s, String filename)
     // takes a Serializable object and a String as parameters, opens a FileOutputStream and then an ObjectOutputStream,
     // then writes the object to the file and closes the stream, try-catch block to catch any IOExceptions
     {
         try
         {
             FileOutputStream fos = new FileOutputStream(filename);
             ObjectOutputStream out = new ObjectOutputStream(fos);
             out.writeObject(s);
             out.close();
         }
         catch (IOException e)
         {
             System.err.println("IOException");
         }
     }
 
     public static Object readFromFile(String filename)
     // takes a filename as a parameter, creates an Object, then opens a FileInputStream and ObjectInputStream,
     // then updates the value of the Object with the value in the ObjectInputStream and closes the stream, try-catch
     // block to catch any Exceptions, then prints the Object using the overloaded toStream() from Product and returns
     // the Object
     {
         Object obj = null;
 
         try
         {
             FileInputStream fis = new FileInputStream(filename);
             ObjectInputStream in = new ObjectInputStream(fis);
             obj = in.readObject();
             in.close();
         }
         catch (Exception e)
         {
             System.err.println("Exception");
         }
 
         System.out.println(obj.toString());
 
         return obj;
     }
 }