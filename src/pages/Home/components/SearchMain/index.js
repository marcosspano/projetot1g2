import React from "react";
import { Link } from "react-router-dom";

import api from '../../../../services/api';
import { useState, useEffect } from 'react';

import './style.css';

function SearchMain ({props, listaProdutos, listaImagens}) {


    console.log(props.cidade)


    return (
            <div className="main__Container">
                <div className="blocoLista">

                    <h3>
                        Resultado: {listaProdutos.filter(valorCidade => valorCidade.cidade.nome == props.cidade).length} registros encontrados
                    </h3>

   
                    {listaProdutos.filter(valorCidade => valorCidade.cidade.nome == props.cidade).map(({ id, nome, descricao, cidade, categoria }) => {

                        return (
                            <div className="cartao" key={id}>
                                {
                                    localStorage.getItem('@SESSION') === 'null' || !localStorage.getItem('@SESSION') ? '' : <span className="heart"></span>
                                }
                                
                                <span className="nota">8.0</span>

                                <div className="cartaoImg">
                                    {listaImagens.filter(iLista => iLista.produto.id === id).slice(0, 1).map(({ id, url }) => {
                                        return (<img src={url} key={id} alt="" />)
                                    })}
                                </div>

                                <div className="cartaoDados">
                                    <span>{categoria.titulo}</span>
                                    <h4>{nome}</h4>
                                    <p>{cidade.nome}</p>
                                    <p>{ descricao.length > 57 ? descricao.slice(0, 57) + "..." : descricao } </p>
                                    <Link to={`/produto/detalhes/${id}`}>
                                        <button >Ver descrição</button>
                                    </Link>
                                </div>

                            </div>
                        )
                    })}

                </div>
            </div>
    )
}

export default SearchMain;