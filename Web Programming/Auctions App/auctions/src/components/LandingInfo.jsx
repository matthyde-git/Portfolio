import auctionjpg from "../assets/auction.jpg";
import contactjpg from "../assets/contact.jpg";
import orderjpg from "../assets/order.jpg";
import { NavLink} from "react-router-dom";



const LandingInfo = () => {
    return (
        <>
        <div className="html">
            <div className="cards">
                <div className="card">
                    <img src={auctionjpg} alt="" className="cardImage"/>
                    <div className="cardContent">
                        <p>
                            In this section you will find our wonderful auction page where you can see what products are currently up for auction, bid on products that take your fancy and even see the bidding history;
                            all while at the comfort of your own home. Not sure what you're looking for? Just use our simple filtering system to target certain categories to find that perfect gift for christmas or even just to spoil yourself... I wouldn't blame you!
                        </p>
                    </div>
                    <div className="cardInfo">
                        <NavLink to={"/auctions"} className= "cardLink">View Auctions Page</NavLink>
                    </div>
                </div>

                <div className="card">
                    <img src={contactjpg} alt="" className="cardImage"/>
                    <div className="cardContent">
                        <p>
                            In this section you can get in contact with the team about any queries you may have about the website, or if you need help with one of your orders not going through/payment errors just fill out the form and tell us whats gone wrong..or even whats gone right!
                            Our staff are at hand to help 9am-5pm every Monday-Friday, where behind the scenes we will make sure that your message will be answered as soon as possible.
                        </p>
                    </div>
                    <div className="cardInfo">
                    <NavLink to={"/contact"} className= "cardLink">View Contact Page</NavLink>          
                    </div>
                </div>

                <div className="card">
                    <img src={orderjpg} alt="" className="cardImage"/>
                    <div className="cardContent">
                        <p>
                            In this section youll find the orders page. This is where youll be able to view your previous/pending orders of the products you've brought on this site. From here you can set the address in which you would like to receive the orders/update them if you've recently changed address.
                            "I can't believe its that simple, all with the click of a button!" - Matt Hyde. Just one of our lovely customer reviews, so what are you waiting for? order now! 
                        </p>
                    </div>
                    <div className="cardInfo">
                    <NavLink to={"/orders"} className= "cardLink">View Orders Page</NavLink>    
                    </div>
                </div>

            </div>
            </div>
        </>
    );
};

export default LandingInfo;

