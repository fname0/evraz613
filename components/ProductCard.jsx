import Image from "next/image";
import Link from "next/link";

export default function ProductCard(props) {
    const product=props.product;

    return (
        <div className="productCardCont">
            <div className="productCard">
                <div>
                    <Link href={"/product/"+product.id}><Image src={"/products/"+product.id+"/1.jpg"} alt="" loading="lazy" width={270} height={270} className="productCardImg"/></Link>
                    <p className="bold productTitle">{product.title}</p>
                    <p className="bold productPrice">{product.price} р.</p>
                </div> 
                {props.count === undefined ? <button className="bold addToBasketBtn" onClick={() => props.addToBasket(product.id)}>В корзину</button> :
                <div className="changeProductCountCont">
                    <div className="med productCount changeProductCount" onClick={() => props.decrease(product.id)}>-</div>
                    <div className="bold productCount">{props.count}</div>
                    <div className="med productCount changeProductCount" onClick={() => props.increase(product.id)}>+</div>
                </div>}
            </div>
        </div>
    )
}