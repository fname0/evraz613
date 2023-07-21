import Image from 'next/image';
import Seo from '../components/Seo';
import Link from 'next/link';

export default function Contacts() {
  return (
    <div className="App" id="app">
        <Seo title="Ants for You | Муравьи для вас" description="Ants for You - интернет-магазин, где можно приобрести различные виды муравьев и всё для их жизни: формикарии, корм, инкубаторы, наполнители, песок, декор и аксессуары" keywords="муравьи"/>

        <div className="heroWrapper" id="main">
            <Image
            priority
            src='/bg.jpg'
            placeholder='blur'
            blurDataURL='data:image/jpeg;base64,iBG[yG9G01%201t7M|~o_300M|~pWTIUt7t7xuWBIp-:oIRlxujEWBM}oeoL%MIo9Gj?kCR+j]tRIUxt%MozWBafbIWAae'
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt="hero image"
            style={{zIndex: -1}}
            />

            <div className="navbar">
                <ul className="links">
                    <Link href="/about" className='med link pointer'>О нас</Link>
                    <li className='med link'>·</li>
                    <Link href="/" className='med link pointer'>Каталог</Link>
                    <li className='med link'>·</li>
                    <li className='med link pointer'>Контакты</li>
                </ul>
            </div>

            <div className="bold heroTitle">К О Н Т А К Т Ы</div>
        </div>
    </div>
  )
}
