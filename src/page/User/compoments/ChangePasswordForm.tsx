import React, { useState } from 'react';
import { Form, Button, Alert, Container, CloseButton } from 'react-bootstrap';
import ValidatePassword from '../../../util/Validate/ValidatePassword';
import UpdateAccountAPI from '../../../services/Authen/UpdateAccountAPI';
import { OverLay } from '../../../compoments/OverLay/OverLay';

interface ChangePasswordFormProps {
  userId: string;
  hideOver: () => void;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ userId, hideOver }) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage('Confirmation password does not match.');
      setSuccessMessage('');
    } else if (ValidatePassword(newPassword)) {
      setErrorMessage(ValidatePassword(newPassword));
      setSuccessMessage('');
    } else {
      setIsLoading(true);
      UpdateAccountAPI(userId, { password: newPassword })
        .then(() => {
          setErrorMessage('');
          setSuccessMessage('Your password has been changed successfully!');
          setTimeout(() => {
            hideOver();
          }, 2000);
        }).catch((error) => {
          setErrorMessage(error.message);
          setSuccessMessage('');
        }).finally(() => {
          setNewPassword('');
          setConfirmPassword('');
          setIsLoading(false);
        });
    }
  };

  return (
    <OverLay>
      <Container className="position-relative bg-light p-4 rounded" style={{ width: "550px" }}>
        <CloseButton
          onClick={() => { hideOver() }}
          className="position-absolute btn-close"
          style={{ top: "20px", right: "20px", cursor: 'pointer' }}
        />
        <h2 className="text-center fw-bold">Change Password</h2>
        <Form onSubmit={handleSubmit}>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          <Form.Group controlId="formNewPassword" className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              className='p-3'
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formConfirmPassword" className="mb-3">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              className='p-3'
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button disabled={isLoading || successMessage !== ""} variant="primary" type="submit" className="w-100 py-3 rounded" style={{ fontWeight: 'bold', letterSpacing: '1px' }}>
            {isLoading ? 'Loading...' : 'Change Password'}
          </Button>
        </Form>
      </Container>
    </OverLay>
  );
};

export default ChangePasswordForm;
