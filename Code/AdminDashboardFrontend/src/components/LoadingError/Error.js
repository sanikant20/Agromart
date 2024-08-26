import React from "react";

const ErrorMessage = ({variant, children}) => {
    return (
        <div className="d-flex justify-content-center col-12">
            <div className={`alert ${variant}`}>{children}</div>
        </div>
    );
};

ErrorMessage.defaultProps = {
    variant: "alert-info",
};

export default ErrorMessage;
