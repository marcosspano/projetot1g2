import React, {useState, useEffect}from 'react';
import "./style.css";
import ImageGallery from 'react-image-gallery';
import api from "../../../../services/api"

export default function Galery({id}) {

    const [listaImagens, setListaImagens] = useState([]);

    const getImg = async () => {
        await api.get(`/imagem/produto/${id}`)
        .then(response => setListaImagens(response.data))
        .catch((err) => console.error(err))
    }

    useEffect(() => {
        getImg();
    }, [])

    let image = [];
    function getDataImage(item) {
        listaImagens.map(({ url }) => {
            return (
                item.push({
                    original: `${url}`,
                    thumbnail: `${url}`,
                    originalHeight: "450px"
                })
            )
        })
        return item;
    }
    getDataImage(image);

    let imageMobile =[];
    function getDataImageMobile(item) {
        listaImagens.map(({ url }) => {
            return (
                item.push({
                    original: `${url}`,
                    thumbnail: `${url}`
                })
            )
        })
        return item;
    }
    getDataImageMobile(imageMobile);

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

    return (
        <>
            <div className="container-image">
                <div className="container-grid">
                    <div className="grid-container">
                        <div className="grid-img div-img1">
                            <img src={imageGalery[0]} alt="" />
                        </div>
                        <div className="grid-img div-img2">
                            <img src={imageGalery[1]} alt="" />
                        </div>
                        <div className="grid-img div-img3">
                            <img src={imageGalery[2]} alt="" />
                        </div>
                        <div className="grid-img div-img4">
                            <img src={imageGalery[3]} alt="" />
                        </div>
                        <div className="grid-img div-img5">
                            <img src={imageGalery[4]} alt="" />
                            <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Ver mais
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content">
                        <div className="modal-header">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">X</button>
                        </div>
                        <div className="modal-body"> 
                            <div className="div-galery">
                                < ImageGallery items={image} showIndex={true} showThumbnails={true}  showFullscreenButton={false} onErrorImageURL="link da imagem caso não ocorra o carregamento via backend" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="div-galery-mobile">
                <ImageGallery items={imageMobile} showIndex={true} showThumbnails={false} autoPlay={true} showFullscreenButton={false} showPlayButton={false}/>
            </div>
        </>
    )
}
