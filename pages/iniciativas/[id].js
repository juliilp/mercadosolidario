"use client"
import React, { useEffect, useState } from 'react'
import Paypal from '@/Components/Paypal';
import Image from 'next/image';
import moment from 'moment/moment';
import Alert from "@/Components/Alert.jsx";
import axios from 'axios';

const Detail = ({ data }) => {
  const [info, setInfo] = useState()

  useEffect(() => {
    async function fetchData() {
      console.log(data.authorId)
      const ong = await axios('http://localhost:3001/ong/' + data.authorId)
      console.log(ong)
      setInfo(ong.data)
    }

    fetchData();
  }, [])

  const toggle = () => {
    const $modal = document.getElementById('defaultModal')

    if($modal.classList.contains('hidden')){
      $modal.classList.remove('hidden')
    }else{
      $modal.classList.add('hidden')
    }
  } 
   return (
    <div className='grid gap-8 max-w-3xl w-full m-auto gap-8 my-8 p-8'>
      <img className='rounded m-auto w-full aspect-video object-cover' src={data.image} alt={data.title}></img>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <span className="px-2 py-1 rounded bg-pink-400 text-white">{data.type_of_help[0].toUpperCase() + data.type_of_help.slice(1)}</span> {/* UpperCase first letter */}
          <span className="text-sm dark:text-gray-400">{moment().startOf(data.expirationDate).fromNow()}</span>
        </div>
        <h2 className="text-5xl font-bold">{data.title}</h2>
        <span className='text-gray-400'>📍{data.province}</span>
        <p className="mt-2">{data.description}</p>
        {
          data.type_of_help === 'efectivo' ? 
          <Paypal postId={data.id}></Paypal> :
          data.type_of_help === 'servicio' ? 
          <div>
            <button data-modal-target="defaultModal" data-modal-toggle="defaultModal" class="block text-white bg-pink-400 hover:bg-pink-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="button" onClick={() => toggle()}>
              Paso a paso
            </button>
            <div id="defaultModal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 hidden z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full absolute h-screen flex justify-center items-center">
                <div class="relative w-full h-full max-w-2xl md:h-auto">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                Proceso de voluntariado
                            </h3>
                            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal" onClick={() => toggle()}>
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                <span class="sr-only"></span>
                            </button>
                        </div>
                        <div class="p-6 space-y-6">
                            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Para poder ser voluntario en esta causa deberás registrarte, una vez estés registrado, deberas contactarte con la ONG la cual publicó esta causa, la cual te dará todos los detalles de adonde deberás dirigirte para ser voluntario.
                            </p>
                            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Una vez que sepas todos los datos para ser voluntario, deberás dirigirte al lugar de encuentro con el representante de la ONG, el cual te dirá que escanees un codigo QR, lo escanearas con el lector el cual se encuentra <a className='text-pink-400' rel="noreferrer" target = '_blank' href='https://mercadosolidario.vercel.app/perfil/qr'>en esta sección</a>. Cuando lo escanees y salgo todo correcto, se confirmará tu participación en esta causa y podrás verlo en la sección 'iniciativas'. Además se te otorgará una medalla al confirmar tu participación la cual verás en tu perfil y te llegará un Email informandote de tu actualizacion de perfil.  
                            </p>
                        </div>
                        <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <a data-modal-hide="defaultModal" href={`https://wa.me/${info ? info.phone : '3865559022'}/Hola%20me%20contacto%20contigo%20porque%20vi%20la%20publicacion%20en%20Mercado%20Solidario%20.Quiero%20saber%20que%20debo%20hacer%20para%20ser%20voluntario%20en%20la%20causa%20$${data.title}%20de%20la%20ONG%20${info ? info.ongName : ''}`} rel="noreferrer" target = '_blank' type="button" class="cursor-pointer text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Contactar con ONG</a>
                        </div>
                    </div>
                </div>
            </div>
          </div> :
          <div>
          <button data-modal-target="defaultModal" data-modal-toggle="defaultModal" class="block text-white bg-pink-400 hover:bg-pink-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="button" onClick={() => toggle()}>
            Paso a paso
          </button>
          <div id="defaultModal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 hidden z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full absolute h-screen flex justify-center items-center">
              <div class="relative w-full h-full max-w-2xl md:h-auto">
                  <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                              Proceso de donacion en especie
                          </h3>
                          <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal" onClick={() => toggle()}>
                              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                              <span class="sr-only"></span>
                          </button>
                      </div>
                      <div class="p-6 space-y-6">
                          <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                              Para poder ser donante en especie para esta causa deberás registrarte, una vez estés registrado, deberas contactarte con la ONG la cual publicó esta causa, la cual te dará todos los detalles de adonde deberás dirigir el paquete de donacion.
                          </p>
                          <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                              Una vez que sepas todos los datos, deberás dirigirte al lugar de encuentro con el representante de la ONG, el cual te dirá que escanees un codigo QR, lo escanearas con el lector el cual se encuentra <a className='text-pink-400' rel="noreferrer" target = '_blank' href='https://mercadosolidario.vercel.app/perfil/qr'>en esta sección</a>. Cuando lo escanees y salgo todo correcto, se confirmará tu participación en esta causa y podrás verlo en la sección 'iniciativas'. Además se te otorgará una medalla al confirmar tu participación la cual verás en tu perfil y te llegará un Email informandote de tu actualizacion de perfil.  
                          </p>
                      </div>
                      <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                          <a data-modal-hide="defaultModal" rel="noreferrer" href={`https://wa.me/${info ? info.phone : '3865559022'}/Hola%20me%20contacto%20contigo%20porque%20vi%20la%20publicacion%20en%20Mercado%20Solidario%20.Quiero%20saber%20que%20debo%20hacer%20para%20ser%20voluntario%20en%20la%20causa%20$${data.title}%20de%20la%20ONG%20${info ? info.ongName : ''}`}  target = '_blank' type="button" class="cursor-pointer text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Contactar con ONG</a>
                      </div>
                  </div>
              </div>
          </div>
        </div>
        }
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const res = await fetch("https://pf-backend-mercadosolidario-production.up.railway.app/posts")
  const data = await res.json()
  const paths = data.map(({ id }) => ({ params: { id: `${id}` } }))
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const all = await fetch(`https://pf-backend-mercadosolidario-production.up.railway.app/posts/${params.id}`)
    .then(res => res.json())
    .then(data => {
      return {
        props: {
          data
        }
      }
    })
  return all
}



export default Detail
