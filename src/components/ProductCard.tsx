interface Props {
  title: string;
  price: string;

}

export const ProductCard = ({title, price}: Props) => {
    return <div className="border p-5 rounded-xl">
        <div className="">{title}</div>
        <div className="">{price}</div>
    </div> 
}