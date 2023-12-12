import { Link } from "react-router-dom";

const AdminButton = () => {
  return (
    <Link to="/admin">
      <button>Gå til administrator siden</button>
    </Link>
  );
};

export default AdminButton;
