import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button, Container, Spinner, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "react-bootstrap";
import * as yup from "yup";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

import { Input } from "../../components/Input";
import { InputPassword } from "../../components/InputPassword";
import { BoxForm } from "../../components/Form";

import api from "../../services/api";
import { useSession } from "../../hooks/useSession";
import { useState } from "react";

export function Login() {
  const { createSession } = useSession();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  function fechar(){
    if(location.state) {
      navigate(-1)
    } else {
      navigate("/");
    }
  }
  console.log(location);

  const schema = yup.object({
    email: yup.string().email("Digite um e-mail valido.").required("Campo obrigatório."),
    password: yup.string().min(6, "Mínimo de 6 dígitos.").required("Campo obrigatório.")
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  async function handleSubmitForm(value) {
    setIsLoading(true);
      try{
        const responseToken = await api.post("/login", {
          email: value.email,
          senha: value.password,
        });

        const responseUsers = await api.get('/usuario', {
          headers:{
            'Authorization': `Bearer ${responseToken.data}` 
          }
        });

        const filterUser = responseUsers.data.filter(user => user.email === value.email);

        const {nome, sobrenome, id, email, funcao} = filterUser[0];

        const user = {
          token: responseToken.data,
          user: {
            id,
            name: nome,
            lastname: sobrenome,
            email,
            credentialAcess: funcao

          }
        }

        createSession(user);

        Swal.fire(
          'Login realizado com sucesso!',
          '',
          'success'
        );

        if(location.state) {
          navigate(location.state.from.pathname)
        } else {
          navigate("/");
        }
        
      }catch(error) {
        setIsLoading(false);
        setIsError(true);
        // console.log("Erro ao autenticar o usuario!", error);
      }

      // try{
      //   await api.get('/usuario',{
      //     headers:{
      //      'Authorization': `Bearer ${temporaryToken}` 
      //     }
      //   }).then((response) => setListUsuarios(response.data))
    
      //   console.log(listUsuarios);
        
      //   // 2 - Fazer o filter [] (??)
      //   // falta fazer o filter * 
      //   // seria interessante alterar no back o 
      //   // retorno da api para somente um usuario, usando o 
      //   // email para comparar, assim não seria necessario fazer o 
      //   // filter e expor dados de outros usuarios.

      //   let data = {
      //     user: {
      //       name: "Brunno",
      //       lastname: "Faria"
      //     }
      //   }

      //   createSession(data);
      //   Swal.fire(
      //     'Login realizado com sucesso!',
      //     '',
      //     'success'
      //   )
      //   navigate("/");
     
      // }catch(error){
      //   console.log("Erro ao buscar o usuario!", error)
      // }
  }

  return (
    <>
      <Helmet>
        <title> Digital Booking | Login</title>
      </Helmet>
      <Container
        className="
        d-flex
        min-height-100
        justify-content-center
        align-items-center"
      >
        <BoxForm handleSubmit={handleSubmit} dataForm={handleSubmitForm}>
        <Form.Text
          as="p"
          className="d-block text-primary text-center fs-2 font-500 mb-4"
        >
          Iniciar Sessão
        </Form.Text>
        {isError && (
          <Alert variant="danger" className="py-2 text-center">
            e-mail ou senha inválidos.
          </Alert>
        )}
        <Input
          type="text"
          name="email"
          label="E-mail"
          register={register}
          error={errors.email}
        />

        <InputPassword
          name="password"
          label="Senha"
          register={register}
          error={errors.password}
        />

        <Button
          className="w-100 text-white fw-bold mt-4"
          variant="primary"
          type="submit"
          disabled={isLoading ? true : false}
          // onClick={handleSubmit}
        >
          {isLoading ? <Spinner animation="grow" size="sm" /> : "Entrar"}
        </Button>
        <Form.Text className="text-center d-block text-secondary mt-3">
          Ainda não tem conta?
          <Link
            className="text-decoration-none font-500 text-primary"
            to="/register"
          >
            {" "}
            Registre-se
          </Link>
        </Form.Text>
        </BoxForm>

        <Button onClick={fechar} className="fechar__Login" to="/">
          {" "}
          X{" "}
        </Button>
      </Container>
    </>
  );
}

// import { Link } from "react-router-dom";
// import { Button, Container } from 'react-bootstrap';
// import { useForm } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup';
// import { Form } from 'react-bootstrap';
// import * as yup from 'yup';

// import { Input } from '../../components/Input';
// import { InputPassword } from '../../components/InputPassword';
// import { BoxForm } from "../../components/Form";

// export function Login() {
//   const schema = yup.object({
//     email: yup.string().email("Digite um e-mail valido.").required("Campo obrigatório."),
//     password: yup.string().min(6, "Mínimo de 6 dígitos.").required("Campo obrigatório.")
//   });

//   const { register, handleSubmit, formState: { errors } } = useForm({
//     resolver: yupResolver(schema),
//   });

//   function dataForm(data) {
//     console.log(data)
//   }

//   return (
//     <>
//     <Container
//       className="
//         min-height-100
//         d-flex
//         justify-content-center
//         align-items-center"
//     >
//       <BoxForm handleSubmit={handleSubmit} dataForm={dataForm}>
//         <Form.Text
//           as="p"
//           className="d-block text-primary text-center fs-2 font-500 mb-5"
//         >
//           Iniciar Sessão
//         </Form.Text>
//         <Input type="text" name="email" label="E-mail" error={errors?.email} register={register}/>

//         <InputPassword name="password" label="Senha" error={errors?.password} register={register}/>

//         <Button className="w-100 text-white fw-bold mt-4" variant="primary" type="submit">
//           Entrar
//         </Button>
//         <Form.Text className="text-center d-block text-secondary mt-3">
//           Ainda não tem conta?
//           <Link className="text-decoration-none" to="/register"> Registre-se</Link>
//         </Form.Text>
//       </BoxForm>
//     </Container>
//     </>
//   )
// }
