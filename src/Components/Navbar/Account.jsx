import { RiAccountCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const navigation = useNavigate();

  const handleClick = () => {
    navigation("/profile");
  };

  return (
    <>
      <RiAccountCircleLine onClick={handleClick} size={30} className="cursor" />
    </>
  );
}
