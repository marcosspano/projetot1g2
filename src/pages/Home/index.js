import React, { useState } from "react";
import Main from "./components/Main/Main";
import Search from "./components/Search/Search";
import { Helmet } from "react-helmet-async";
import { setInlineStyles } from "rsuite/esm/List/helper/utils";

function Home() {

    const [objeto, setObjeto] = useState({})

    function handleSaveData (data) {
                 
        setObjeto(data)

    }

    return (
        <>
            <Helmet>
                <title> Digital Booking | Home</title>
            </Helmet>
            <Search onSaveData={handleSaveData} />
            <Main props={objeto} />
        </>
    )
}

export default Home;