import { Container, Row, Col } from 'react-bootstrap';

export function Politicas() {
  return (
    <Container as="section" fluid className="bg-light p-0">
      <Container fluid className="border-bottom border-primary border-2 p-0" >
        <Container fluid className="max-width-1180">
          <h2 className="fs-4 font-600 pt-3 pb-1">O que você precisa saber:</h2>
        </Container>
      </Container>
      <Container fluid className="max-width-1180 py-4">
        <Row>
          <Col sm={6} md={4} lg={4} xl={3} className="my-3">
            <h2 className="fs-5 mb-4 font-600">Regras do carro</h2>
            <div>
              <p className="fs-6">Entregar o carro limpo</p>
              <p className="fs-6">Não bater o carro</p>
              <p className="fs-6">Cuidado com a nave</p>
            </div>
          </Col>
          <Col sm={6} md={4} lg={4} xl={3} className="my-3">
            <h2 className="fs-5 mb-4 font-600">Segurança</h2>
            <div>
              <p className="fs-6">Use o cinto de segurança</p>
              <p className="fs-6">Respeite as leis de transito</p>
              <p className="fs-6">Respeite os pedestres</p>
            </div>
          </Col>
          <Col sm={6} md={4} lg={4} xl={3} className="my-3">
            <h2 className="fs-5 mb-4 font-600">Política de cancelamento</h2>
            <div>
              <p className="fs-6">Cancelar 2 dias da data de retirada do veiculo.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}