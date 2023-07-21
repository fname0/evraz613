import Image from 'next/image';
import Seo from '../components/Seo';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import Cookies from 'universal-cookie';

export default function Index() {
  const products = {"1": {"id": "1", "title": "Adidas Ozweego OG", "price": "2800","cat":"Adidas","photo":"blob:https://web.telegram.org/5d788adf-40b0-4066-bb3e-9cca8bd53996"},
  "2": {"id": "2", "title": "Adidas Spezial", "price": "2250","cat":"Adidas"},
  "3": {"id": "3", "title": "Adidas Samba", "price": "2250","cat":"Adidas"},
  "4": {"id": "4", "title": "Nike Air Max Plus Utility", "price": "2650","cat":"Nike"},
  "5": {"id": "5", "title": "New Balance 302", "price": "2150","cat":"New Balance"},
  "6": {"id": "6", "title": "Salomon XA Pro 3D Rainy Day", "price": "1000","cat":"other"},
  "7": {"id": "7", "title": "Reebok Zig Kinetica", "price": "950","cat":"other"},
  "8": {"id": "8", "title": "Adidas Deerupt", "price": "1000","cat":"Adidas"},
  "9": {"id": "9", "title": "Nike Free Metcon 4 'Veterans Day'", "price": "1350","cat":"Nike"},
  "10": {"id": "10", "title": "Nike SB Dunk", "price": "1850","cat":"Nike"},
  "11": {"id": "11", "title": "New Balance XC-72", "price": "1250","cat":"New Balance"},
  "12": {"id": "12", "title": "New Balance 530", "price": "1200","cat":"New Balance"},
  "13": {"id": "13", "title": "Court Graffik SQ DC", "price": "2650","cat":"other"}}

  let searchValueTemp = "";
  const [searchValue, setSearchValue] = useState("");
  const [cookie, setCookie] = useState();
  const [basket, setBasket] = useState({});
  const [basketLength, setBasketLength] = useState(0);
  const [priceSum, setPriceSum] = useState(0);
  const [catsContFixed, setCatsContFixed] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const cookie = new Cookies();
    setCookie(cookie);
    setBasket(cookie.get('basket') === undefined ? {} : cookie.get('basket'));
    setBasketLength(cookie.get('basket') === undefined ? 0 : Object.values(cookie.get('basket')).reduce((a, b) => a + b, 0));
    setPriceSum(cookie.get('priceSum') === undefined ? 0 : parseInt(cookie.get('priceSum')));
    window.innerWidth > 880 ? window.addEventListener('scroll', handleScroll) : null;
    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  const handleScroll = () => {
    if (document.getElementById("catsCont").getBoundingClientRect().top > 0) {setCatsContFixed(false)}
    else if (document.getElementById("catsCont").getBoundingClientRect().top <= 0) {setCatsContFixed(true)}
  }


  const addToBasket = (id) => {
    let basketTemp = basket;
    basketTemp[id] = 1;
    cookie.set('basket', basketTemp);
    setBasket(basketTemp);
    setBasketLength(Object.values(basketTemp).reduce((a, b) => a + b, 0));
    cookie.set('priceSum', priceSum+parseInt(products[id].price));
    setPriceSum(priceSum+parseInt(products[id].price));
  }

  const decreaseProductCount = (id) => {
    let basketTemp = basket;
    if (basket[id] === 1) {delete basketTemp[id]}
    else {basketTemp[id]-=1}
    setBasket(basketTemp);
    setBasketLength(Object.values(basketTemp).reduce((a, b) => a + b, 0));
    cookie.set('basket', basketTemp);
    cookie.set('priceSum', priceSum-parseInt(products[id].price));
    setPriceSum(priceSum-parseInt(products[id].price));
  }

  const increaseProductCount = (id) => {
    let basketTemp = basket;
    basketTemp[id]+=1;
    setBasket(basketTemp);
    setBasketLength(Object.values(basketTemp).reduce((a, b) => a + b, 0));
    cookie.set('basket', basketTemp);
    cookie.set('priceSum', priceSum+parseInt(products[id].price));
    setPriceSum(priceSum+parseInt(products[id].price));
  }

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
                    <Link href="/about" className='med link pointer'>О нас</Link>
                    <li className='med link'>·</li>
                    <li className='med link pointer'>Каталог</li>
                    <li className='med link'>·</li>
                    <Link href="/contacts" className='med link pointer'>Контакты</Link>
                </ul>
            </div>

            <div className="bold heroTitle">К А Т А Л О Г</div>
        </div>

        <div className="catalogCont">
          <div className="catalogCatsCont"  id="catsCont">
            <div className={catsContFixed ? "catsCont" : null}>
              <div className="searchInputCont">
                    <input type="text" className="reg searchInput" placeholder='Поиск...'  onKeyDown={(e) => {searchValueTemp=e.target.value;e.key==="Enter"?setSearchValue(searchValueTemp):null}}/>
                    <Image
                    src='/search.svg'
                    width={30}
                    height={30}
                    className='searchBtn'
                    alt="search image"
                    onClick={() => setSearchValue(searchValueTemp)}/>
                </div>
                <div className="cats">
                  <div className="med cat" onClick={() => {document.getElementById("adidas").scrollIntoView({behavior: "smooth"})}}>Adidas</div>
                  <div className="med cat" onClick={() => {document.getElementById("nike").scrollIntoView({behavior: "smooth"})}}>Nike</div>
                  <div className="med cat" onClick={() => {document.getElementById("nb").scrollIntoView({behavior: "smooth"})}}>New Balance</div>
                  <div className="med cat" onClick={() => {document.getElementById("other").scrollIntoView({behavior: "smooth"})}}>Другое</div>
                </div>
            </div>
          </div>

          <div className="productsConts">
              <div className="bold productsContTitle" id='adidas'>Adidas</div>
              <div className="productsCont">
                {Object.entries(products).filter(name => name[1].cat === "Adidas").filter(name => searchValue.toLowerCase().split(' ').every(v => (name[1].title+" "+name[1].desc).toLowerCase().includes(v))).map((product) => (
                  <ProductCard
                      key={product[1].id}
                      product={product[1]}
                      addToBasket={addToBasket}
                      count={basket[product[1].id]}
                      decrease={decreaseProductCount}
                      increase={increaseProductCount}
                  />
                  ))}
              </div>
              <div className="bold productsContTitle" id='nike'>Nike</div>
              <div className="productsCont">
                {Object.entries(products).filter(name => name[1].cat === "Nike").filter(name => searchValue.toLowerCase().split(' ').every(v => (name[1].title+" "+name[1].desc).toLowerCase().includes(v))).map((product) => (
                  <ProductCard
                      key={product[1].id}
                      product={product[1]}
                      addToBasket={addToBasket}
                      count={basket[product[1].id]}
                      decrease={decreaseProductCount}
                      increase={increaseProductCount}
                  />
                  ))}
              </div>
              <div className="bold productsContTitle" id='nb'>New Balance</div>
              <div className="productsCont">
                {Object.entries(products).filter(name => name[1].cat === "New Balance").filter(name => searchValue.toLowerCase().split(' ').every(v => (name[1].title+" "+name[1].desc).toLowerCase().includes(v))).map((product) => (
                  <ProductCard
                      key={product[1].id}
                      product={product[1]}
                      addToBasket={addToBasket}
                      count={basket[product[1].id]}
                      decrease={decreaseProductCount}
                      increase={increaseProductCount}
                  />
                  ))}
              </div>
              <div className="bold productsContTitle" id='other'>Другое</div>
              <div className="productsCont">
                {Object.entries(products).filter(name => name[1].cat === "other").filter(name => searchValue.toLowerCase().split(' ').every(v => (name[1].title+" "+name[1].desc).toLowerCase().includes(v))).map((product) => (
                  <ProductCard
                      key={product[1].id}
                      product={product[1]}
                      addToBasket={addToBasket}
                      count={basket[product[1].id]}
                      decrease={decreaseProductCount}
                      increase={increaseProductCount}
                  />
                  ))}
              </div>
          </div>
        </div>
    </div>
  )
}
