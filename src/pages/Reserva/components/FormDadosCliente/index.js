import React from 'react';
import { Container, Form } from 'react-bootstrap';


import "./style.css";

export default function FormsCliente({data, setCnhValue}) {

    function getCnhValue(){
        const inputCnh = document.getElementById('inputCnhValue').value
        setCnhValue(inputCnh);
    }

    return (
        <>
            <div className="container-form">
                <h2 className="d-block  text-primary fs-4 font-500">Complete seus dados</h2>
                <Container
                    className="  justify-content-center align-items-center">
                    <Form className="div-form">
                        <Form.Group className="div-nome">
                            <Form.Label className="font-size-15">Nome</Form.Label>
                            <Form.Control className='shadow-sm mb-2 border border-white' type="text" placeholder={data.user.name} disabled />
                        </Form.Group>
                        <Form.Group className="div-nome">
                            <Form.Label className="font-size-15">Sobrenome</Form.Label>
                            <Form.Control className='shadow-sm mb-2 border border-white' type="text" placeholder={data.user.lastname} disabled />
                        </Form.Group>
                        <Form.Group className="div-nome">
                            <Form.Label className="font-size-15">E-mail</Form.Label>
                            <Form.Control className='shadow-sm mb-2 border border-white' type="email" placeholder={data.user.email} disabled />
                        </Form.Group>
                        <Form.Group className="div-nome">
                            <Form.Label className="font-size-15">CNH</Form.Label>
                            <Form.Control className='shadow-sm mb-2 border border-white'id="inputCnhValue" type="text" placeholder="Nº de registro da cnh" onChange={getCnhValue}/>
                        </Form.Group>
                    </Form>
                </Container>
            </div>
        </>
    )
}
