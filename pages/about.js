import Image from 'next/image';
import Seo from '../components/Seo';
import Link from 'next/link';
import BestCard from '../components/BestCard';
import BrendCard from '../components/BrendCard';

export default function About() {
  return (
    <div className="App" id="app">
        <Seo title="TRY OPT | Кроссовки оптом" description="TRY OPT - оптовый магазин кроссовок Premium, Lux и Medium качества по самым приятным ценам" keywords="TRY OPT, кроссовки"/>

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
                    <li className='med link pointer'>О нас</li>
                    <li className='med link'>·</li>
                    <Link href="/" className='med link pointer'>Каталог</Link>
                    <li className='med link'>·</li>
                    <Link href="/about#contacts" className='med link pointer'>Контакты</Link>
                </ul>
            </div>

            <div className="bold heroTitle">О НАС</div>
        </div>

        <div className="med infoText"><span className="blue">TRY OPT - </span> оптовый лавочка кроссовок Premium, Lux и Medium качества по самым приятным ценам</div>
        <div className="bold infoTitle blue">Наши преимущества</div>
        <div className="bests">
          <BestCard svg="check" text="Надежный поставщик с уникальным товаром"/>
          <BestCard svg="dollar" text="Цены выгоднее, чем у конкурентов"/>
          <BestCard svg="gift" text="Постоянным клиентам приятные скидки и подарки"/>
          <BestCard svg="time" text="Быстрое обслуживание"/>
          <BestCard svg="up" text="Большой и пополняющийся ассортимент"/>
        </div>

        <div className="bold infoTitle blue">Товары</div>
        <div className="med infoText">У нас Вы найдёте <span className='blue'>лучшие кроссовки</span> популярных брендов</div>
        <div className="brends">
          <BrendCard product={{"id": "40", "title": "Nike SB Dunk", "price": "1850"}} brend="nike"/>
          <BrendCard product={{"id": "48", "title": "Adidas Ozweego OG", "price": "2800"}} brend="adidas"/>
          <BrendCard product={{"id": "42", "title": "New Balance 302", "price": "2150"}} brend="nb"/>
          <BrendCard product={{"id": "51", "title": "Reebok Zig Kinetica", "price": "950"}} brend="reebok"/>
        </div>
        <button className="openCatalogBtn bold blue"><Link href="/" className='resetLinkStyle'>Перейти в каталог</Link></button>

        <div className="deliveryCont" id='contacts'>
          <div className="bold deliveryTitle blue">Доставка</div>
          <div className="med deliveryText">Минимальный заказ от 1 коробки<span className='blue'>(8 пар)</span></div>
          <div className="med deliveryText">В коробке все кроссовки <span className='blue'>одного</span> цвета</div>
          <div className="med deliveryText">Каждая пара упакована в <span className='blue'>отдельную</span> коробку</div>
          <div className="med deliveryText">Доставка осуществляется <span className='blue'>СДЭК</span>'ом или <span className='blue'>Почтой России</span></div>
        </div>

        <div className="bold infoTitle blue">Контакты</div>
        <div className="bold contactsText">Напишите в Telegram</div>
        <div className="bold infoTitle blue pointer" onClick={() => window.open("https://t.me/DanilTryOpt")}>@DanilTryOpt</div>

        <div className="footer">
            <div className="footerCont">
                <div className='footerFio'>
                    <div className="bold fioTitle blue">TRY OPT</div>
                    <div className="med fioText">оптовый магазин кроссовок</div>
                </div>

                <div className='footerOther'>
                    <div className="bold footerTel" onClick={() => window.open("https://t.me/DanilTryOpt")}>@DanilTryOpt</div>
                    <div className="light footerText">2023 © оптовый магазин TRY OPT. Все права защищены</div>
                </div>
            </div>
        </div>
    </div>
  )
}
