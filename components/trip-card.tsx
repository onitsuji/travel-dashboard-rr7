import { Link } from "react-router";

export default function TripCard({
  id,
  name,
  imageUrl,
  location,
  tags,
  price,
}: TripCardProps) {
  return (
    <Link>
      <img src={imageUrl} alt={name} />
    </Link>
  );
}
