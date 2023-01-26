"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

function Validate(input) {
  let errors = {};
  if (input.name.length < 3 || input.name.length > 15) {
    errors.name = "Al menos 3 Caracteres";
  }
  if (input.lastName.length < 3 || input.lastName.length > 15) {
    errors.lastName = "Al menos 3 Caracteres";
  }
  if (input.cuit.length !== 13) {
    errors.cuit = "Ingrese su CUIT";
  }
  if (input.phone.length < 8) {
    errors.phone = "Ingrese su Telefono";
  }
  return errors;
}

export default function Crearong() {

  const router = useRouter();

  const [input, setInput] = useState({
    name: "",
    lastName: "",
    cuit: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const [image, setImage] = useState(null);

  const postONG = async(props) => {
    let info = await axios.post(`https://pf-backend-mercadosolidario-production.up.railway.app/ongs/newong`, props);
    return console.log(info.data)
  }

  const handleImage = (el) => {
    setImage(el.target.files[0]);
  };

  function handleChange(el) {
    setInput({
      ...input,
      [el.target.name]: el.target.value,
    });
    setErrors(
      Validate({
        ...input,
        [el.target.name]: el.target.value,
      })
    );
  }

  function handleSubmit(el, image) {
    try {
      el.preventDefault();
      setErrors(
        Validate({
          ...input,
          [el.target.name]: el.target.value,
        })
      );
      if (
        Object.values(errors).length === 0 &&
        input.name !== "" &&
        input.lastName !== "" &&
        input.cuit !== "" &&
        input.phone !== "" &&
        image
      ) {
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("lastName", input.lastName);
        formData.append("cuit", input.cuit);
        formData.append("rut", image);
        formData.append("phone", input.phone);
        //postONG(formData)
        alert("ONG Registrada con Exito!");
        setInput({
          name: "",
          lastName: "",
          cuit: "",
          phone: "",
        });
        setImage(null);
        router.push('/')
      } else {
        alert("Hay datos incorrectos o sin completar!");
      }
    } catch (error) {
      //console.log(error)
    }
  }

  console.log(input)
  console.log(image)

  return (
    <div>
      <div class="flex flex-col justify-center items-start m-auto min-h-full mt-16 bg-white w-3/5">
        <div className="text-2xl font-montserrat justify-items-start w-full">
          <h1 class="text-start">Formulario para Registro de ONG</h1>
        </div>
        <form class="pt-7" onSubmit={(el) => handleSubmit(el, image, input)}>
          <div class="flex">
            <div class="flex flex-col font-medium">
              <div class="flex flex-col">
                <label class="font-hind text-lg">Nombre del titular</label>
                <input
                  class="border border-slate-400 mr-9 mt-1 h-10 w-72 rounded"
                  type="text"
                  value={input.name}
                  name={"name"}
                  onChange={(el) => handleChange(el)}
                  placeholder=""
                />
                {errors.name ? <label>{errors.name}</label> : null}
              </div>
              <div class="flex flex-col">
                <label class="pt-3 font-hind text-lg">
                  Apellido del titular
                </label>
                <input
                  class="border border-slate-400 mr-9 mt-1 h-10 w-72 rounded"
                  type="text"
                  value={input.lastName}
                  name="lastName"
                  onChange={(el) => handleChange(el)}
                  placeholder=""
                />
                {errors.lastName ? <label>{errors.lastName}</label> : null}
              </div>
              <div class="flex flex-col">
                <label class="pt-3 font-hind text-lg">Cuit de la ONG</label>
                <input
                  class="border border-slate-400 mr-9 mt-1 h-10 w-72 rounded"
                  type="text"
                  value={input.cuit}
                  name="cuit"
                  onChange={(el) => handleChange(el)}
                  placeholder=""
                />
                {errors.cuit ? <label>{errors.cuit}</label> : null}
              </div>
            </div>
            <div>
              <div class="flex flex-col">
                <label class="font-hind text-lg">
                  Registro Unico Tributario
                </label>
                <input
                  class="border border-slate-400 mr-9 mt-1 h-10 w-72 rounded"
                  type="file"
                  name="image"               
                  onChange={(el) => handleImage(el)}
                />
                {image === null ? <label>{'Ingrese el Archivo'}</label> : null}
              </div>
              <div class="flex flex-col font-medium">
                <label class="pt-3 font-hind text-lg">Telefono</label>
                <input
                  class="border border-slate-400 mr-9 mt-1 h-10 w-72 rounded"
                  type="text"
                  value={input.phone}
                  name="phone"
                  onChange={(el) => handleChange(el)}
                  placeholder=""
                />
                {errors.phone ? <label>{errors.phone}</label> : null}
              </div>
            </div>
          </div>
          <input
            type="submit"
            value={"Registrar ONG"}
            class="mt-8 w-52 h-10 bg-blue-600 rounded-md text-white font-hind"
          />
        </form>
      </div>
    </div>
  );
}
