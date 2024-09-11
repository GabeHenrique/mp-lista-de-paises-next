import Link from "next/link";
import Container from "@/app/components/Container";
import Image from "next/image";

export default function Header() {
  return (
    <header className="py-4 bg-white px-5">
      <Container className='flex'>
        <Link href='/'>
          <Image src='/assets/Logo.png' alt="Logo com formato do globo terrestre" width={30} height={30}
                 className='mr-5 transition-transform duration-300 hover:scale-105'/>
        </Link>
        <nav className="flex space-x-4">
          <Link href="/" className='transition-transform duration-300 hover:scale-105'>Início</Link>
          <Link href="/visited" className='transition-transform duration-300 hover:scale-105'>Visitados por mim</Link>
        </nav>
      </Container>
    </header>
  );
}