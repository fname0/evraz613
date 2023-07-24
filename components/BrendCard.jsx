import Image from "next/image";
import Link from "next/link";

export default function BrendCard(props) {
    const product=props.product;

    return (
        <div className="brendProductCardCont">
            <Image src={"/"+props.brend+".svg"} width={100} height={100} alt=""/>
            <div className="productCard">
                <div>
                    <Link href={"/product/"+product.id}><Image src={"/products/"+product.id+"/1.jpg"} alt="" loading="lazy" width={270} height={270} className="productCardImg"/></Link>
                    <p className="bold productTitle">{product.title}</p>
                    <p className="bold productPrice">{product.price} р.</p>
                </div>
            </div>
        </div>
    )
}