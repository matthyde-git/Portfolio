/**********************************************************************************************************************
 * Title: TollRoad.java
 *
 * Date: 26/04/2023
 *
 * Description: A class for calculating and storing the amount of money earnt by the toll road
 *              
 *********************************************************************************************************************/

package Java.TollRoad;

import java.util.ArrayList;
import java.util.Objects;

public class TollRoad {

    /* This class stores an ArrayList of CustomerAccount objects and an integer to store the money made by the TollRoad,
    it has accessor methods for both fields, methods to add new customers to the ArrayList, find customers who already stored
    in the ArrayList and a method to charge a customer for using the TollRoad and adding the value to the moneyMade attribute.
    There is also a toString method that can return the ArrayList as a string.
    */

    private ArrayList<CustomerAccount> arrayList = new ArrayList<>();
    private int moneyMade;

    public TollRoad() {

    }

    // getters
    public ArrayList<CustomerAccount> getArrayList() { return this.arrayList; }
    public int getMoneyMade() { return moneyMade; }

    public class CustomerNotFoundException extends Exception {

        // Exception class to be called if a customer can not be found within the ArrayList

        public CustomerNotFoundException() {
            super();
        }

        public CustomerNotFoundException(String message) {
            super(message);
        }
    }

    public ArrayList<CustomerAccount> addCustomer(CustomerAccount account){

        // takes in a CustomerAccount and adds it to the ArrayList before returning the updated ArrayList

        arrayList.add(account);

        return arrayList;
    }

    public CustomerAccount findCustomer(String regNum) throws CustomerNotFoundException{

        /* takes in a regNum as a string, then uses a for loop to iterate through every object in the ArrayList until
        it finds one with a matching regNum value and returns it, if the loop reaches the end of the ArrayList without
        finding a matching regNum value, a CustomerNotFoundException will be thrown */

        try {
            for (int i = 0; i < arrayList.size(); i++){
                if (Objects.equals(arrayList.get(i).getRegNum(), regNum)) {
                    return arrayList.get(i);
                } else if (i == arrayList.size()) {
                    throw new CustomerNotFoundException("The Customer Account does not exist");
                }
            }
        } catch (CustomerNotFoundException e) {
            System.err.println(e);
        }

        return null;
    }

    public void chargeCustomer(String regNum) throws CustomerNotFoundException, CustomerAccount.InsufficientAccountBalanceException {

        /* takes in a regNum as a string, then uses a for loop to iterate through every object in the ArrayList until
        it finds one with a matching regNum value, then it will store the account balance of the CustomerAccount and then
        perform a makeTrip calculation and subtract the value from the original balance to get the cost of the trip for the
        customer. The value of the calculateCost integer is then added to the value of the moneyMade attribute. If the
        CustomerAccount does not have sufficient AccountBalance to perform the makeTrip calculation, an
        InsufficientAccountBalanceException will be thrown. If the loop reaches the end of the ArrayList without finding
        a matching regNum value, a CustomerNotFoundException will be thrown */

        for (int i = 0; i < arrayList.size(); i++) {

                if (Objects.equals(arrayList.get(i).getRegNum(), regNum)) {
                    int originalBalance = arrayList.get(i).getAccountBalance();
                    int updatedBalance = arrayList.get(i).makeTrip();
                    int calculateCost = (originalBalance - updatedBalance);
                    this.moneyMade = moneyMade + calculateCost;
                }
                else if (i == arrayList.size()) {
                    throw new CustomerNotFoundException("The Customer Account does not exist");
                }
            }
    }

    public String toString() {
        return String.valueOf(this.getArrayList());
    }

    public static void main(String[] args) {

        TollRoad toll = new TollRoad();

        Van van = new Van("HQ09WIJ", "Ford", 700);
        CustomerAccount CA = new CustomerAccount("Jose", "Phelps", 3000, van, "NONE");

        Car car = new Car("WZ14EWB", "Nissan", 5);
        CustomerAccount CA2 = new CustomerAccount("Josphine", "Blaney", 18000, car, "FRIENDS_AND_FAMILY");

        Truck truck = new Truck("FM66JPE", "Ford", 1);
        CustomerAccount CA3 = new CustomerAccount("Blondell", "Boaz", 7000, truck, "STAFF");


        //testing addCustomer
        toll.addCustomer(CA);
        toll.addCustomer(CA2);
        toll.addCustomer(CA3);
        System.out.println("ArrayList in a single string: " + toll.toString());
        //System.out.println(toll.getArrayList());

        System.out.println(System.lineSeparator());

        // prints the individual data for each account in the arrayList
        System.out.println("ArrayList object 0 FirstName: " + toll.arrayList.get(0).getFirstName());
        System.out.println("ArrayList object 0 LastName: " + toll.arrayList.get(0).getLastName());
        System.out.println("ArrayList object 0 AccountBalance: " + toll.arrayList.get(0).getAccountBalance());
        System.out.println("ArrayList object 0 Vehicle: " + toll.arrayList.get(0).getVehicle());
        System.out.println("ArrayList object 0 Discount: " + toll.arrayList.get(0).getDiscount());
        System.out.println("ArrayList object 0 RegNum: " + toll.arrayList.get(0).getRegNum());

        System.out.println("ArrayList object 1 FirstName: " + toll.arrayList.get(1).getFirstName());
        System.out.println("ArrayList object 1 LastName: " + toll.arrayList.get(1).getLastName());
        System.out.println("ArrayList object 1 AccountBalance: " + toll.arrayList.get(1).getAccountBalance());
        System.out.println("ArrayList object 1 Vehicle: " + toll.arrayList.get(1).getVehicle());
        System.out.println("ArrayList object 1 Discount: " + toll.arrayList.get(1).getDiscount());
        System.out.println("ArrayList object 1 RegNum: " + toll.arrayList.get(1).getRegNum());

        System.out.println("ArrayList object 2 FirstName: " + toll.arrayList.get(2).getFirstName());
        System.out.println("ArrayList object 2 FirstName: " + toll.arrayList.get(2).getLastName());
        System.out.println("ArrayList object 2 FirstName: " + toll.arrayList.get(2).getAccountBalance());
        System.out.println("ArrayList object 2 FirstName: " + toll.arrayList.get(2).getVehicle());
        System.out.println("ArrayList object 2 FirstName: " + toll.arrayList.get(2).getDiscount());
        System.out.println("ArrayList object 2 FirstName: " + toll.arrayList.get(2).getRegNum());

        //System.out.println(toll.chargeCustomer("DHSJF76"));
        //System.out.println(toll.getMoneyMade());

        System.out.println(System.lineSeparator());

        // testing FindCustomer
        try {
            System.out.println("Money made by the arrayList before chargeCustomer " + toll.getMoneyMade());
            System.out.println("FindCustomer with RegNum: FM66JPE before chargeCustomer: " + toll.findCustomer("FM66JPE"));
            toll.chargeCustomer("FM66JPE");
            System.out.println("FindCustomer where RegNum: FM66JPE after chargeCustomer: " + toll.findCustomer("FM66JPE"));
            System.out.println("Money made by the arrayList after chargeCustomer = " + toll.getMoneyMade());

        }catch (CustomerNotFoundException | CustomerAccount.InsufficientAccountBalanceException e){
            System.err.println(e);
        }
    }
}