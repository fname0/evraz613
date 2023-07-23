import Image from 'next/image';
import Seo from '../components/Seo';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import Cookies from 'universal-cookie';

export default function Index() {
  const products = {"1": {"id":"1","title":"Columbia Pursuit","sizes":"41/42/43/43/44/44/45/46","price":"1600","photos":"7","cat":"other"},
  "2": {"id":"2","title":"New Balance 9060","sizes":"41/42/42/43/43/44/44/45","price":"1550","photos":"9","cat":"New Balance"},
  "3": {"id":"3","title":"Adidas Ozweego","sizes":"41/42/43/43/44/44/45/46","price":"1350","photos":"6","cat":"Adidas"},
  "4": {"id":"4","title":"Adidas Yeezy 350","sizes":"41/42/43/43/44/44/45/46","price":"1200","photos":"4","cat":"Adidas"},
  "5": {"id":"5","title":"Nike Atomknit","sizes":"41/42/42/43/43/44/44/45","price":"1750","photos":"2","cat":"Nike"},
  "6": {"id":"6","title":"Adidas Yeezy Boost 700","sizes":"41/42/42/43/43/44/44/45","price":"2350","photos":"7","cat":"Adidas"},
  "7": {"id":"7","title":"Adidas Yeezy Boost 350","sizes":"41/42/43/43/44/44/45/46","price":"2050","photos":"9","cat":"Adidas"},
  "8": {"id":"8","title":"Asics 1090","sizes":"41/42/42/43/43/44/44/45","price":"2600","photos":"5","cat":"other"},
  "9": {"id":"9","title":"Nike Tuned Tn","sizes":"41/42/42/43/43/44/44/45","price":"2250","photos":"6","cat":"Nike"},
  "10": {"id":"10","title":"Nike Air Max Terrascape","sizes":"41/42/42/43/43/44/44/45","price":"2350","photos":"7","cat":"Nike"},
  "11": {"id":"11","title":"Nike Air Max 2090","sizes":"36/37/38/38/39/39/40/41","price":"1000","photos":"4","cat":"Nike"},
  "12": {"id":"12","title":"Nike Air Max 2090","sizes":"36/37/38/38/39/39/40/41","price":"1000","photos":"3","cat":"Nike"},
  "13": {"id":"13","title":"Adidas Ozweego Celox","sizes":"41/42/43/43/44/44/45/46","price":"900","photos":"3","cat":"Adidas"},
  "14": {"id":"14","title":"New Balance 327","sizes":"41/42/42/43/43/44/44/45","price":"850","photos":"5","cat":"New Balance"},
  "15": {"id":"15","title":"New Balance MS237CA","sizes":"36/37/38/38/39/39/40/41","price":"1000","photos":"4","cat":"New Balance"},
  "16": {"id":"16","title":"Adidas Retropy F2","sizes":"41/42/42/43/43/44/44/45","price":"1200","photos":"4","cat":"Adidas"},
  "17": {"id":"17","title":"Nike Tiffany & Co. x Air Force 1 Low '1837'","sizes":"36/37/38/38/39/39/40/41","price":"1350","photos":"3","cat":"Nike"},
  "18": {"id":"18","title":"Nike Wmns Air Force 1 Low 'Valentine's Day 2023'","sizes":"36/37/38/38/39/39/40/41","price":"1350","photos":"3","cat":"Nike"},
  "19": {"id":"19","title":"New Balance 530","sizes":"36/37/38/38/39/39/40/41","price":"1200","photos":"5","cat":"New Balance"},
  "20": {"id":"20","title":"Adidas Response CL","sizes":"41/42/43/43/44/44/45/46","price":"1850","photos":"6","cat":"Adidas"},
  "21": {"id":"21","title":"New Balance XC-72","sizes":"41/42/42/43/43/44/44/45","price":"1250","photos":"7","cat":"New Balance"},
  "22": {"id":"22","title":"Adidas Superstar","sizes":"36/37/38/38/39/39/40/41","price":"550","photos":"6","cat":"Adidas"},
  "23": {"id":"23","title":"Nike Air Max Tailwind V","sizes":"41/42/42/43/43/44/44/45","price":"2450","photos":"7","cat":"Nike"},
  "24": {"id":"24","title":"Nike Air Jordan 4 Retro","sizes":"41/42/42/43/43/44/44/45","price":"2450","photos":"4","cat":"Nike"},
  "25": {"id":"25","title":"Vans Old Skool","sizes":"36/37/37/38/38/39/39/40","price":"2650","photos":"4","cat":"other"},
  "26": {"id":"26","title":"Under Armour Hovr Machina 3","sizes":"41/42/42/43/43/44/44/45","price":"2350","photos":"4","cat":"other"},
  "27": {"id":"27","title":"Nike Air Zoom Vomero 5","sizes":"41/42/42/43/43/44/44/45","price":"2450","photos":"7","cat":"Nike"},
  "28": {"id":"28","title":"Nike Air Zoom Alphafly Next","sizes":"37/38/38/39/39/40/40/41","price":"1250","photos":"4","cat":"Nike"},
  "29": {"id":"29","title":"Nike Forum 84 Low","sizes":"37/38/38/39/39/40/40/41","price":"2000","photos":"1","cat":"Nike"},
  "30": {"id":"30","title":"Nike Neckface x Dunk Low Pro SB 'Black'","sizes":"36/37/37/38/38/39/39/40","price":"2950","photos":"2","cat":"Nike"},
  "31": {"id":"31","title":"Nike SB Dunk Low 'Club 58 Gulf'","sizes":"36/37/37/38/38/39/39/40","price":"2450","photos":"4","cat":"Nike"},
  "32": {"id":"32","title":"Nike Air Force 1 Shadow","sizes":"36/37/38/38/39/39/40/41","price":"800","photos":"8","cat":"Nike"},
  "33": {"id":"33","title":"SACAI X NIKE VAPOR WAFFLE","sizes":"36/37/38/38/39/39/40/41","price":"1000","photos":"4","cat":"Nike"},
  "34": {"id":"34","title":"Nike Air Zoom Alphafly Next","sizes":"37/38/38/39/39/40/40/41","price":"1750","photos":"2","cat":"Nike"},
  "35": {"id":"35","title":"Nike Placement","sizes":"41/42/42/43/43/44/44/45","price":"800","photos":"6","cat":"Nike"},
  "36": {"id":"36","title":"Adidas Ozweego","sizes":"37/38/38/39/39/40/40/41","price":"950","photos":"7","cat":"Adidas"},
  "37": {"id":"37","title":"Nike Placement","sizes":"36/37/37/38/38/39/39/40","price":"1000","photos":"4","cat":"Nike"},
  "38": {"id":"38","title":"Adidas Deerupt","sizes":"36/37/37/38/38/39/39/40","price":"1000","photos":"5","cat":"Adidas"},
  "39": {"id":"39","title":"Nike Air Max TN","sizes":"36/37/37/38/38/39/39/40","price":"2250","photos":"8","cat":"Nike"},
  "40": {"id":"40","title":"Nike SB Dunk","sizes":"36/37/37/38/38/39/39/40","price":"1850","photos":"5","cat":"Nike"},
  "41": {"id":"41","title":"ASICS Gel-Kahana 8","sizes":"41/42/42/43/43/44/44/45","price":"2650","photos":"9","cat":"other"},
  "42": {"id":"42","title":"New Balance 302","sizes":"41/42/42/43/43/44/44/45","price":"2150","photos":"4","cat":"New Balance"},
  "43": {"id":"43","title":"Ocai Retro Skater","sizes":"41/42/42/43/43/44/44/45","price":"2950","photos":"3","cat":"other"},
  "44": {"id":"44","title":"Кроссовки Nike Free Metcon 4 'Veterans Day'","sizes":"41/42/42/43/43/44/44/45","price":"1350","photos":"6","cat":"Nike"},
  "45": {"id":"45","title":"Adidas Samba","sizes":"41/42/42/43/43/44/44/45","price":"2250","photos":"6","cat":"Adidas"},
  "46": {"id":"46","title":"Adidas Spezial","sizes":"41/42/42/43/43/44/44/45","price":"2250","photos":"6","cat":"Adidas"},
  "47": {"id":"47","title":"Nike Air Max Plus Utility","sizes":"41/42/42/43/43/44/44/45","price":"2650","photos":"5","cat":"Nike"},
  "48": {"id":"48","title":"Adidas Ozweego OG","sizes":"41/42/42/43/43/44/44/45","price":"2800","photos":"6","cat":"Adidas"},
  "49": {"id":"49","title":"Court Graffik SQ DC","sizes":"41/42/42/43/43/44/44/45","price":"2650","photos":"6","cat":"other"},
  "50": {"id":"50","title":"Salomon XA Pro 3D Rainy Day","sizes":"37/38/38/39/39/40/40/41","price":"1000","photos":"7","cat":"other"},
  "51": {"id":"51","title":"Reebok Zig Kinetica","sizes":"41/42/42/43/43/44/44/45","price":"950","photos":"1","cat":"other"}}

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
    basketTemp[id] = 8;
    cookie.set('basket', basketTemp);
    setBasket(basketTemp);
    setBasketLength(Object.values(basketTemp).reduce((a, b) => a + b, 0));
    cookie.set('priceSum', priceSum+(parseInt(products[id].price)*8));
    setPriceSum(priceSum+(parseInt(products[id].price)*8));
  }

  const decreaseProductCount = (id) => {
    let basketTemp = basket;
    if (basket[id] === 8) {delete basketTemp[id]}
    else {basketTemp[id]-=8}
    setBasket(basketTemp);
    setBasketLength(Object.values(basketTemp).reduce((a, b) => a + b, 0));
    cookie.set('basket', basketTemp);
    cookie.set('priceSum', priceSum-(parseInt(products[id].price)*8));
    setPriceSum(priceSum-(parseInt(products[id].price)*8));
  }

  const increaseProductCount = (id) => {
    let basketTemp = basket;
    basketTemp[id]+=8;
    setBasket(basketTemp);
    setBasketLength(Object.values(basketTemp).reduce((a, b) => a + b, 0));
    cookie.set('basket', basketTemp);
    cookie.set('priceSum', priceSum+(parseInt(products[id].price)*8));
    setPriceSum(priceSum+(parseInt(products[id].price)*8));
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
                    <Link href="/about#contacts" className='med link pointer'>Контакты</Link>
                </ul>
            </div>

            <div className="bold heroTitle">КАТАЛОГ</div>
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
