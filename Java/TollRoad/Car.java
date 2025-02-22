/**********************************************************************************************************************
 * Title: Car.java
 *
 * Date: 26/04/2023
 *
 * Description: A class for simulating a car and the cost of using different types of cars on the toll road
 *              
 *********************************************************************************************************************/

package Java.TollRoad;

public class Car extends Vehicle {

    /* This class inherits all the fields and methods of the Vehicle class and stores methods specific to the Car class,
    it also stores its own methods to override the calculateBasicTripCost and toString methods and provides an accessor method
    for the numberOfSeats field */

    private int numberOfSeats;

    public Car(String regNum, String vehicleMake, int numberOfSeats){

        /* Constructor for the Car class which takes in arguments for the regNum and vehicleMake which are inherited from
        the Vehicle class and the numberOfSeats, which is unique to the Car class*/

        this.regNum = regNum;
        this.vehicleMake = vehicleMake;
        this.numberOfSeats = numberOfSeats;
    }

    public int calculateBasicTripCost(){

        /* overrides the calculateBasicTripCost abstract method in the Vehicle class, if the value of the numberOfSeats field
        is less than or equal to 5, the method will return 500, if the value is greater than 5, the method will return 600*/

        if (numberOfSeats <= 5) return 500;
        else return 600;
    }

    public int getNumberOfSeats(){ return this.numberOfSeats; }

    public String toString(){
        return this.regNum + ", " + this.vehicleMake + ", " + this.numberOfSeats;
    }

    public static void main(String[] args) { //Test harness

        Car car = new Car("HE57YSO", "Vauxhall", 5 ); //Created a Car object using data from the txt file

        // prints the individual fields in the Car object using the accessor methods
        System.out.println("Car 1 RegNum: " + car.getRegNum());
        System.out.println("Car 1 VehicleMake: " + car.getVehicleMake());
        System.out.println("Car 1 NumberOfSeats: " + car.getNumberOfSeats());

        System.out.println("Car 1 as a single string: " + car.toString()); // prints all the fields of car in a single string

        System.out.println("Car 1 Trip cost calculation: " + car.calculateBasicTripCost()); //prints the value 500 as the car object has less than or equal to 5 seats

        Car car2 = new Car("", "", 6); // created a Car object with 6 seats
        System.out.println("Car 2 Trip cost calculation: " + car2.calculateBasicTripCost()); // prints the value 600 as the car object has more than 5 seats
    }
}
