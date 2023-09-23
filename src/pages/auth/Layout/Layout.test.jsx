import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Gate from 'stores';
import Layout from './Layout';

describe('Layout', () => {
  it('should render the component', () => {
    const { asFragment } = render(
      <Gate>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </Gate>,
    );
    expect(asFragment()).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });

  test('throws an error when login with account is wrong', async () => {
    render(
      <Gate>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </Gate>,
    );

    const userField = screen.getByPlaceholderText('User');
    const passwordField = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByText('Submit');

    fireEvent.change(userField, { target: { value: 'testuser' } });
    fireEvent.change(passwordField, { target: { value: 'testpassword' } });
    fireEvent.click(submitButton);

    await waitFor(
      () => {
        const alert = screen.getByTestId('alert');

        expect(alert.innerHTML.includes('Wrong username or password!')).toBe(
          true,
        );
      },
      { timeout: 1100 },
    );
  });

  test('should user name field, password field, and submit button are present on the page', async () => {
    render(
      <Gate>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </Gate>,
    );

    const userField = screen.getByPlaceholderText('User');
    const passwordField = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByText('Submit');

    expect(userField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});
