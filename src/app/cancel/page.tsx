"use client"
import "./cancel.css"

export default function CancelPage() {
  return (
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-5">
                <div className="message-box _success _failed">
                    <i className="fa fa-times-circle" aria-hidden="true"></i>
                    <h2> Your payment failed </h2>
                    <p>  Try again later </p> 
                    <button
                        className="btn btn-primary mt-5"
                        onClick={() => window.location.href = "/"}
                    >
                        Back to Home
                    </button>
                </div> 
            </div> 
        </div> 
    </div>
    );
}