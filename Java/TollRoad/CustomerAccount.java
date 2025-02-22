/**********************************************************************************************************************
 * Title: CustomerAccount.java
 *
 * Date: 26/04/2023
 *
 * Description: A class for simulating a customer accounts and the amount the have to pay on the toll road depending
 *              on their type of vehicle and if they qualify for a discount. Implements the comparable inteface to
 *              compare customer accounts.
 *              
 *********************************************************************************************************************/

package Java.TollRoad;

import java.util.Objects;

import static java.lang.CharSequence.compare;

public class CustomerAccount implements Comparable<CustomerAccount> {

    /* This class implements the Comparable interface and stores information on customers, including their names,
     account balance, vehicle and level of discount, it has accessor methods for all the fields and a mutator method to set
     the level of discount to NONE. It also has methods to set the level of discount depending on whether the customer
     is a member of staff or a friend/family member. There is also a method called to makeTrip which can calculate the
     cost of a trip and deduct the amount from the customer's account balance. Finally, there is the compareTo method
     which compares the registration numbers of different customer accounts alphabetically.
     */

    private String firstName;
    private String lastName;
    private int accountBalance;
    public Vehicle vehicle; // this field stores information on the customer's vehicle by using the Vehicle class
    private String discount;

    public CustomerAccount(String firstName, String lastName, int accountBalance, Vehicle vehicle, String discount){
        this.firstName = firstName;
        this.lastName = lastName;
        this.accountBalance = accountBalance;
        this.vehicle = vehicle;
        this.discount = discount;
    }

    // getters
    public String getFirstName() { return this.firstName; }
    public String getLastName() { return this.lastName; }
    public int getAccountBalance() { return this.accountBalance; }
    public Vehicle getVehicle () { return this.vehicle; }
    public String getDiscount() { return this.discount; }

    public double calculateStaffDiscount() {
        // returns 0.5 if the value of the discount field in the CustomerAccount object equals STAFF and 1 otherwise
        if (Objects.equals(this.discount, "STAFF")) return 0.5;
        else return 1;
    }

    public double calculateFriendsAndFamilyDiscount(){
        // returns 0.9 if the value of the discount field in the CustomerAccount object equals FRIENDS_AND_FAMILY and 1 otherwise
        if (Objects.equals(this.discount, "FRIENDS_AND_FAMILY")) return 0.9;
        else return 1;
    }

    public void activateStaffDiscount(){
        // mutator method to set the value of discount in the CustomerAccount object to STAFF
        this.discount = "STAFF";
    }

    public void activateFriendsAndFamilyDiscount(){
        // mutator method to set the value of discount in the CustomerAccount object to FRIENDS_AND_FAMILY
        this.discount = "FRIENDS_AND_FAMILY";
    }

    public void deactivateDiscount(){
        // mutator method to set the value of discount in the CustomerAccount object to NONE
        this.discount = "NONE";
    }

    public int addFunds(int amount){
        // method which takes in an integer as a parameter and returns the value of the CustomerAccounts accountBalance field + the integer
        return this.accountBalance = (accountBalance + amount);
    }

    public class InsufficientAccountBalanceException extends Exception {
        // Exception class to be called when a customer has Insufficient funds to complete a transaction

        public InsufficientAccountBalanceException() {
            super();
        }

        public InsufficientAccountBalanceException(String message) {
            super(message);
        }
    }

    public int makeTrip() throws InsufficientAccountBalanceException{

        /* method which calls the calculateBasicTripCost method to get the cost of the trip and multiplies it by the values
        returned by the staffDiscount and friendsAndFamilyDiscount methods to apply discounts where appropriate, the value is
        then converted into an integer and is taken away from the value of the account balance and returns the value. The value
        of the account balance is then updated and if the value of the account balance is less than zero,
        an InsufficientAccountBalanceException will be thrown */

        double calculateCost = (vehicle.calculateBasicTripCost() * calculateStaffDiscount() * calculateFriendsAndFamilyDiscount());

        int integerConversion = (int) calculateCost;

        int reduceBalance = (this.accountBalance - integerConversion);

        if (reduceBalance >= 0) {
            this.accountBalance = reduceBalance;
            return reduceBalance;
        }
        else {
            throw new InsufficientAccountBalanceException("Account Balance is too low");
        }
    }

    public String getRegNum(){ return vehicle.regNum; }

    public int compareTo(CustomerAccount customerAccount) {

        /* compares the Integer value of regNum String in the CustomerAccount the method is called on with the
        Integer value of the regNum String of the CustomerAccount being passed into the method as a parameter,
        if the value of the compare Integer is less than 1, the regNum of the CustomerAccount that the method is being
        alphabetically comes before the regNum of the CustomerAccount being passed into the method and so the method will
        return -1, if the value of the compare Integer is greater than 0, else the values are the same and the method
        will return 0 */

        int compare = compare(this.getRegNum(), customerAccount.getRegNum());

        if (compare < 0){
            return -1;
        }
        else if (compare > 0){
            return 1;
        }
        else {
            return 0;
        }
    }

    public String toString() {
        return firstName + ", " + lastName + ", " + accountBalance + ", " + vehicle + ", " + discount;
    }

