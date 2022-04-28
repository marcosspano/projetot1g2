import { Col, Container, Row, Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { useState } from "react";

import { MdOutlineAdd, MdOutlineClose } from 'react-icons/md';

import styled from './styles.module.scss';

export function Attibutes({ attributes, setAttributes }) {
  const [id, setId] = useState("");
  const [errorNome, setErrorNome] = useState("");

  function handleAddAttribute() {
    let error = false;

    if (id.length === 0) {
      setErrorNome("Campo Obrigatório");
      error = true;
    }



    if (error) return;

    setErrorNome("");
    setId("");

    const newAttribute = {
      id
    }

    setAttributes([...attributes, newAttribute]);
    console.log(attributes)
  }

  function handleDeleteAttribute(id) {
    const attibutesFilter = attributes.filter(item => item.id !== id);
    setAttributes(attibutesFilter);
  }

  return (
    <Container fluid className="m-0 mt-4">
      <h2 className="fs-5 font-600">Adicionar Atributos</h2>



      {attributes?.map((attributes) => (
        <Container fluid className={`m-0 px-4 py-3 rounded mb-2 ${styled.background}`}>
          <Row key={attributes.id}>
            <Col xs={10} sm={11} md={7}>
              <Container fluid className="m-0 p-0 mb-2">
                <Form.Select htmlFor="description"  className={`m-0 p-0 w-100 rounded ${styled.shadow_input}`} onChange={(e) => setId(e.target.value)} value={attributes.id} disabled id="name">
                    <option>Selecione o atributo</option>
                  <option value="1"> Ar condicionado</option>
                  <option value="2"> Dir. hidraulica</option>
                  <option value="3"> Vidro elétrico</option>
                  <option value="4"> Trava elétrica</option>
                  <option value="5"> Air bag</option>
                  <option value="6"> 4 portas</option>
                  <option value="7"> 2 portas</option>
                  <option value="8"> Mala pequena</option>
                  <option value="9"> Mala grande</option>
                  <option value="10"> ABS</option>
                  <option value="11"> 5 pessoas</option>
                  <option value="12"> Automático</option>
                  <option value="13"> Semi automático</option>
                  <option value="14"> Acelerador e freio manual</option>
                  <option value="15"> Inversor de Pedal Acelerador</option>
                  <option value="16"> Pomo giratório removível</option>
                  <option value="17"> Banco de Couro</option>
                  <option value="18"> Diesel</option>
                  <option value="19"> Cabine Dupla</option>
                  <option value="20"> Tração 4x4</option>
                  <option value="21"> Encosto de cabeça traseiro</option>
                  <option value="22"> Desembaçador traseiro</option>
                  <option value="23"> Alarme</option>
                  <option value="24"> Aquecedor</option>
                  <option value="25"> Computador de bordo</option>
                  <option value="26"> Rodas de liga leve</option>
                  <option value="27"> Teto solar</option>
                  <option value="28"> Protetor de caçamba</option>
                  <option value="29"> Rádio</option>
                  <option value="30"> Retrovisores elétricos</option>
                  <option value="31"> Sensor de chuva</option>
                  <option value="32"> Sensor de estacionamento</option>
                  <option value="33"> Capota marítima</option>
                  <option value="34"> GPS</option>
                  <option value="35"> DVD Player</option>
                  <option value="36"> CD Player</option>               
                </Form.Select>
                
              </Container>
            </Col>

            <Col xs={2} sm={1} md={1} className="p-0">
              <div className="w-100 h-100 d-md-flex justify-content-end align-items-end pb-md-2">
                <Button
                  className="p-0 m-0 bg-secondary border-0"
                  onClick={() => handleDeleteAttribute(attributes.id)}>
                  <MdOutlineClose color="#ffffff" size={34} />
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      ))}





      <Container fluid className={`m-0 px-4 py-3 rounded ${styled.background}`}>
        <Row>
          <Col sm={10} md={11} xs={10}>
            <Container fluid className="m-0 p-0 mb-2">
              <Form.Select aria-label="Default select example"  htmlFor="description" className={`m-0 p-0 w-100 rounded ${styled.shadow_input}`} onChange={(e) => setId(e.target.value)} id="name">
                  <option>Selecione o atributo</option>
                  <option value="1"> Ar condicionado</option>
                  <option value="2"> Dir. hidraulica</option>
                  <option value="3"> Vidro elétrico</option>
                  <option value="4"> Trava elétrica</option>
                  <option value="5"> Air bag</option>
                  <option value="6"> 4 portas</option>
                  <option value="7"> 2 portas</option>
                  <option value="8"> Mala pequena</option>
                  <option value="9"> Mala grande</option>
                  <option value="10"> ABS</option>
                  <option value="11"> 5 pessoas</option>
                  <option value="12"> Automático</option>
                  <option value="13"> Semi automático</option>
                  <option value="14"> Acelerador e freio manual</option>
                  <option value="15"> Inversor de Pedal Acelerador</option>
                  <option value="16"> Pomo giratório removível</option>
                  <option value="17"> Banco de Couro</option>
                  <option value="18"> Diesel</option>
                  <option value="19"> Cabine Dupla</option>
                  <option value="20"> Tração 4x4</option>
                  <option value="21"> Encosto de cabeça traseiro</option>
                  <option value="22"> Desembaçador traseiro</option>
                  <option value="23"> Alarme</option>
                  <option value="24"> Aquecedor</option>
                  <option value="25"> Computador de bordo</option>
                  <option value="26"> Rodas de liga leve</option>
                  <option value="27"> Teto solar</option>
                  <option value="28"> Protetor de caçamba</option>
                  <option value="29"> Rádio</option>
                  <option value="30"> Retrovisores elétricos</option>
                  <option value="31"> Sensor de chuva</option>
                  <option value="32"> Sensor de estacionamento</option>
                  <option value="33"> Capota marítima</option>
                  <option value="34"> GPS</option>
                  <option value="35"> DVD Player</option>
                  <option value="36"> CD Player</option>     
              </Form.Select>
             
              <Form.Text className="text-danger">{errorNome && errorNome}</Form.Text>
            </Container>
          </Col>
          <Col sm={2} md={1} xs={2} className="p-0">
            <div className="w-100 h-100 d-flex justify-content-end align-items-end pb-2">
              <Button className="p-0 m-0" onClick={handleAddAttribute}><MdOutlineAdd color="#ffffff" size={34} /></Button>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}