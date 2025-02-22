/**********************************************************************************************************************
 * Title: TollRoadMain.java
 *
 * Date: 26/04/2023
 *
 * Description: Reads in data from text files to perform customer transactions such as adding funds to their account or
 *              paying to use the toll road. Calculates the ammount of money earnt by the toll road.
 *              
 *********************************************************************************************************************/
package Java.TollRoad;

import java.io.File;
import java.util.Objects;
import java.util.Scanner;
import java.util.regex.Pattern;

public class TollRoadMain {

    public static TollRoad initialiseTollRoadFromFile() throws Exception {

        /* Class which reads in the customerData file and creates a TollRoad, populates it with CustomerAccount objects
        created by scanning through the file and then returns the TollRoad */

        File inputCustomerData = new File("customerData.txt");

        Scanner fileScanner = new Scanner(inputCustomerData);

        fileScanner.useDelimiter("#");  // scans through the file, using # as the delimiter

        // creating Strings and ints to store the fileScanner objects
        String vehicleType, regNum, firstName, lastName, vehicleMake, discountType;

        int vehicleInfo, startingBalance;

        TollRoad toll = new TollRoad();

        while (fileScanner.hasNext()){

            /* while loop continues whilst there is till data to be scanned in the file, it splits the fileScanner
            object by the commas and stores the split values as specific Strings and ints, then using if, else-if and else
            statements, it will create either a Car, Van or Truck object depending on the value of the vehicleType String,
            the Vehicle object is populated with the appropriate Strings and ints from the split method and is then added
            to the ArrayList. Once the fileScanner has nothing else to scan, the TollRoad is returned and the fileScanner
            will be closed */

            String[] split = String.valueOf(fileScanner.next()).split(",");

            vehicleType = split[0];
            regNum = split[1];
            firstName = split[2];
            lastName = split[3];
            vehicleMake = split[4];
            vehicleInfo = Integer.parseInt(split[5]);
            startingBalance = Integer.parseInt(split[6]);
            discountType = split[7];

            if (Objects.equals(vehicleType, "Car")) {

                Car car = new Car(regNum, vehicleMake, vehicleInfo);

                CustomerAccount CA = new CustomerAccount(firstName, lastName, startingBalance, car, discountType);

                toll.addCustomer(CA);
            } 
            else if (Objects.equals(vehicleType, "Van")) {

                Van van = new Van(regNum, vehicleMake, vehicleInfo);

                CustomerAccount CA = new CustomerAccount(firstName, lastName, startingBalance, van, discountType);

                toll.addCustomer(CA);
            } 
            else {
                Truck truck = new Truck(regNum, vehicleMake, vehicleInfo);

                CustomerAccount CA = new CustomerAccount(firstName, lastName, startingBalance, truck, discountType);

                toll.addCustomer(CA);
            }
        }

        fileScanner.close();

        return toll;
    }

    public static String simulateFromFile(TollRoad road) throws Exception {

        /* Class which reads in data from the transactions file and either addsFunds to a Customer's account or performs
        a makeTrip calculation and will throw either a CustomerNotFoundException or an InsufficientAccountBalanceException
        where appropriate */

        File inputTransactionData = new File("transactions.txt");

        Scanner fileScanner = new Scanner(inputTransactionData);

        fileScanner.useDelimiter(Pattern.quote("$")); // scans through the file using $ as the delimiter

        // creating Strings and ints to store the fileScanner objects
        String transactionType, regNum;

        int amount;

        while (fileScanner.hasNext()) {

            /* while loop continues whilst there is till data to be scanned in the file, it splits the fileScanner
            object by the commas and stores the split values as specific Strings and ints, then using if and else statements
            it will either perform an addFunds transaction or a makeTrip transaction, depending on the value of the
            transaction type String. */

            String[] split = String.valueOf(fileScanner.next()).split(",");

            transactionType = split[0];
            regNum = split[1];

            if (Objects.equals(transactionType, "addFunds")) {

                /* If the transactionType equals "addFunds", it will first create a new String to store the third part of
                the split string as the amount to be added to the CustomerAccount. It then uses the findCustomer method
                on the regNum String to retrieve the matchingCustomerAccount object. It will then add the amount String value
                to the CustomerAccount using the addFunds method. If the CustomerAccount can not be found by the findCustomer
                method, a CustomerNotFoundException will be thrown. */

                try {
                    amount = Integer.parseInt(split[2]);

                    CustomerAccount CA = road.findCustomer(regNum);

                    CA.addFunds(amount);

                    System.out.println(regNum + ": " + amount + " added successfully");

                }catch (TollRoad.CustomerNotFoundException | NullPointerException e){
                    System.out.println(regNum + ": " + "addFunds failed. CustomerAccount does not exist");
                }

            } else {

                /* If the transactionType does not equal "addFunds", it will use findCustomer method on the value of the
                regNum String and then use the makeTrip method on the matching CustomerAccount. It will then use the
                chargeCustomer method to add the cost of the trip to the moneyMade attribute. If the CustomerAccount can
                not be found by the findCustomer method, a CustomerNotFoundException will be thrown. If the account is found
                but does not have enough funds to complete the transaction, an InsufficientAccountBalanceException will be
                thrown. */

                try {
                    CustomerAccount CA = road.findCustomer(regNum);

                    CA.makeTrip();

                    road.chargeCustomer(regNum);

                    System.out.println(regNum + ": Trip completed successfully");
                }
                catch (TollRoad.CustomerNotFoundException | NullPointerException e){
                    System.out.println(regNum + ": " + "makeTrip failed. CustomerAccount does not exist");
                }
                catch (CustomerAccount.InsufficientAccountBalanceException e){
                    System.out.println(regNum + ": " + "makeTrip failed. Insufficient funds");
                }
            }
        }

        System.out.println(System.lineSeparator());

        System.out.println("The total amount of money made by the toll road: " + road.getMoneyMade());

        System.out.println("The total amount of money made by the toll road in a decimal format: £" + (road.getMoneyMade())*Math.pow(10, -2));

        fileScanner.close();

        return "";
    }

    public static void main(String[] args) throws Exception {
        System.out.println(simulateFromFile(initialiseTollRoadFromFile()));
    }
}