    public static void main(String[] args) { // test harness

        // created a new Van object and CustomerAccount object
        Van van = new Van("HQ09WIJ", "Ford", 700);
        CustomerAccount CA = new CustomerAccount("Jose", "Phelps", 3000, van, "NONE");

        // individually prints out all the fields in the CA object

        System.out.println("CustomerAccount 1 First Name: " + CA.getFirstName());
        System.out.println("CustomerAccount 1 Last Name: " + CA.getLastName());
        System.out.println("CustomerAccount 1 Account balance: " + CA.getAccountBalance());
        System.out.println("CustomerAccount 1 Vehicle: " + CA.getVehicle());
        System.out.println("CustomerAccount 1 Discount type: " + CA.getDiscount());

        // prints the account balance, the cost of the trip and the account balance after the trip

        System.out.println("CustomerAccount 1 Trip cost: " + van.calculateBasicTripCost());

        System.out.println(System.lineSeparator());

        // created a new Car and CustomerAccount object
        Car car = new Car("WZ14EWB", "Nissan", 5);
        CustomerAccount CA2 = new CustomerAccount("Josphine", "Blaney", 18000, car, "FRIENDS_AND_FAMILY");

        System.out.println("CustomerAccount 2 as a single string: " + CA2.toString());
        CA2.deactivateDiscount();
        System.out.println("CustomerAccount 2 as a single string, after using deactivateDiscount(): " + CA2.toString());

        System.out.println(System.lineSeparator());

        // created a new Truck and CustomerAccount object
        Truck truck = new Truck("FM66JPE", "Ford", 1);
        CustomerAccount CA3 = new CustomerAccount("Blondell", "Boaz", 7000, truck, "STAFF");

        // testing the compareTo method
        System.out.println("CustomerAccount 1 RegNum: " + CA.getRegNum());
        System.out.println("CustomerAccount 2 RegNum: " + CA2.getRegNum());
        System.out.println("CustomerAccount 3 RegNum: " + CA3.getRegNum());

        System.out.println(System.lineSeparator());

        System.out.println("CustomerAccount 1 compared to CustomerAccount 2: " + CA.compareTo(CA2)); // prints -1 as the regNum of CA comes before the regNum of CA2 alphabetically
        System.out.println("CustomerAccount 2 compared to CustomerAccount 1: " + CA2.compareTo(CA)); // prints 1 as the regNum of CA2 doesn't come before the regNum of CA alphabetically
        System.out.println("CustomerAccount 3 compared to CustomerAccount 1: " + CA3.compareTo(CA)); // prints -1 as the regNum of CA3 comes before the regNum of CA alphabetically
        System.out.println("CustomerAccount 2 compared to CustomerAccount 2: " + CA2.compareTo(CA2)); // prints 0 as the regNum of CA and the regNum of CA2 are the same

        System.out.println(System.lineSeparator());

        Car car2 = new Car("", "", 6);
        CustomerAccount CA4 = new CustomerAccount("", "", 0, car2, "NONE");

        // testing the makeTrip() method
        try {
            System.out.println("Customer Account 1 makeTrip calculation with discount = NONE: " + CA.makeTrip()); // prints 2250
            CA.addFunds(750); // using addFunds to return the funds taken from the previous makeTrip calculation
            CA.activateStaffDiscount();
            System.out.println("Customer Account 1 makeTrip calculation with discount = STAFF: " + CA.makeTrip()); // prints 2625
            CA.addFunds(375); // using addFunds to return the funds taken from the previous makeTrip calculation
            CA.activateFriendsAndFamilyDiscount();
            System.out.println("Customer Account 1 makeTrip calculation with discount = FRIENDS_AND_FAMILY: " + CA.makeTrip()); // prints 2325

            System.out.println(System.lineSeparator());

            System.out.println("Customer Account 2 makeTrip calculation with discount = NONE: " + CA2.makeTrip()); // prints 17500
            CA2.addFunds(500); // using addFunds to return the funds taken from the previous makeTrip calculation
            CA2.activateStaffDiscount();
            System.out.println("Customer Account 2 makeTrip calculation with discount = STAFF: " + CA2.makeTrip()); // prints 17750
            CA2.addFunds(250); // using addFunds to return the funds taken from the previous makeTrip calculation
            CA2.activateFriendsAndFamilyDiscount();
            System.out.println("Customer Account 2 makeTrip calculation with discount = FRIENDS_AND_FAMILY: " + CA2.makeTrip()); // prints 17550

            System.out.println(System.lineSeparator());

            CA3.deactivateDiscount();
            System.out.println("Customer Account 2 makeTrip calculation with discount = NONE: " + CA3.makeTrip()); // prints 5750
            CA3.addFunds(1250); // using addFunds to return the funds taken from the previous makeTrip calculation
            CA3.activateStaffDiscount();
            System.out.println("Customer Account 3 makeTrip calculation with discount = NONE: " + CA3.makeTrip()); // prints 6375
            CA3.addFunds(625);
            CA3.activateFriendsAndFamilyDiscount();
            System.out.println("Customer Account 3 makeTrip calculation with discount = NONE: " + CA3.makeTrip()); // prints 5875

            System.out.println(System.lineSeparator());

        }catch (InsufficientAccountBalanceException e){
            System.err.println(e);
        }

        try {
            System.out.println(CA4.makeTrip());
            // throws InsufficientAccountBalanceException as there is not enough funds in the CustomerAccount to complete a trip
        }catch (InsufficientAccountBalanceException e){
            System.err.println(e); // prints InsufficientAccountBalanceException
        }
    }
}
