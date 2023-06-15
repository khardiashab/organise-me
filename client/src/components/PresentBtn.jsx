import React, { useState, useEffect } from "react";
import { getTodayPersent, updatePersent } from "../api/persent.js";
import "./PersentBtn.css";
import { createLocation, getLocation } from "../api/location.js";
import { getUserLocation, getDistance } from "../utils/Location.js";
import Success from "./Success.jsx";
import Warning from "./Warning.jsx";
import Loading from "./Loading/Loading.jsx";


export default function PresentBtn() {
  let [isPersent, setIsPersent] = useState(null);
  let [isModal, setModal] = useState(false);
  let [warning, setWarning] = useState("");
  let [success, setSuccess] = useState('');

  async function fetchCachData() {
    try {
      let result = await getTodayPersent()
      if (result.data === null) {
        setIsPersent(null)
      } else {
        setIsPersent(result.data.persent)
      }
    } catch (error) {
      console.log(error)
      setWarning("Refresh the Page.")
    }
  }

  const openModal = async () => {
    setModal(true)
  }
  const closeModal = () => {
    setModal(false)
  }

  const addAttendence = async () => {
    try {
      const locationfromDb = await getLocation()
      const { longitude, latitude } = await getUserLocation()
      let dbLongitude = locationfromDb.data?.longitude
      let dbLatitude = locationfromDb.data?.latitude
      const distance = getDistance(dbLatitude,dbLongitude, latitude, longitude)
      if(distance <50){
        await updatePersent()
        setSuccess("You mark your attendence")
        fetchCachData()
      } else {
        setWarning("Reach your workpalace & try again.")
      }
    } catch (error) {
      console.log(error)
      setWarning("Something went wrong. Refresh the page.")
    }
  }


  useEffect(() => {
    fetchCachData();
  }, [])

  return (
    <>
      <div className="text-center my-3">
        <Warning warning={warning} />
        {(<Success success={success} />) }
        {
          isPersent === null ? (
            <button className="btn btn-warning"
              onClick={openModal}
              type="button"
            >Add Your Location</button>
          ) : isPersent === false ? (
            <button className="btn btn-primary"
              onClick={addAttendence}
              type="button"
            >Mark Your Attendence</button>
          ) : (
            <button className="btn btn-success" disabled>You are at Your location </button>
          )
        }
      </div>
      {(
        <Modal closeModal={closeModal} isModal={isModal} />
      )}
    </>
  );
}

function Modal({ isModal, closeModal }) {
  const [nameOfLocation, setNameOfLocation] = useState("")
  const [isLoading, setIsloading] = useState(false)
  const [warning, setWarning] = useState("")
  const [success, setSuccess] = useState(false)

  const addLocation = async () => {
    if (nameOfLocation.length > 3) {
      try {
        setIsloading(true)
        const { latitude, longitude } = await getUserLocation()
        const data = { latitude, longitude, place: nameOfLocation }
        await createLocation(data)
        setIsloading(false)
        setSuccess("Location added successfully.")
      } catch (error) {
        console.log(err)
        setIsloading(false)
        setWarning("There is problem in getting location.")
      }
    } else {
      setWarning("Loaction name should be more than 3 characters.")
    }
  }
  return (
    <>
      {isModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header d-flex">
              <h2>Add Location</h2>
              <h2><span className="close close-btn" onClick={closeModal}>
                  &times;
                </span>
              </h2>
            </div>
            {success.length>0 | isLoading ? (<>
              <Success success={"Location added successfully."} />
              <Loading isLoading={isLoading} />
            </>
            ) : (<>

              <div className="modal-body">
                <Warning warning={warning} />

                <div className="my-3 form-group">
                  <label htmlFor="" className="d-block">Location Name</label>
                  <input type="text" className="form-control rounded-0 shadow"
                    onChange={e => setNameOfLocation(e.target.value)}
                    name="location" value={nameOfLocation} />
                </div>

              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}
                >Cancel</button>
                <button className="btn btn-primary" onClick={addLocation}>Add Location</button>

              </div>
            </>
            )}

          </div>
        </div>
      )}
    </>
  )
}
