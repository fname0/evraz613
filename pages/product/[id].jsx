import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from 'universal-cookie';
import Seo from '../../components/Seo';
import Image from 'next/image';

export default function ({product}) {
    const [cookie, setCookie] = useState();
    const [purchased, setPurchased] = useState();
    const [basketLength, setBasketLength] = useState(0);
    const [priceSum, setPriceSum] = useState(0);
    const [basket, setBasket] = useState({});
    const [step, setStep] = useState(585);

    const addToBasket = () => {
        let basketTemp = basket;
        basketTemp[product.id] = 8;
        cookie.set('basket', basketTemp);
        setBasket(basketTemp);
        setBasketLength(Object.values(basketTemp).reduce((a, b) => a + b, 0));
        cookie.set('priceSum', priceSum+(parseInt(product.price)*8));
        setPriceSum(priceSum+(parseInt(product.price)*8));
      }
    
      const decreaseProductCount = () => {
        let basketTemp = basket;
        if (basket[product.id] === 8) {delete basketTemp[product.id]}
        else {basketTemp[product.id]-=8}
        setBasket(basketTemp);
        setBasketLength(Object.values(basketTemp).reduce((a, b) => a + b, 0));
        cookie.set('basket', basketTemp);
        cookie.set('priceSum', priceSum-(parseInt(product.price)*8));
        setPriceSum(priceSum-(parseInt(product.price)*8));
      }
    
      const increaseProductCount = () => {
        let basketTemp = basket;
        basketTemp[product.id]+=8;
        setBasket(basketTemp);
        setBasketLength(Object.values(basketTemp).reduce((a, b) => a + b, 0));
        cookie.set('basket', basketTemp);
        cookie.set('priceSum', priceSum+(parseInt(product.price)*8));
        setPriceSum(priceSum+(parseInt(product.price)*8));
      }

    useEffect(() => {
        const cookie = new Cookies();
        setCookie(cookie);
        setBasket(cookie.get('basket') === undefined ? {} : cookie.get('basket'));
        setBasketLength(cookie.get('basket') === undefined ? 0 : Object.values(cookie.get('basket')).reduce((a, b) => a + b, 0));
        setPriceSum(cookie.get('priceSum') === undefined ? 0 : parseInt(cookie.get('priceSum')));
        setStep(Math.floor(window.innerWidth * 0.95 >= step ? step : window.innerWidth * 0.95));
    }, [])

    const next = () => {
        const carousel = document.getElementById("carousel").style;
        const y = carousel.transform === "" ? 0 : parseInt(carousel.transform.split('(')[1].split('px')[0]);

        if (y === -step*(product.photos-1)) {carousel.transform="translateX(0px)";carousel.transition=" transform 0.2s";}
        else {carousel.transform="translateX("+(y-step)+"px)";carousel.transition=" transform 0.2s"}
    }
    
    const prev = () => {
        const carousel = document.getElementById("carousel").style;
        const y = carousel.transform === "" ? 0 : parseInt(carousel.transform.split('(')[1].split('px')[0]);

        if (y === 0) {carousel.transform="translateX("+(-step*(product.photos-1))+"px)";carousel.transition=" transform 0.2s";}
        else {carousel.transform="translateX("+(y+step)+"px)";carousel.transition=" transform 0.2s"}
    }

    return (
        <div className="App">
            <Seo title={product.title+' за '+ product.price+'₽'} description={'Купить '+product.title+' за '+product.price+"₽"} keywords={"кроссовки, TRY OPT"}/>
            
            <div className="productInfoTitle blue bold">{product.title}</div>

            <div className="productCont">
                <div className="carouselWrapper">
                    <div className="carousel" id='carousel'>
                        {new Array(parseInt(product.photos)).fill(0).map((item, index) => (
                        <div className="carouselImgCont">
                            <Image src={"/products/"+product.id+"/"+(index+1)+".jpg"} width={580} height={580} className='carouselImg' alt='image'/>
                        </div>
                        ))}
                    </div>
                    {product.photos === "1" ? null : <div className='carouselSwipeBtnCont next'><div className="carouselSwipeBtn" onClick={() => next()}>{">"}</div></div>}
                    {product.photos === "1" ? null : <div className='carouselSwipeBtnCont prev'><div className="carouselSwipeBtn" onClick={() => prev()}>{"<"}</div></div>}
                </div>
                <div className="productTextCont">
                    <div className="bold productInfoPrice">{product.price} руб.</div>
                    <div className="med gray mb">Размерный ряд: {product.sizes}</div>
                    <div className="med">Минимальный заказ от <span className='blue'>1 коробки(8 пар)</span></div>
                    <div className="med">В коробке все кроссовки <span className="blue">одного цвета</span></div>
                    <div className="med">В коробке кроссовки <span className="blue">всех размеров</span> из ряда</div>
                    <div className="med">Каждая пара упакована в <span className="blue">отдельную</span> коробку</div>
                    {basket[product.id] === undefined ? <button className="bold addToBasketInfoBtn" onClick={() => addToBasket()}>В корзину</button> :
                    <div className="changeProductCountContInfo">
                        <div className="med productCountInfo changeProductCountInfo" onClick={() => decreaseProductCount()}>-</div>
                        <div className="bold productCountInfo">{basket[product.id]}</div>
                        <div className="med productCountInfo changeProductCountInfo" onClick={() => increaseProductCount()}>+</div>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(content) {
    const id = content.query['id'];
    const product = {"1": {"id":"1","title":"Columbia Pursuit","sizes":"41/42/43/43/44/44/45/46","price":"1600","photos":"7","cat":"other"},
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
  "51": {"id":"51","title":"Reebok Zig Kinetica","sizes":"41/42/42/43/43/44/44/45","price":"950","photos":"1","cat":"other"}}[id]
    return {
        props: {product},
    };
}
