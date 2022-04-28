import { Container, Button } from 'react-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { CarInfo } from './CarInfo';
import { Attibutes } from './Attributes';
import { Images } from './Images';

import styled from './styles.module.scss';
import { ProductPolicies } from './ProductPolicies';
import { useForm, Controller } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import api from "../../services/api";


export function Admin() {

  const [attributes, setAttributes] = useState([]);
  const [images, setImages] = useState([]);

  const schema = yup.object({
    name_vehicle: yup.string().required("Campo obrigatório."),
    category: yup.string().required("Campo obrigatório."),
    // address: yup.string().required("Campo obrigatório."),
    description: yup.string().required("Campo obrigatório."),
    city: yup.string().required("Campo obrigatório."),
    car_rules: yup.string().required("Campo obrigatório."),
    cancel: yup.string().required("Campo obrigatório."),
    security: yup.string().required("Campo obrigatório."),
  });

  const { handleSubmit, register, formState: { errors }, control } = useForm({
    resolver: yupResolver(schema),
  });

  async function handleSubmitForm(data) {
    const dataUser = JSON.parse(localStorage.getItem("@SESSION"));
    console.log("DATA", data);
    console.log("IMAGES", images);
    console.log("attributes", attributes);
    const resgistrarReserva = await api.post('/produto', {
      nome: data.name_vehicle,
      descricao: data.description,
      cidade: {
        id: data.city
      },
      categoria: {
        id: data.category
      },
      caracteristicas: attributes,
      regras: data.car_rules,
      cancelar: data.cancel,
      seguranca: data.security,
      imagem: '',
      endereco: data.address
    }, {
      headers: {
        'Authorization': `Bearer ${dataUser.token}`
      }
    }).then((response) => {
      if (response.status === 200) {
        console.log(data.name_vehicle);
        api.get(`/produto/nome/${data.name_vehicle}`, {
          header: {
            'Authorization': `Bearer ${dataUser.token}`
          }
        }).then((response) => {
          if (response.status === 200) {

            let id = response.data.id;
            for (let i = 0; i <= images.length; i++) {
              api.post('/imagem', {
                url: images[i].url,
                produto: {
                  id: id
                }
              }, {
                header: {
                  'Authorization': `Bearer ${dataUser.token}`
                }
              }).then((response)=>{
                if (response.satus === 200){
                  Swal.fire(
                    'Produto criado com sucesso!',
                    ``,
                    'success'
                  )
                } else{
                  return (
                    Swal.fire(
                      'Houve um problema ao criar o seu produto!',
                      ``,
                      'error'
                    )
                  )
                }
              })
            }}
            return console.log("Falha ao buscar o id do produto")
          })

      } else {
        return console.log("Erro ao criar o produto!")
      }
    });
    return console.log("Criação de Produto Efetuada com sucesso!")
} 
  

const [dataCidades, setDataCidades] = useState([]);
const [dataCategorias, setDataCategorias] = useState([]);


const getCidades = async () => {
  await api.get('/cidade')
    .then(response => {
      const data1 = response.data.map(({ id, nome }) => {
        return {
          value: id, label: nome
        }
      })
      setDataCidades(data1)
    })
    .catch((err) => console.error(err));
}


const getCategorias = () => {
  api.get('/categoria')
    .then(response => {
      const data = response.data.map(({ id, titulo }) => {
        return {
          value: id, label: titulo
        }
      })
      setDataCategorias(data)

    })
    .catch((err) => console.error(err));
}

useEffect(() => {
  getCategorias()
  getCidades()
}, [])




return (
  <>
    <Container as="section" fluid className={`${styled.red} m-0 mb-5`}>
      <Container fluid className={`pb-2 pt-4 px-0 m-0 mx-auto max-width-1180`}>
        <h2 className="fs-4 font-600">Criar Veículo</h2>
      </Container>
      <Container fluid className={`py-3 m-0 mx-auto max-width-1180 rounded ${styled.container}`}>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <CarInfo Controller={Controller} control={control} register={register} errors={errors} category={dataCategorias} city={dataCidades} />
          <Attibutes setAttributes={setAttributes} attributes={attributes} />
          <ProductPolicies register={register} errors={errors} />
          <Images images={images} setImages={setImages} />
          <div className='d-flex justify-content-center align-items-center mt-5 mb-3'>
            <Button type='submit' className={`w-100 ${styled.max_width} text-white font-600`}>Criar</Button>
          </div>
        </form>
      </Container>
    </Container>
  </>
)
}