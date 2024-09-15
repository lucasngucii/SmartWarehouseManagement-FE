import { PulseLoader } from "react-spinners";
import './Loading.css';

interface PulseLoaderProps {
    color?: string;
    loading: boolean;
}

export const RePulseLoader: React.FC<PulseLoaderProps> = ({ loading, color }) => {
    return (
        <div className="loader">
            <PulseLoader color={color || "#4daecd"} loading={loading} />
        </div>
    );
}