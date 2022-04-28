import React, { useEffect, useState } from "react";
import { Calendar } from "../Detalhes/components/Calendar";
import BannerInfo from "./components/BannerInfo";
import DetalhesReserva from "./components/DetalheReserva";
import FormHoraReserva from "./components/HoraReserva";
import { Politicas } from "../Detalhes/components/Politicas";
import { useParams } from "react-router-dom";
import api from "../../services/api";

import "./style.css";
import FormsCliente from "./components/FormDadosCliente";

export default function Reserva() {
  const { id } = useParams();
  const [produto, setProduto] = useState({});
  let selected = true;
  const dataUser = JSON.parse(localStorage.getItem("@SESSION"));

  const [horaReserva, setHoraReserva] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const dates = [startDate, endDate];
  const [cnhValue, setCnhValue] = useState();


  useEffect(() => {
    async function getProduto() {
      await api.get(`/produto/id/${id}`)
        .then(response => setProduto(response.data))
    }
    getProduto();
  }, []);

  if (!produto.nome) {
    return null;
  }


  return (
    <>
      <section>
        <BannerInfo categoria={produto.categoria.titulo} nome={produto.nome} id={id} />
      </section>
      <section className="body-reserva">
        <section className="main-reserva">
          <div className="section-form">
            <FormsCliente data={dataUser} setCnhValue={setCnhValue} />
          </div>
          <div>
            <div className="div-calendar">
              <h2 className=" text-primary fs-4 font-500 mb-4">Selecione a data da reserva</h2>
              <Calendar selected={selected} setStartDate={setStartDate} setEndDate={setEndDate} startDate={startDate} endDate={endDate} id={id} token={dataUser.token} />
            </div>
          </div>
          <div>
            <FormHoraReserva horaReserva={setHoraReserva} />
          </div>
        </section>
        <section className="section-detalhe-reserva">
          <DetalhesReserva id={id} token={dataUser.token} nome={produto.nome} categoria={produto.categoria.titulo} cidade={produto.cidade.nome} pais={produto.cidade.pais} horario={horaReserva} datas={dates} userID={dataUser.user.id} cnh={cnhValue} endereco={produto.endereco}/>
        </section>
      </section>
      <section>
        <Politicas />
      </section>
    </>
  );
}
