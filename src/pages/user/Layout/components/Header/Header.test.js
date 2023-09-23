import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Gate, { store } from 'stores';
import Header from '.';

describe('Header', () => {
  test('renders correctly', () => {
    store.dispatch.authStore.setUserInfo({
      id: 'tylermcginnis',
      name: 'Tyler McGinnis',
      avatarURL:
        'https://cdn.dribbble.com/users/29574/screenshots/4826855/media/eed56dc346687c0386b77e431381a9ee.png?compress\u003d1\u0026resize\u003d400x300\u0026vertical\u003dtop',
    });

    const { asFragment } = render(
      <Gate>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Gate>,
    );

    expect(asFragment()).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });
});
