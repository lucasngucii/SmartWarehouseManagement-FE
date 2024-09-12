import { OverLay } from "../../OverLay/OverLay";

interface ModelCloseProps {
    closeModelLogout: () => void;
    handleLogout: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ModelClose: React.FC<ModelCloseProps> = ({ closeModelLogout, handleLogout }) => {
    return (
        <OverLay className="fullscreen">
            <div className="logout-model">
                <h2>Logout</h2>
                <p>Are you sure you want to logout?</p>
                <div className="logout-buttons">
                    <button className="cancel-button" onClick={closeModelLogout}>Cancel</button>
                    <button className="delete-button" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </OverLay>
    );
}