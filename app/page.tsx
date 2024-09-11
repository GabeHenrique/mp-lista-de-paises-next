'use client'
import Container from "@/app/components/Container";
import React, {useEffect} from "react";
import Search from "@/app/components/Search";
import CountryCard from "@/app/components/CountryCard";
import CountryCardSkeleton from "@/app/components/skeleton/CountryCard";
import Image from "next/image";
import {ApisController, CountryResume} from "@/app/controller/apisController";

export default function HomePage() {
  const [countries, setCountries] = React.useState<CountryResume[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const apis = new ApisController();

  useEffect(() => {
    async function handleFindCountries() {
      try {
        const data = await apis.findAll();

        if (Array.isArray(data)) {
          setCountries(data);
        } else {
          setCountries([]);
          setError("Nenhum país encontrado.");
        }
      } catch (e) {
        console.error(e);
        setError("Erro ao carregar os países.");
      } finally {
        setLoading(false);
      }
    }

    handleFindCountries();
  }, []);

  const onSearch = async (searchValue: string) => {
    if (searchValue.length > 0) {
      setLoading(true);
      setError(null);
      try {
        const data = await apis.searchByName(searchValue);

        if (Array.isArray(data)) {
          setCountries(data);
        } else {
          setCountries([]);
          setError("Nenhum país encontrado.");
        }
      } catch (e) {
        console.error(e);
        setError("Erro ao buscar os países.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Container>
      <div className='flex flex-col items-center justify-center'>
        <div className='relative w-full h-80 mt-2'>
          <Image
            src="/assets/banner.jpg"
            alt="Logo"
            fill
            className='object-cover rounded-2xl'
          />
        </div>
        <h1 className='mx-20 mt-10 text-lg md:text-3xl text-center'>Comece aqui a sua busca pelos incríveis países do mundo</h1>
        <Search onSearch={onSearch}/>
      </div>
      <div className="flex flex-col text-center text-2xl mt-16">
        {!loading ? (
          <>
            {!error && (<h1 className='text-2xl md:text-4xl mb-5'>Alguns dos nossos países mais visitados</h1>)}
            <div className="w-full flex flex-wrap">
              {countries.length > 0 ? (
                countries.map((country) => (
                  <div key={country.name.common} className="w-full sm:w-1/2 md:w-1/3 p-4">
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
            {Array(3).fill(null).map((_, index) => (
              <div key={index} className="w-full sm:w-1/2 md:w-1/3 p-4">
                <CountryCardSkeleton/>
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
