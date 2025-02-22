/**********************************************************************************************************************
 * Title: Vehicle.java
 *
 * Date: 26/04/2023
 *
 * Description: Contains an abstract class to be extended by specific types of vehicle classes
 *              
 *********************************************************************************************************************/

package Java.TollRoad;

public abstract class Vehicle {

    /* This is an abstract class that stores two of the vehicle fields with protected access so that only the subclasses of
    vehicle can change the values stored in the fields. It also stores the abstract method, calculateBasicTripCost which
    can be overridden by its subclasses. It also stores accessor methods for the regNum and vehicleMake fields and a toString
    method which returns the fields as a single string */

    protected String regNum; 
    protected String vehicleMake;

    public Vehicle(){}

    public Vehicle(String regNum, String vehicleMake){

        this.regNum = regNum;
        this.vehicleMake = vehicleMake;
    }

    //abstract method to be overridden
    public abstract int calculateBasicTripCost(); 

    // accessors
    public String getRegNum(){ return this.regNum; } 
    public String getVehicleMake(){ return this.vehicleMake; } 

    public String toString() {
        return regNum + ", " + vehicleMake;
    }
}
