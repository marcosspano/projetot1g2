import React from 'react';
import { Items } from './components/Items';
import { Map } from './components/Mapa';
import { Politicas } from './components/Politicas';
import { Calendar } from './components/Calendar';
import { Descricao } from './components/Descricao';
import InfoProduto from './components/InfoProduto';
import styled from "./components/Calendar/styles.module.scss";
import { Container } from 'react-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

import { useSession } from '../../hooks/useSession';
import { useParams, useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../services/api';
import Galery from './components/Galery';


function Detalhes() {
  const { id } = useParams();
  const { session } = useSession();
  let navigate = useNavigate();



  const [produto, setProduto] = useState({});

  function UserLoged(){


    return session.user ? (navigate(`/reserva/produto/${id}`)) :  (
    Swal.fire({
      icon:  'info',
      iconColor:'#FBC02D',
      title: 'Você precisa estar logado!',
      text: 'Para criar uma reserva faça login ou crie uma conta',
      showDenyButton: true,
      focusConfirm: false,
      confirmButtonText: 'Login',
      confirmButtonColor:'#FBC02D',
      denyButtonText: `Criar conta`,
      denyButtonColor: '#263238',
      showCloseButton: true
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        navigate(`/reserva/produto/${id}`)
      } else if (result.isDenied) {
        navigate('/register')
      }
    }) 
    );
  }

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
      <InfoProduto nome={produto.nome} categoria={produto.categoria.titulo} cidade={produto.cidade.nome} pais={produto.cidade.pais} endereco={produto.endereco}/>
      <Galery id={id}/>
      <Descricao descricao={produto.descricao} />
      <Items caracteristicas={produto.caracteristicas} />
      <h2 className="fs-4 font-600 m-3">Datas disponíveis</h2>
      <Container as="section" fluid className="max-width-1180 py-4">
        <Container fluid className={`${styled.container} p-0`}>
          <Calendar />
          <div className={styled.box_info}>
            <div>
              <p className="font-500 my-3">Deseja reservar este produto?</p>
              <button className="font-500" onClick={UserLoged}>Iniciar Reserva</button>
            </div>
          </div>
        </Container>
      </Container>
      <Map localizacao={produto.cidade}/>
      <Politicas />
    </>
  )
}

export default Detalhes;

