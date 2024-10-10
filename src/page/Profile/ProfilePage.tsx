import React from "react";
import { Col, FloatingLabel, FormControl, FormSelect, Image, Row } from "react-bootstrap";
import { Profile } from "../../interface/Profile";
import GetProfileByTokenAPI from "../../services/Authen/GetProfileByTokenAPI";
import { useDispatchMessage } from "../../Context/ContextMessage";
import ActionTypeEnum from "../../enum/ActionTypeEnum";

const ProfilePage: React.FC = () => {

    const dispatch = useDispatchMessage();
    const [profile, setProfile] = React.useState<Profile>();

    React.useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            GetProfileByTokenAPI(token)
                .then((responseProfile) => {
                    setProfile(responseProfile);
                })
                .catch((error) => {
                    dispatch({ message: error.message, type: ActionTypeEnum.ERROR });
                })
        } else {
            dispatch({ message: "Token not found", type: ActionTypeEnum.ERROR });
        }
    }, [dispatch]);

    return (
        <div className="d-flex justify-content-center mt-5">
            <div className="bg-white rounded shadow p-4" style={{ width: "1000px", minHeight: "500px" }}>
                <div className="d-flex flex-row justify-content-between border-bottom p-3">
                    <div className="d-flex flex-row justify-content-start align-items-center gap-4">
                        <Image src={profile?.avatar || "/images/default-avt.png"} roundedCircle width={100} height={100} />
                        <div className="d-flex flex-column">
                            <span className="fw-bold h5">{profile?.fullName}</span>
                            <span>{profile?.position}</span>
                            <span>{profile?.role.name}</span>
                        </div>
                    </div>
                    <div>
                        <button className="btn btn-link">Change Password</button>
                    </div>
                </div>
                <div className="d-flex flex-column justify-content-center p-3">
                    <FloatingLabel
                        label="Username"
                        className="mb-3"
                    >
                        <FormControl type="text" value={profile?.username} readOnly />
                    </FloatingLabel>
                    <FloatingLabel
                        label="FullName"
                        className="mb-3"
                    >
                        <FormControl type="text" value={profile?.fullName} />
                    </FloatingLabel>
                    <div>
                        <Row>
                            <Col>
                                <FloatingLabel
                                    label="Birthday"
                                    className="mb-3"
                                >
                                    <FormControl type="date" value={profile?.dateOfBirth} />
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel
                                    label="Gender"
                                >
                                    <FormSelect value={profile?.gender}>
                                        <option>-- Select a gender --</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Others">Others</option>
                                    </FormSelect>
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </div>
                    <div>
                        <Row>
                            <Col>
                                <FloatingLabel
                                    label="Email"
                                    className="mb-3"
                                >
                                    <FormControl type="email" value={profile?.email} />
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel
                                    label="PhoneNumber"
                                    className="mb-3"
                                >
                                    <FormControl type="phone" value={profile?.phoneNumber} />
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </div>
                    <FloatingLabel
                        label="Address"
                        className="mb-3"
                    >
                        <FormControl type="text" value={profile?.address} />
                    </FloatingLabel>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;