import Link from "next/link";
import {CountryResume} from "@/app/controller/apisController";
import {useState} from "react";

type CountryCardProps = {
  country: CountryResume;
}

export default function CountryCard({country}: CountryCardProps) {
  return (
    <Link href={`/country/${encodeURIComponent(country.name.official)}`}>
      <div className="bg-white shadow-lg rounded-lg p-4 transform transition-transform duration-300 hover:scale-105">
        <img className='w-full h-48 object-cover rounded-t-lg border-2' src={country.flags.svg} alt={country.name.official}/>
        <div className='text-center mt-4'>
          <h3 className='text-xl font-semibold'>{country.name.common}</h3>
        </div>
      </div>
    </Link>
  )
}
