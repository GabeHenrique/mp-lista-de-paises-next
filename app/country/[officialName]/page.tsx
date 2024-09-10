"use client";
import {useParams, useRouter} from 'next/navigation';
import React, {useEffect, useState} from 'react';
import Container from "@/app/components/Container";
import Link from "next/link";
import {FaArrowLeft, FaCity, FaLanguage, FaMapMarkedAlt} from "react-icons/fa";
import {FaPeopleGroup} from 'react-icons/fa6'
import CountryCard from "@/app/components/CountryCard";
import {ApisController, Country, CountryResume} from "@/app/controller/apisController";


export default function CountryPage() {
  const {officialName} = useParams();
  const router = useRouter();
  const [country, setCountry] = useState<Country>();
  const [frontierCountries, setFrontierCountries] = useState<CountryResume[]>([]);
  const api = new ApisController();
  const [visitedCountries, setVisitedCountries] = useState<CountryResume[]>([]);

  useEffect(() => {
    async function fetchCountry() {
      if (officialName) {
        try {
          const data = await api.findByOfficialName(officialName)
          setCountry(data);
        } catch (error) {
          console.error('Error fetching country:', error);
        }
      }
    }

    fetchCountry();
  }, [officialName]);

  useEffect(() => {
    async function fetchFrontierCountries() {
      if (country && country.borders && Array.isArray(country.borders)) {
        try {
          const data = await api.findFrontierCountries(country.borders)
          setFrontierCountries(data);
        } catch (e) {
          console.error('Error fetching frontier:', e);
        }
      }
    }

    fetchFrontierCountries();
  }, [country?.borders]);

  useEffect(() => {
    const savedCountries = localStorage.getItem("visitedCountries");
    if (savedCountries) {
      setVisitedCountries(JSON.parse(savedCountries))
    }
  }, []);

  const handleVisit = () => {
    if (country) {
      const countryExists = visitedCountries.some(
        (visitedCountry) => {
          console.log(visitedCountries);
          console.log(country);
          return visitedCountry.name.official === country.name.official
        }
      );
      let updatedCountries;

      if (countryExists) {
        updatedCountries = visitedCountries.filter(
          (visitedCountry) => visitedCountry.name.official !== country.name.official
        );
      } else {
        updatedCountries = [...visitedCountries, country];
      }

      setVisitedCountries(updatedCountries);
      localStorage.setItem('visitedCountries', JSON.stringify(updatedCountries));
    } else {
      localStorage.setItem('visitedCountries', JSON.stringify(visitedCountries));
    }
  };

  const isVisited = visitedCountries.some(
    (visitedCountry) => visitedCountry.name.official === country?.name.official
  );

  if (!country) return <h1>Carregando...</h1>;

  return (
    <Container>
      <div className='flex flex-col items-center'>
        <h1 className='mx-20 mt-10 text-4xl text-center'>{country.name.common}</h1>
        <h2 className='mx-20 mt-5 text-xl text-center text-gray-500'>{country.name.official}</h2>
      </div>
      <div className='flex justify-between'>
        <Link
          className='flex text-center items-center w-min mt-5 pl-2 pb-2' href='#'
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}>
          <FaArrowLeft className='mr-2'/>
          <p className='text-lg'>Voltar</p>
        </Link>
        <button
          onClick={handleVisit}
          className={`px-2 py-1 m-2 rounded-xl focus:outline-none transition-all duration-300 ${
            isVisited
              ? 'bg-salmon text-white hover:bg-darksalmon'
              :  'bg-lightgreen text-white hover:bg-forestgreen'
          }`}
        >
          {isVisited ? 'Remover Visitado' : 'Marcar como Visitado'}
        </button>
      </div>
      <div className='flex items-center w-full h-80 bg-white pt-6 pb-6 px-5 rounded-2xl'>
        <div className='w-1/2 h-5/6 pl-5'>
          <h1 className='flex items-center p-2 text-xl'>
            <FaCity/>
            <strong className='ml-2'>Capital:</strong>
            <p className='ml-2'> {country.capital}</p>
          </h1>
          <div className='flex items-center p-2 text-xl'>
            <FaMapMarkedAlt/>
            <strong className='ml-2'>Continente:</strong>
            <p className='ml-2'> {country.continents}</p>
          </div>
          <div className='flex items-center p-2 text-xl'>
            <FaPeopleGroup/>
            <strong className='ml-2'>População:</strong>
            <p className='ml-2'> {country.population}</p>
          </div>
          <div className='flex flex-col p-2 text-xl'>
            <div className='flex items-center'>
              <FaLanguage/>
              <strong className='ml-2'>Idiomas:</strong>
            </div>
            <div className='flex flex-wrap gap-2 mt-2'>
              {Object.entries(country.languages).map(([code, name]) => (
                <Link key={code} href={`/${name}`}>
                  <div className='bg-gray-200 text-gray-800 rounded-full px-4 py-2 text-sm font-medium'>
                    {name}
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
        <div className='w-1/2 h-5/6 flex justify-center items-start'>
          <img className='h-full object-cover rounded-lg border' src={country.flags.svg} alt={country.name.official}/>
        </div>
      </div>
      {frontierCountries.length > 0 ? (
        <div className='flex flex-col text-center'>
          <h1 className='mx-20 mt-10 text-4xl'>Países que fazem fronteira</h1>
          <div className="w-full flex flex-wrap">
            {frontierCountries.map((country) => (
              <div key={country.name.common} className="w-1/3 p-4">
                <CountryCard country={country}/>
              </div>
            ))}
          </div>
        </div>) : (
        <p className="text-2xl text-red-500"></p>)}
    </Container>
  );
}