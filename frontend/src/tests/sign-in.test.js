import React from 'react';
import { render } from '@testing-library/react';
import Login from '../components/user-auth/sign-in';

describe('Test case for Login', () => {
  let wrapper;
  test('email check', () => {
    wrapper = render(<Login />);
    wrapper.getAllByText('input[type="text"]').simulate('change', {
      target: { name: 'email', value: 'email@email.com' },
    });
    expect(wrapper.state('email')).toEqual('email@email.com');
  });
});
