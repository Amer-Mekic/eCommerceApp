"use client"

import "./success.css";

export default function SuccessPage() {
  return (
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-5">
                <div className="message-box _success">
                    <i className="fa fa-check-circle" aria-hidden="true"></i>
                    <h2> Your payment was successful </h2>
                    <p> Thank you for your payment.</p> 
                    <p> We will be in contact with more details shortly </p>  
                    <button
                        className="btn btn-primary mt-5"
                        onClick={() => 
                            window.location.href = "/"
                        }
                    >
                        Back to Home
                    </button>
                </div> 
            </div> 
        </div>   
    </div>      
  );
}