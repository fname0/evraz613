import Image from "next/image";

export default function BasketCard(props) {
    const product=props.product;

    return (
        <div className="basketCardCont">
            <Image src={"/products/"+product.id+"/1.jpg"} alt="" loading="lazy" className="basketCardImg" width={70} height={70}/>
            <p className="med">{product.title}</p>
            <div className="changeBasketCountCont">
                <button className="med changeBasketCount" onClick={() => props.decrease(product.id)}>-</button>
                <div className="basketProductCount med">{props.count}</div>
                <button className="med changeBasketCount" onClick={() => props.increase(product.id)}>+</button>
            </div>
            <p className="bold blue">{product.price*props.count} p.</p>
        </div>
    )
}