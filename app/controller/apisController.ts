export type Country = {
  name: {
    common: string;
    official: string;
  };
  capital: string;
  continents: string;
  languages: {
    [key: string]: string;
  };
  population: number;
  flags: {
    svg: string;
  };
  borders: string[];
};

export type CountryResume = {
  name: {
    common: string,
    official: string,
  }
  flags: {
    svg: string
  }
}


export class ApisController {

 async findByOfficialName(name: string | string[]): Promise<Country> {
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
    const data = await response.json();
    return data[0];
  }

  async findFrontierCountries(codes: string[]): Promise<CountryResume[]> {
    const param = codes.join(',');
    const response = await fetch(`https://restcountries.com/v3.1/alpha?codes=${param}`);
    return await response.json();
  }

  async findAll(): Promise<CountryResume[]> {
    const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags");
    return await response.json();
  }

  async searchByName(name: string): Promise<CountryResume[]> {
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,flags`);
    return await response.json();
  }
}