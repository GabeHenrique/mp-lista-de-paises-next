'use client'

import React, {useEffect, useState} from "react";
import {CountryResume} from "@/app/controller/apisController";
import Container from "@/app/components/Container";
import CountryCard from "@/app/components/CountryCard";



export default function VisitedCountriesPage() {
  const [visitedCountries, setVisitedCountries] = useState<CountryResume[]>([]);

  useEffect(() => {
    const savedCountries = localStorage.getItem("visitedCountries");
    if (savedCountries) {
      setVisitedCountries(JSON.parse(savedCountries))
    }
  }, []);

return (
  <Container className='text-center'>
    <h1 className='mx-20 mt-10 text-4xl'>Países visitados por mim</h1>
    <div className="w-full flex flex-wrap">
      {visitedCountries.map((country) => (
        <div key={country.name.common} className="w-1/3 p-4">
          <CountryCard country={country}/>
        </div>
      ))}
    </div>
  </Container>
)

}