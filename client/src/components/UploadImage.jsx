import { useEffect, useState, useCallback, useMemo } from "react";
import React from "react";
import { RotatingLines } from "react-loader-spinner";
import { addNotes } from "../api/notes.js";
function callInput() {
  let imageInput = document.getElementById("imageInput");
  console.log(imageInput);
  imageInput.click();
}
export default function UploadImage() {
  let [image, setImage] = useState(undefined);
  let [title, setTitle] = useState("");
  let [error, setError] = useState("");
  let [uploading, setUploading] = useState(false);
  let [type, setType] = useState("warning");
  useEffect(() => {
    setError("");
  }, [image, title]);
  function imageInputOnChange(e) {
    let { type, size } = e.target.files[0];
    if (
      ["image/jpeg", "image/gif", "image/jpg", "image/png"].includes(type) &&
      size < 5000000
    ) {
      setImage(e.target.files[0]);
    } else {
      setError("Upload image in .jpg, .jpeg .png and <5mb");
      setImage(undefined);
    }
  }
  async function uploadNote(e) {
    if (image === undefined || title === "") {
      setType("warning")
      setError("Fill all field.");
    } else {
      let formData = new FormData()
      formData.append("title", title)
      formData.append("notes", image)
      setUploading(true)


      // calling the api funciton
      try {
        console.log("Uploadimage : ", formData)
        let response = await addNotes(formData)
        setUploading(false)
        setError("Note Successfully uploaded.")
        setType("success")
        setImage(undefined);
        setTitle("");
      } catch (error) {
        console.log(error)
        setUploading(false)
        setError("Error")
        setType("danger")
      }
    }
  }

  return (
    <>
    
      {error !== "" ? <Warning error={error}  type={type} /> : null}
      {uploading ? (
        
        <div className="mx-auto h-100">
          <RotatingLines strokeColor="#00BFFF" />
        </div>
      ) : (
        <>
          <div className="d-flex flex-column justify-content-center align-items-center p-2 p-lg-5 w-100">
            <div
              className="border p-3 bg-secondary  w-100"
              style={{
                maxWidth: "400px",
                height: "300px",
                backgroundColor: "grey"
              }}
            >
              {!!!image ? (
                <div
                  className="d-flex flex-column justify-content-around align-items-center w-100 h-100"
                  style={{ border: "2px dotted black" }}
                >
                  <div
                    className="d-flex flex-column align-items-center cursor-pointer"
                    style={{ cursor: "pointer" }}
                    onClick={callInput}
                  >
                    <span className="text-primary text-decoration-underline">
                      {" "}
                      <i className="fa-duotone fa-cloud-arrow-up"></i>
                    </span>
                    <span className="text-primary text-decoration-underline fs-6">
                      Click here to upload image
                    </span>
                    <input
                      type="file"
                      id="imageInput"
                      className="d-none"
                      value={image}
                      onChange={imageInputOnChange}
                    />
                  </div>
                  <p className="px-3 text-center">
                    Upload image in .jpg, .jpeg .png and {"<"}5mb
                  </p>
                </div>
              ) : (
                <div className="w-100 h-100">
                  <img
                    src={window.URL.createObjectURL(image)}
                    alt="Uploaded image"
                    className="w-100 h-100"
                    style={{ objectFit: "fill" }}
                  />
                </div>
              )}
            </div>
            <div className="d-flex flex-column align-items-center p-2 p-lg-5 m-0">
              <input
                type="text"
                className="inputTitle px-3 mt-5"
                id="inputTitle"
                placeholder="Add title here..."
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                
              />
              <div
                className="btn btn-primary text-white btn-sm mt-3 p-1"
                onClick={uploadNote}
              >
                Add Notes
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

function Warning({ error, type }) {
  return <div className={`alert alert-${type} p-2 w-80 mb-2 text-l mx-auto w-50 w-sm-75`} id="uploading-warning">{error}</div>;
}
