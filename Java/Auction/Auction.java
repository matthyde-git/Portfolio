/**********************************************************************************************************************
 * Title: Auction.java
 * 
 * Date: 24/01/2024
 *
 * Description: A class for creating objects that simulate an auction, with fields for storing the Agents, Products and
 *              the number of agents. Contains a generic inner class for creating Triples containing the Agent, Product
 *              and bid. Provides a HashSet contain these triples to store the bids in the Auction and has methods for
 *              simulating different Auctions.
 *********************************************************************************************************************/

 package Java.Auction;
 
 import java.util.ArrayList;
 import java.util.HashSet;
 import java.util.Random;
 
 public class Auction
 {
     private int numAgents;
     private HashSet<Triple> bids;
     private Triple<Agent,Product,Double> highestBid;
 
     private static ArrayList<Agent> auctionAgents;
     private static ArrayList<Product> auctionProducts;
 
     public Auction(int agents, int products)
     {
         auctionAgents = new ArrayList<>();      // initialising a static ArrayList to store Agent objects
         auctionProducts = new ArrayList<>();    // initialising a static ArrayList to store Product objects
 
         for (int i = 0; i < agents; i++)        // initialises a variable number of Agents depending on the agents int
         {
             auctionAgents.add(new Agent());
             numAgents++;
             auctionAgents.get(i).setMoney((int) ((1000-500) * Math.random() + 500));    // set random amount of money between 500 - 1000
             for (int j = 0; j < products; j++)  // initialises a variable number of Products depending on the products int
             {
                 auctionProducts.add(new Product(Product.randomProductType(), "agent" + i + ", product" + j));
             }
             auctionAgents.get(i).addProducts(auctionProducts);  // adds the Products ArrayList to the Agent object
             auctionProducts.clear();    // clears the Products currently stored before it loops again
         }
 
     }
 
     // getter and setter methods
     public int getNumAgents() { return this.numAgents; }
     public HashSet<Triple> getBids() { return this.bids; }
     public Triple<Agent,Product,Double> getHighestBid() { return this.highestBid; }
     public static ArrayList<Agent> getAuctionAgents() { return auctionAgents; }
     public static ArrayList<Product> getAuctionProducts() { return auctionProducts; }
 
     public class Triple <first,second,third>
             // generic class to store a Triple containing an Agent, Product and bid
     {
         private first agent;
         private second product;
         private third bid;
 
         public Triple(first agent, second product, third bid)
         {
             this.agent = agent;
             this.product = product;
             this.bid = bid;
         }
 
         // getter and setter methods
         public first getAgent() { return this.agent; }
         public void setAgent(first agent) { this.agent = agent; }
         public second getProduct() { return this.product; }
         public void setProduct(second product) { this.product = product; }
         public third getBid() { return this.bid; }
         public void setBid(third bid) { this.bid = bid; }
     }
 
     public void singleAuction(Agent seller)
     // takes an Agent object, creates and adds to the seller a random Product, then iterates through the ArrayList of
     // Agents, calls makeBid() on them and stores the result in the bidAmount double, then stores the Agent, Product and
     // bid in a Triple object, compares the bidAmount to the highBidAmount and stores the information of the highest
     // bidder in the Triple, highestBid, then calls buyProduct on the winning Agent and sellProduct on the selling Agent
     {
         ArrayList<Product> sellerProducts = new ArrayList<>();
         Product sellerProduct = new Product(Product.randomProductType(), "sellerProduct");
         sellerProducts.add(sellerProduct);
 
         double bidAmount = 0;
         double highBidAmount = 0;
 
         for (int i = 0; i < numAgents; i++)
         {
             bidAmount = Auction.getAuctionAgents().get(i).makeBid(sellerProduct);
 
             Triple<Agent,Product,Double> bid = new Triple<>(Auction.getAuctionAgents().get(i), sellerProduct, bidAmount);
 
             try
             {
                 bids.add(bid);
             }
             catch (NullPointerException e){}
 
             if (bidAmount > highBidAmount)
             {
                 highBidAmount = bidAmount;
                 highestBid = new Triple<>(Auction.getAuctionAgents().get(i), sellerProduct, highBidAmount);
             }
         }
         highestBid.getAgent().buyProduct((int) highBidAmount, sellerProduct);
         seller.sellProduct((int) highBidAmount, sellerProduct);
     }
 
     public static void multipleAuctionSimulation()
     // creates an Auction object with 4 Agents and 4 Products, iterates through the ArrayList and prints the
     // information of each winning bid
     {
         Auction auction = new Auction(4, 4);
 
         for (int i = 0; i < auction.getNumAgents(); i++)
         {
             auction.singleAuction(auctionAgents.get(i));
 
             System.out.println("Winning Agent: "  + auction.getHighestBid().getAgent() + "\n" +
                     auction.getHighestBid().getProduct() +
                     "Bid: " + auction.getHighestBid().getBid() + "\n");
         }
     }

     // tests
 /*
     public static void main(String[] args)
     // method for testing
     {
         Auction auction = new Auction(2, 1);
         auction.singleAuction(auctionAgents.get(0));
 
         System.out.println("Winning Agent: "  + auction.getHighestBid().getAgent() + "\n" +
                 auction.getHighestBid().getProduct() +
                 "Bid: " + auction.getHighestBid().getBid());
 
         multipleAuctionSimulation();
     }
 
 */
 }
 