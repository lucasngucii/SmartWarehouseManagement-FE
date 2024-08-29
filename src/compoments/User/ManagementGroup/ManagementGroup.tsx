import React from 'react';
import './ManagementGroup.css';
import Select, { SingleValue, MultiValue } from 'react-select';
import { OverLay } from "../../OverLay/OverLay";

interface OptionType {
    value: string;
    label: string;
}

interface AddGroupComponentProps {
    hideOverlay: () => void;
}

const AddGroupComponent: React.FC<AddGroupComponentProps> = ({hideOverlay}) => {
    const [groupName, setGroupName] = React.useState<string>('');
    const [selectedOption, setSelectedOption] = React.useState<OptionType[] | null>(null);

    const options: OptionType[] = [
        { value: "view", label: "View" },
        { value: "edit", label: "Edit" },
        { value: "delete", label: "Delete" },
    ];

    const handleSelectChange = (
        newValue: SingleValue<OptionType> | MultiValue<OptionType>
    ) => {
        if (Array.isArray(newValue)) {
            setSelectedOption(newValue as OptionType[]);
        } else {
            setSelectedOption(newValue as OptionType ? [newValue] as OptionType[] : []);
        }
    };

    return (
        <div className="add-group-container"
             style={{width: "100%", height: "100%", backgroundColor: "#ffffff", padding: "20px"}}>
            <h2 className="add-group-title">Add Group</h2>
            <form>
                <div className="group-input-container">
                    <label className="group-name-label">Group Name</label>
                    <input
                        className="group-name-input"
                        type="text"
                        value={groupName}
                        placeholder={"Enter Group Name"}
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                </div>

                <table className="function-access-table">
                    <thead>
                    <tr>
                        <th>Function Name</th>
                        <th>Access Scope</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Example Function 1</td>
                        <td>
                            <Select
                                value={selectedOption as OptionType[]}
                                onChange={handleSelectChange}
                                options={options}
                                isMulti={true}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Example Function 2</td>
                        <td>
                            <Select
                                value={selectedOption as OptionType[]}
                                onChange={handleSelectChange}
                                options={options}
                                isMulti={true}
                            />
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
            <button className="cancel-button" onClick={hideOverlay}>Cancel</button>
            <button className="add-group-button">Add</button>
        </div>
    );
};

export const ManagementGroup: React.FC = () => {

    const [showOverlay, setShowOverlay] = React.useState(false);

    const handleShowOverlay = () => {
        setShowOverlay(true);
    }

    const handleHideOverlay = () => {
        setShowOverlay(false);
    }

    return (
        <div className="container-management-groups">
            <h2>Group Management</h2>
            <p className={"group-description"}>Here you can manage the permissions of the group</p>
            <table className="groups-table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Permission Name</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>View Dashboard</td>
                    <td>Active</td>
                    <td>
                        <button className="edit-button">Edit</button>
                    </td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Edit User</td>
                    <td>Inactive</td>
                    <td>
                        <button className="edit-button">Edit</button>
                    </td>
                </tr>
                </tbody>
            </table>
            <button className="add-group-button" onClick={handleShowOverlay}>Add Group</button>
            {showOverlay && (
                <OverLay>
                    <AddGroupComponent hideOverlay={handleHideOverlay} />
                </OverLay>
            )}
        </div>
    );
}
