import Image from "next/image";

export default function BrendCard(props) {
    const product=props.product;

    return (
        <div className="brendProductCardCont">
            <Image src={"/"+props.brend+".svg"} width={100} height={100}/>
            <div className="productCard">
                <div>
                    <Image src={"/products/"+product.id+"/1"+".jpg"} alt="" loading="lazy" width={270} height={270} className="productCardImg"/>
                    <p className="bold productTitle">{product.title}</p>
                    <p className="bold productPrice">{product.price} р.</p>
                </div>
            </div>
        </div>
    )
}