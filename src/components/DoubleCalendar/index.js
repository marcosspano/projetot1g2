import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { registerLocale } from  "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIosNew } from 'react-icons/md';
import styled from "../../pages/Detalhes/components/Calendar/CalendarDesktop/styles.module.scss";

import  pt  from  'date-fns/locale/pt-BR' ; 
// import { setDate } from "rsuite/esm/utils/dateUtils";
registerLocale ( 'pt' ,  pt );


function DoubleCalendar() {
  const [dateRange, setDateRange] = useState([]);
  const [startDate, endDate] = dateRange;
  const [windowWidth, setWindowWidth] = useState("desktop");

  let sizeScreen;

  function calendarView(){
    
      if(window.innerWidth < 670 && windowWidth === "desktop"){
        return (
        setWindowWidth("mobile"),
        console.log('if 1'))
      }
  
      if(window.innerWidth > 670 && windowWidth === "mobile"){
        return (
        setWindowWidth("desktop"),
        console.log('if 2'))
  
      }
  
  }
  
  useEffect(()=>{
    calendarView()
  },[])

  window.addEventListener("resize", () => {
    if(window.screen.availWidth < 768 && windowWidth === "desktop"){
      setWindowWidth("mobile");
    }

    if(window.screen.availWidth >= 768 && windowWidth === "mobile"){
      setWindowWidth("desktop");
    }
  });

    if (windowWidth === "desktop") {
      (sizeScreen = 2)
    } else{
      (
        sizeScreen = 1)
    };


  return (
    <DatePicker       
        renderCustomHeader={({
          monthDate,
          customHeaderCount,
          decreaseMonth,
          increaseMonth,
        }) => (
          <div>
            <button
              aria-label="Previous Month"
              className={
                "details_previous react-datepicker__navigation react-datepicker__navigation--previous"
              }
              style={customHeaderCount === 1 ? { visibility: "hidden" } : null}
              onClick={decreaseMonth}
            >
              <MdOutlineArrowBackIosNew size={16} color="#ffffff"/>
            </button>
            <span className="react-datepicker__current-month">
              {monthDate.toLocaleString("pt-BR", {
                month: "long",
              })}
            </span>
            <button
              aria-label="Next Month"
              className={
                "details_next react-datepicker__navigation react-datepicker__navigation--next"
              }
              style={customHeaderCount === 0 ? { visibility: "hidden" } : null}
              onClick={increaseMonth}
            >
            <MdOutlineArrowForwardIos size={16} color="#ffffff"/>
            </button>
          </div>
        )}
        calendarClassName={styled.calendar}
        locale="pt"
        placeholderText="Data do checkin | Checkout "
        minDate={new Date()}
        startDate={startDate}
        monthsShown={sizeScreen}
        endDate={endDate}
        dateFormat="dd/MM/yyyy"
        onChange={update => {setDateRange(update)}}
        className="form-control form-control-sm"
        isClearable
        formatWeekDay={nameOfDay => nameOfDay.substring(0,1)} 
        disabledKeyboardNavigation
        // shouldCloseOnSelect={false}
        selectsRange
        selected={startDate}
    />
  );
}

export default DoubleCalendar;