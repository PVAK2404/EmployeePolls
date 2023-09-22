import { Layout, Menu } from 'antd';
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const { Header: HeaderAntd } = Layout;

const items = [
  { key: '', label: 'Home' },
  { key: 'leaderboard', label: 'Leaderboard' },
  { key: 'new', label: 'New' },
];

function Header() {
  const location = useLocation();
  const navigator = useNavigate();

  const mode = useMemo(() => {
    if (location.pathname.includes('leaderboard')) {
      return 'leaderboard';
    }

    if (location.pathname.includes('new')) {
      return 'new';
    }

    if (location.pathname.includes('')) {
      return 'home';
    }

    return null;
  }, [location.pathname]);

  return (
    <HeaderAntd>
      <Menu
        selectedKeys={mode}
        theme="dark"
        mode="horizontal"
        items={items}
        onClick={({ key }) => navigator(key)}
      />
    </HeaderAntd>
  );
}

export default Header;
