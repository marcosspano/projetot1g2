import React, { useState }from "react";

import './style.css';

import 'rsuite/dist/rsuite.css';
import { DateRangePicker } from 'rsuite';


function DoubleCalendar() {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
    var sizeScreen = 2;
    if (window.screen.availWidth < 768){
      sizeScreen = 1;
    } else{
      sizeScreen = 2
    }

  console.log(sizeScreen)

  return (
    
    <DateRangePicker
      appearance="default" 
      format="dd/MM/yyyy hh:mm aa"
      startDate={startDate}
      endDate={endDate}
      onChange={update => {setDateRange(update)}}
      placeholder="Selecione um intervalo"
      size="sm"
      showMeridian />

  );
}

export default DoubleCalendar;