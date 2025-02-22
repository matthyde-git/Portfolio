import React from "react";
import { Link, useRouteError } from "react-router-dom";
import notFound from "../assets/undraw_page_not_found_re_e9o6.svg"
import other from "../assets/undraw_website_5bo8.svg"

const ErrorPage = () => {

    const error = useRouteError();
    console.log(error);

    if (error.status === 404)
    {
        return (
            <div>
                <img src={notFound} alt="404" />
                <h4>The resource requested is no longer available.</h4>
                <Link to="/">Back Home</Link>
            </div>
        );
    }

    return (
        <div>
            <img src={other} alt="other" />
            <h4>Some issues have occured, please try again later.</h4>
            <Link to="/">Back Home</Link>
        </div>
    );
};

export default ErrorPage;