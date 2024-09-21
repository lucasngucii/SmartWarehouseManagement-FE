import { OverLay } from "../../OverLay/OverLay";

interface ModelCloseProps {
    closeModelLogout: () => void;
    handleLogout: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ModelClose: React.FC<ModelCloseProps> = ({ closeModelLogout, handleLogout }) => {
    return (
        <OverLay className="fullscreen">
            <div className="global-model">
                <h2 className="h2 text-center fw-bold">Logout</h2>
                <p>Are you sure you want to logout?</p>
                <div className="model-buttons">
                    <button className="btn btn-secondary" onClick={closeModelLogout}>Cancel</button>
                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </OverLay>
    );
}