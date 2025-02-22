import React from "react";
import { useNavigation } from "react-router-dom";

const SubmitButton = ({ text }) => {

    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    return (
        <>  
            <button
                type="submit"
                className="btn btn-accent"
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <>
                        <span className="loading loading-spinner"></span>
                        submitting...
                    </>
                ) : (
                    text || "submit"
                )}
            </button>
        </>
    );
};

export default SubmitButton;