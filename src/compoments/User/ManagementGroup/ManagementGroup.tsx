import React from 'react';
import './ManagementGroup.css';
import Select, {SingleValue, MultiValue} from 'react-select';
import {OverLay} from "../../OverLay/OverLay";
import {Group} from "../../../interface/Group";

interface OptionType {
    value: string;
    label: string;
}

interface AddGroupComponentProps {
    hideOverlay: () => void;
    groupId?: number | null;
}

const AddGroupComponent: React.FC<AddGroupComponentProps> = ({hideOverlay, groupId}) => {

    const options: OptionType[] = [
        {value: "view", label: "View"},
        {value: "edit", label: "Edit"},
        {value: "delete", label: "Delete"},
    ];
    const [groupName, setGroupName] = React.useState<string>("");
    const [selectedOptionUser, setSelectedOptionUser] = React.useState<OptionType[] | null>(null);
    const [selectedOptionProduct, setSelectedOptionProduct] = React.useState<OptionType[] | null>(null);

    const handleSelectChangeUser = (
        newValue: SingleValue<OptionType> | MultiValue<OptionType>
    ) => {
        if (Array.isArray(newValue)) {
            setSelectedOptionUser(newValue as OptionType[]);
        } else {
            setSelectedOptionUser(newValue as OptionType ? [newValue] as OptionType[] : []);
        }
    };

    const handleSelectChangeProduct = (
        newValue: SingleValue<OptionType> | MultiValue<OptionType> | null
    ) => {
        if (Array.isArray(newValue)) {
            setSelectedOptionProduct(newValue as OptionType[]);
        } else {
            setSelectedOptionProduct(newValue as OptionType ? [newValue] as OptionType[] : []);
        }
    };

    const handleSubmit = () => {
        if (groupId) {
            console.log("Update Group");
            return;
        }
        console.log("Add Group");
    }

    return (
        <div className="add-group-container">
            <h2 className="add-group-title">{groupId ? "Update Group" : "Add Group"}</h2>
            <form>
                <div className="group-input-container">
                    <label className="group-name-label">Group Name</label>
                    <input
                        className="group-name-input"
                        type="text"
                        name={"groupName"}
                        value={groupName}
                        placeholder={"Enter Group Name"}
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                </div>

                <table className="table">
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
                                value={selectedOptionUser as OptionType[]}
                                onChange={handleSelectChangeUser}
                                options={options}
                                isMulti={true}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Example Function 2</td>
                        <td>
                            <Select
                                value={selectedOptionProduct as OptionType[]}
                                onChange={handleSelectChangeProduct}
                                options={options}
                                isMulti={true}
                            />
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
            <button className="cancel-button" onClick={hideOverlay}>Cancel</button>
            <button
                className="add-button"
                onChange={handleSubmit}
            >
                {groupId ? "Update" : "Add"}
            </button>
        </div>
    );
};

export const ManagementGroup: React.FC = () => {

    const [groups, setGroups] = React.useState<Group[]>([
        {
            id: 1,
            name: "View Dashboard",
            status: true,
        },
        {
            id: 2,
            name: "Edit User",
            status: false,
        }
    ]);
    const [showOverlay, setShowOverlay] = React.useState(false);
    const [groupId, setGroupId] = React.useState<number | null>(null);

    const handleShowOverlay = () => {
        setShowOverlay(true);
    }

    const handleHideOverlay = () => {
        setShowOverlay(false);
        setGroupId(null);
    }

    const listGroups = groups.map((group) => {
            return (
                <tr key={group.id}>
                    <td>{group.id}</td>
                    <td>{group.name}</td>
                    <td>{group.status ? "Active" : "InActive"}</td>
                    <td>
                        <button
                            className="edit-button"
                            onClick={() => {
                                setGroupId(group.id);
                                handleShowOverlay();
                            }}
                        >
                            Edit
                        </button>
                    </td>
                </tr>
            )
        }
    );


    return (
        <div className="container-right">
            <h2 className={"primary-label"}>Group Management</h2>
            <p className={"primary-description"}>Here you can manage the permissions of the group</p>
            <button className="add-button" onClick={handleShowOverlay}>Add Group</button>
            <table className="table id-column">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Permission Name</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {listGroups}
                </tbody>
            </table>
            {showOverlay && (
                <OverLay>
                    <AddGroupComponent hideOverlay={handleHideOverlay} groupId={groupId}/>
                </OverLay>
            )}
        </div>
    );
}
