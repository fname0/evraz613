import Image from "next/image";

export default function BestCard(props) {

    return (
        <div className="bestCardCont">
            <div className="bestCard">
                <Image width={70} height={70} alt="" loading="lazy" src={""+props.svg+".svg"}/>
                <div className="med bestText">{props.text}</div>
            </div>
        </div>
    )
}