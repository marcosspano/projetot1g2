import React,{useState, useEffect} from 'react';
import "./style.css";
import { BsGeoAltFill } from "react-icons/bs";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { useNavigate } from "react-router-dom";

import api from "../../../../services/api";

export default function DetalhesReserva({id, token, nome, categoria, cidade, pais , horario, datas, userID, cnh, endereco}) {

  const [listaImagens, setListaImagens] = useState([]);
  const [dataReserva, setDataReserva] = useState('__/__/____');
  const [dataDevolucao, setDataDevolucao] = useState('__/__/____');
  const navigate = useNavigate();

  const dataReservaTransform = async () => {
    await datas;
    if (datas[0] === undefined && datas[1] === undefined){
      return null;
    } else {
    setDataReserva(new Intl.DateTimeFormat('pt-BR').format(datas[0]));
    setDataDevolucao(new Intl.DateTimeFormat('pt-BR').format(datas[1]));
    }
  }

  dataReservaTransform();


  const getImg = async () => {
    await api.get(`/imagem/produto/${id}`)
    .then(response => setListaImagens(response.data))
    .catch((err) => console.error(err))
}

useEffect(() => {
    getImg();
}, [])

let imageGalery = [];
    function getImageGalery(item) {
        listaImagens.map(({ url }) => {
            return (
                item.push(url)
            )
        })
        return item;
    }
    getImageGalery(imageGalery);

    async function criarReserva(){
      let dataBancoReserva = new Intl.DateTimeFormat("fr-CA", {year: "numeric", month: "2-digit", day: "2-digit"}).format(datas[0]);
      let dataBancoDevolucao = new Intl.DateTimeFormat("fr-CA", {year: "numeric", month: "2-digit", day: "2-digit"}).format(datas[1]);

      const reserva = {
        horaReserva: `${horario[0]}`,
        horaDevolucao: `${horario[1]}`,
        inicioReserva: dataBancoReserva,
        fimReserva: dataBancoDevolucao,
        cnh: `${cnh}`,
        produto:{
          id:`${id}`
        },
        usuario:{
          id:`${userID}`
        }
      }

      try{
        const resgistrarReserva = await api.post('/reserva', reserva, {
          headers:{
            'Authorization': `Bearer ${token}` 
          }
        })
        if ( resgistrarReserva.status === 200){
          Swal.fire(
            'Reserva criada com Sucesso!',
            ``,
            'success'
          ).then((result)=>{
            if (result.isConfirmed){
              navigate(`/produto/detalhes/${id}`);
            }
          })
        }
      }catch(error){
        Swal.fire(
          'Ocorreu um problema!',
          `Tente novamente! `,
          'error'
        )
        console.log("Erro ao criar a reserva", error)
      }
      
    }

  return (
    <>
      <div className="div-detalhes">
        <h2 className=" text-primary fs-4 font-500">Detalhes da reserva</h2>
        <div className="detalhesImg">
          <img src={imageGalery[0]} alt="" />
        </div>
      </div>
      <div className="detalhesDados-reserva">
          <div className="div-titulo">
            <h5>{categoria}</h5>
            <h4>{nome}</h4>
          </div>
          <div className="div-endereco">
            <div>
              <BsGeoAltFill color="#FBC02D" />
            </div>
            <div className="div-info">
              <p className="localiz">{cidade}, {pais}</p>
              <p className="info-add">{endereco}</p>
            </div>
          </div>
        </div>
      <div className="detalhes-data-reserva">
          <div className="data-hora-checkin">
            <h5>
            check in
            </h5>
            <p>
            {dataReserva} {horario[0]}
            </p>
          </div>
          <div className="data-hora-checkout">
            <h5>
            check out
            </h5>
            <p>
            {dataDevolucao} {horario[1]}
            </p>
          </div>
        </div>
      <div className="div-button-reserva">
          {/* <Link to={`/`}> */}
            <button onClick={criarReserva} className="button-confirm-reserva">Confirmar reserva</button>
          {/* </Link> */}
        </div>
    </>
  )
}
