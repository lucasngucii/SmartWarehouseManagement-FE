import { Button, CloseButton, Container, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { OverLay } from "../../../compoments/OverLay/OverLay";
import { Form } from "react-router-dom";
import React from "react";

interface FormChangePasswordProps {
    closeModel: () => void;
}

const FormChangePassword: React.FC<FormChangePasswordProps> = (props) => {

    const [password, setPassword] = React.useState<string>('');
    const [newPassword, setNewPassword] = React.useState<string>('');
    const [confirmPassword, setConfirmPassword] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Call API here
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <OverLay>
            <Container className="position-relative bg-light p-4 rounded" style={{ width: "550px" }}>
                <CloseButton
                    onClick={() => { props.closeModel() }}
                    className="position-absolute btn-close"
                    style={{ top: "20px", right: "20px", cursor: 'pointer' }}
                />
                <h2 className="text-center fw-bold">Change Password</h2>
                <Form onSubmit={() => { }}>
                    <FormGroup controlId="formNewPassword" className="mb-3">
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            className='p-3'
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </FormGroup>
                    <FormGroup controlId="formNewPassword" className="mb-3">
                        <FormLabel>New Password</FormLabel>
                        <FormControl
                            className='p-3'
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </FormGroup>
                    <FormGroup controlId="formConfirmPassword" className="mb-3">
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl
                            className='p-3'
                            type="password"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </FormGroup>
                    <Button disabled={isLoading} variant="primary" type="submit" className="w-100 py-3 rounded" style={{ fontWeight: 'bold', letterSpacing: '1px' }}>
                        {isLoading ? 'Loading...' : 'Change Password'}
                    </Button>
                </Form>
            </Container>
        </OverLay>
    );
}

export default FormChangePassword;