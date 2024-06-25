"use client";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useState } from "react";
import { ConfirmToken } from "../../types";
import { confirmAccount } from "../../api/AuthAPI";
import { toast } from "react-toastify";

export default function ConfirmAccountView() {
    const [token, setToken] = useState<ConfirmToken["token"]>("");

    const {mutate} = useMutation({
        mutationFn: confirmAccount,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
        }
    })

  const handleChange = (token: ConfirmToken["token"]) => {
    setToken(token);
  };
  const handleComplete = (token: ConfirmToken["token"]) => {
    mutate({token}) //va con llaves porq el type de ConfirmToken es un objeto
  }

  return (
    <>
      <div className="bg-gray-800 min-h-screen">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-5xl font-black text-white">Confirma tu Cuenta</h1>
          <p className="text-2xl font-light text-white mt-5">
            Ingresa el código que recibiste {""}
            <span className=" text-fuchsia-500 font-bold"> por e-mail</span>
          </p>

          <form className="space-y-8 p-10 text-white  mt-10">
            <label className="font-normal text-2xl  text-center block">
              Código de 6 dígitos
            </label>
            <div className="flex justify-center gap-5">
              <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 broder placeholder-white text-black" />
                <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 broder placeholder-white text-black" />
                <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 broder placeholder-white text-black" />
                <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 broder placeholder-white text-black" />
                <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 broder placeholder-white text-black" />
                <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 broder placeholder-white text-black" />
              </PinInput>
            </div>
          </form>

          <nav className="mt-10 flex flex-col space-y-4">
            <Link
              to="/auth/new-code"
              className="text-center text-white font-bold"
            >
              Solicitar un nuevo Código
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
