import Image from "next/image";

export default function ProductCard(props) {
    const product=props.product;

    return (
        <div className="productCardCont">
            <div className="productCard">
                <div>
                    <Image src={"/"+product.id+".jpg"} alt="" loading="lazy" width={250} height={250} className="productCardImg"/>
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