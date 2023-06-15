import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getUser } from '../../api/user.js';
import Warning from '../Warning.jsx';
import { getList } from '../../api/tasks.js';
import { getPersent } from '../../api/persent.js';
import Loading from "../Loading/Loading.jsx";
import Success from "../Success.jsx";
function MyCalendar() {
  const [isPresent, setIsPresent] = useState(false)
  const [list, setList] = useState(null)
  const [isModal, setIsModal] = useState(false)
  const [warning, setWarning] = useState("")
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [startDate, setStartDate] = useState(null)
  const getDate = async () => {
    const cachedData = localStorage.getItem("createdAt")
    if (cachedData) {
      setStartDate(new Date(JSON.parse(cachedData)))
    } else {
      try {
        const response = await getUser()
        localStorage.setItem("createdAt", JSON.stringify(response.data))
        setStartDate(new Date(response.data))
      } catch (error) {
        console.error("There is an error getting date.")
        setWarning("Referesh the Page.")
      }
    }
  }
  useEffect(() => {
    getDate()
  }, [])
  const disableButton = ({ date }) => {
    return date < startDate || date > new Date();
  };
  const openModal = () => {
    setIsModal(true)
  }
  const closeModal = () => {
    setIsModal(false)
  }
  const handleButtonClick = async (day) => {
    setSelectedDate(day)
    const response = await getList(day)
    let persent = await getPersent(day)
    setIsPresent(persent.data?.persent)
    setList(response.data)
    openModal()
  }
  useEffect(() => {
    setSelectedDate(selectedDate)
  }, [selectedDate])

  return (
    <div>
      <Warning warning={warning} />
      {startDate && (
        <Calendar
          value={selectedDate}
          onChange={handleButtonClick}
          tileDisabled={disableButton}
          calendarType="US"
        />
      )}
      {isModal && (
        <Modal  closeModal={closeModal} date={selectedDate} list={list} isPresent={isPresent}/>
      )}
    </div>
  );
}
function Modal({ closeModal, date , list, isPresent}) {
  const [isLoading, setIsLoading] = useState(false)
  const [warning, setWarning] = useState("")
  return (
    <>
      {list && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header d-flex">
              <h2>{date.toDateString()}</h2>
              <h2><span className="close close-btn" onClick={closeModal}>
                &times;
              </span>
              </h2>
            </div>
            { isLoading ? (
              <Loading />
            ) : (
              <>
                {list && list?.length > 0 && (
                  <>
                    {warning && <Warning message={warning} />}
                    {isPresent === true ? (
                      <Success success={"You were at your workpalce."} />
                    ) : (
                      <Warning warning={"You have not marked the attendence."} />
                    )}
                    <div className="mt-3">
                      <p className="text-muted">Your Tasks</p>
                      {list.map(item => (
                        <div key={item?._id}>
                          {!!item.done ? (<>
                            <Success success={item.name} />
                          </>
                          ) : (<>
                            {console.log(item)}
                            <Warning warning={item.name || "Empty"} />
                          </>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
export default MyCalendar;