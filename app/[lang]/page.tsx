"use client"
import React, {useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import Container from "@/app/components/Container";
import CountryCard from "@/app/components/CountryCard";
import CountryCardSkeleton from "@/app/components/skeleton/CountryCard";
import Link from "next/link";
import {FaArrowLeft} from "react-icons/fa";

type CountryParams = {
  name: {
    common: string,
    official: string,
  }
  flags: {
    svg: string
  }
}

export default function SameLanguagePage() {
  const {lang} = useParams();
  const [countries, setCountries] = useState<CountryParams[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchCountries() {
      if (lang) {
        try {
          const response = await fetch(`https://restcountries.com/v3.1/lang/${lang}`);
          const data = await response.json();
          if (Array.isArray(data)) {
            setCountries(data);
          } else {
            setCountries([]);
            setError("Nenhum país encontrado");
          }
        } catch (error) {
          console.error(error);
          setError("Erro ao carregar países");
        } finally {
          setLoading(false);
        }
      }
    }
    fetchCountries()
  }, [lang])

  return (
  <Container>
    <div className="flex flex-col text-center text-2xl mt-16">
      {!loading ? (
        <>
          {!error && (<h1 className='text-4xl mb-5'>Outros países falantes do mesmo idioma</h1>)}
          <Link
            className='flex text-center items-center w-min mt-5 pl-6 pb-2' href='#'
            onClick={(e) => {
              e.preventDefault();
              router.back();
            }}>
            <FaArrowLeft className='mr-2'/>
            <p className='text-lg'>Voltar</p>
          </Link>
          <div className="w-full flex flex-wrap">
            {countries.length > 0 ? (
              countries.map((country) => (
                <div key={country.name.common} className="w-1/3 p-4">
                  <CountryCard country={country}/>
                </div>
              ))
            ) : (
              <p className="text-2xl text-red-500">{error}</p>
            )}
          </div>
        </>
      ) : (
        <div className="w-full flex flex-wrap">
          {Array(9).fill().map((_, index) => (
            <div key={index} className="w-1/3 animate-pulse p-4">
              <CountryCardSkeleton/>
            </div>
          ))}
        </div>
      )}
    </div>
  </Container>)

}