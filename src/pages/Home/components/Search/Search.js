import React, { useState, useEffect } from "react";
import DoubleCalendar from '../../../../components/DoubleCalendar';
import { Form, Button, Row, Col, Container, InputGroup} from 'react-bootstrap';
import {BsGeoAltFill} from "react-icons/bs";

import api from "../../../../services/api"
import apiGeolocation from "../../../../services/apiGeolocation";
import './style.css';


function Search({onSaveData}) {

    const [cidade, setCidade] = useState('');
    const [rangeReserva, setRangeReserva] = useState('');


    const [dataCidade, setDataCidade] = useState([]);
    const [listCidades, setListCidades] = useState([]);
    const [value, setValue] = useState([]);

    const sugestoes = document.querySelector('.sugestoesCidade')
    const inputCidade = document.querySelector('.inputCidade')

    const [latitudeGeolocation, setLatitudeGeolocation] = useState([]);
    const [longitudeGeolocation, setLongitudeGeolocation] = useState({});
    const [dadosGeolocation, setDadosGeolocation] = useState([]);


    const getCidades = async () => {
        await api.get('/cidade')
        .then(response => setDataCidade(response.data))
        .catch((err) => console.error(err))         
    }

const handleInputChange = (e) => {
    e.preventDefault();

    setValue(e.target.value);

   let listCidade = [];

    if (value.length >=2){
        dataCidade.map(({nome})=>{
            return (
                listCidade.push(nome)
            )
        });
        sugestoes.setAttribute('style', 'display:block')

    }else{
        sugestoes.setAttribute('style', 'display:none')
    }
    return (
        setListCidades(listCidade)
    )
}

function autoComplete(value) {
              const ListaCidades = listCidades;
            return ListaCidades.filter((item) => {
                    const i = item.toLowerCase()
                    const inputValue = value.toLowerCase()
                    return i.includes(inputValue)
              })
       }

const autoCompleteValores = autoComplete(value);

function getValueCidade(e){
    if (e.target.tagName === 'LI'){
    inputCidade.value = e.currentTarget.textContent;
    sugestoes.setAttribute('style', 'display: none');
    }
}

const handleSubmit = (e) => {
    e.preventDefault();

        setCidade(document.querySelector('.inputCidade').value)
        setRangeReserva(document.querySelector(".react-datepicker__input-container > input").value)
    
            const data = {
                cidade, rangeReserva
            }

            onSaveData(data)

            // console.log(cidade);
        
}


    const getLatLng = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {

                setLatitudeGeolocation(position.coords.latitude)
                setLongitudeGeolocation(position.coords.longitude)  

            }, (error) => {
                console.log(error)
            }, {enableHightAccuracy: true, maximumAge: 30000, timeout: 30000})
        } else {
            console.log('Ops, não foi possível pegar sua localização')
        }
    }

    // const getGeolocation = async () => {

    //     await apiGeolocation.get(`reverse?lat=${latitudeGeolocation}&lon=${longitudeGeolocation}&format=json`)
    //         .then(response => setDadosGeolocation(response.data))
    //         .catch(err => console.log(err)) 
        
    // }


    const clickGeolocation = () => {

        setCidade(dadosGeolocation.address.city)

        const data = {
            cidade, rangeReserva
        }

        onSaveData(data)

        inputCidade.value = cidade;

        //console.log(dadosGeolocation.address.);

    }

    useEffect(() => {
        
        getCidades();
        getLatLng();
        
        const getGeolocation = async () => {

            await apiGeolocation.get(`reverse?lat=${latitudeGeolocation}&lon=${longitudeGeolocation}&format=json`)
                .then(response => setDadosGeolocation(response.data))
                .catch(err => console.log(err)) 
            
        }

        getGeolocation();


    }, [latitudeGeolocation, longitudeGeolocation])


    return (
        <div className="div-search">
            <Container fluid >
                <div className="slogan" variant="primary">
                <h1 className="text-dark">Encontre os melhores carros mais próximos de você!!!</h1>
                </div>
            <Form  >
                <Row>
                    <Col md={5}>
                    <Form.Group className="mb-2">
                        <Form.Label >Cidade</Form.Label>
                        <InputGroup>

                        {/* Ícone de localização */}
                        <InputGroup.Text onClick={clickGeolocation} className="inputgroup"><BsGeoAltFill size="0.8em"/></InputGroup.Text>

                        <Form.Control size = "sm" className="inputCidade shadow-sm border-0 max-width-100" type="text" placeholder="Sua localização" onChange={handleInputChange} />
                        <ul className="sugestoesCidade">
                            {
                                autoCompleteValores.map((item)=>{
                                    return (
                                        <li key={autoCompleteValores.findIndex((i)=> i === item)}
                                        onClick={getValueCidade}>
                                            {item}
                                        </li>
                                       )})
                            }
                        </ul>
                        </InputGroup>
                    </Form.Group>
                    </Col>
                    <Col md={5}>
                    <Form.Group className="mb-1">
                    <Form.Label>Checkin | Checkout</Form.Label>
                    <div className="div-dcalendar">
                    <DoubleCalendar />
                    </div>
                    </Form.Group>  
                    </Col>
                    <Col md={2}>
                    <Form.Group className=" d-flex justify-content-center">
                    <Button className="button-search" onClick={handleSubmit}>
                        Buscar
                    </Button>
                    </Form.Group>
                    </Col>
                </Row>
            </Form>
        </Container >
        </div>
    )
}

export default Search;