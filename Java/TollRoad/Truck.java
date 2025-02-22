/**********************************************************************************************************************
 * Title: Truck.java
 *
 * Date: 26/04/2023
 *
 * Description: A class for simulating a truck and the cost of using different types of trucks on the toll road
 *              
 *********************************************************************************************************************/

package Java.TollRoad;

public class Truck extends Vehicle{

    /* This class inherits all the fields and methods of the Vehicle class and stores methods specific to the Truck class,
    it also stores its own methods to override the calculateBasicTripCost and toString methods and provides an accessor method
    for the numTrailers field */

    private int numTrailers;

    public Truck(String regNum, String vehicleMake, int numTrailers){

        /* Constructor for the Truck class which takes in arguments for the regNum and vehicleMake which are inherited from
        the Vehicle class and the numTrailers, which is unique to the Truck class*/

        this.regNum = regNum;
        this.vehicleMake = vehicleMake;
        this.numTrailers = numTrailers;
    }

    public int calculateBasicTripCost() {

        /* overrides the calculateBasicTripCost abstract method in the Vehicle class, if the value of the numTrailers field
        is equal to 1, the method will return 1250, if the value is anything else, the method will return 1500*/

        if(numTrailers == 1) return 1250;
        else return 1500;
    }

    public int getNumTrailers() { return numTrailers; }

    public String toString(){
        return this.regNum + ", " + this.vehicleMake + ", " + this.numTrailers;
    }

    public static void main(String[] args) { // test harness

        Truck truck = new Truck("ZD04UKP", "Leyland", 2); // created a new Truck object using data from the txt file

        // prints the individual fields in the Truck object using the accessor methods
        System.out.println("Truck 1 RegNum: " + truck.getRegNum());
        System.out.println("Truck 1 VehicleMake: " + truck.getVehicleMake());
        System.out.println("Truck 1 NumTrailers: " + truck.getNumTrailers());

        System.out.println("Truck 1 as a single string: " + truck.toString()); // prints all the fields of truck in a single string

        System.out.println("Truck 1 trip cost calculation: " + truck.calculateBasicTripCost()); // prints 1500 as the numTrailers value is not equal to 1

        System.out.println(System.lineSeparator());

        Truck truck2 = new Truck("FT54CNH", "Ford", 1); // created a new Truck object with a numTrailers value of 1
        System.out.println("Truck 2 as a single string: " + truck2.toString());
        System.out.println("Truck 2 trip cost calculation: " + truck2.calculateBasicTripCost()); // prints 1250 as the numTrailers value is equal to 1
    }
}