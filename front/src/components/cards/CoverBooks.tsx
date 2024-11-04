import {BookI} from '@/types/books'

interface CoverBooksProps {
  item: BookI
}

const CoverBooks = ({item}: CoverBooksProps) => {
  return (
    <a className=" cursor-pointer " href={`/books/${item.id}`}>
      <img
        alt={item.title}
        className="w-36 h-56 rounded-md bg-gray-200 object-cover "
        src={process.env.NEXT_PUBLIC_API_URL + item.imageLink}
      />
    </a>
  )
}

export default CoverBooks
