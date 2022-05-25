import { useAuth } from "../context/AuthContext";

function Gerenciamento() {
    const { user } = useAuth();

    return (
        <div>Gerenciamento: {user.displayName}</div>
    );
}

export default Gerenciamento;