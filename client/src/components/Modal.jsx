import React from "react";

export default function Modal({ Modaldata }) {
  return (
    <>
      <div className="modal fade " id="dailyListModal" role="dialog" tabIndex="-1">
        <div className="modal-dialog modal-vertical-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body ms-3">
              {Modaldata ? (
                <p className="lead ">Your are there</p>
              ) : (
                <p className="lead text-warning"> You have not use App.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
