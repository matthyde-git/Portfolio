/**********************************************************************************************************************
 * Title: Van.java
 *
 * Date: 26/04/2023
 *
 * Description: A class for simulating a van and the cost of using different types of vans on the toll road
 *              
 *********************************************************************************************************************/

package Java.TollRoad;

public class Van extends Vehicle{

    /* This class inherits all the fields and methods of the Vehicle class and stores methods specific to the Van class,
    it also stores its own methods to override the calculateBasicTripCost and toString methods and provides an accessor method
    for the payLoad field */

    private int payLoad;

    public Van(String regNum, String vehicleMake, int payload){

        /* Constructor for the Van class which takes in arguments for the regNum and vehicleMake which are inherited from
        the Vehicle class and the payLoad, which is unique to the Van class*/

        this.regNum = regNum;
        this.vehicleMake = vehicleMake;
        this.payLoad = payload;
    }

    public int calculateBasicTripCost() {

        /* overrides the calculateBasicTripCost abstract method in the Vehicle class, if the value of the payLoad field
        is less than or equal to 600, the method will return 500, if the value is greater than 600 and less than 800,
        the method will return 750, if the value is anything else, the method will return 1000*/

        if(payLoad <= 600) return 500;
        if(payLoad > 600 && payLoad < 800) return 750;
        else return 1000;
    }

    public int getPayLoad(){ return this.payLoad; }

    public String toString(){ 
        return this.regNum + ", " + this.vehicleMake + ", " + this.payLoad;
    }

    public static void main(String[] args) { // test harness

        Van van = new Van("HQ09WIJ", "Ford", 700); // created a Van object using data from the txt file

        // prints the individual fields in the Van object using the accessor methods
        System.out.println("Van 1 RegNum: " + van.getRegNum());
        System.out.println("Van 1 VehicleMake: " + van.getVehicleMake());
        System.out.println("Van 1 PayLoad: " + van.getPayLoad());

        System.out.println("Van 1 as a single string: " + van.toString()); // prints all the fields of van in a single string

        System.out.println("Van 1 Trip cost calculation: " + van.calculateBasicTripCost()); // prints the value 750 as the payLoad is greater than 600 and less than 800

        System.out.println(System.lineSeparator());

        Van van2 = new Van("FW12FGY", "Vauxhall", 500); // created a new Van object with a payLoad of 500
        System.out.println(van2.toString());
        System.out.println("Van 2 Trip cost calculation: " + van2.calculateBasicTripCost()); // prints 500 as the payLoad is less than 600

        System.out.println(System.lineSeparator());

        Van van3 = new Van("KH89HFY", "Citroen", 600); // created a new Van object with a payLoad of 600
        System.out.println(van3.toString());
        System.out.println("Van 3 Trip cost calculation: " + van3.calculateBasicTripCost()); // prints 500 as the payLoad is equal to 600

        System.out.println(System.lineSeparator());

        Van van4 = new Van("GV45DCH", "Seat", 900); // created a new Van object with a payLoad of 900
        System.out.println(van4.toString());
        System.out.println("Van 4 Trip cost calculation: " + van4.calculateBasicTripCost()); // prints 1000 as the payLoad is greater than 800
    }
}