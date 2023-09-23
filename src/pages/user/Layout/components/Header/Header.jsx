import { Avatar, Button, Layout, Menu, Typography } from 'antd';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const { Header: HeaderAntd } = Layout;

const items = [
  { key: '', label: 'Home' },
  { key: 'leaderboard', label: 'Leaderboard' },
  { key: 'new', label: 'New' },
];

function Header() {
  const userInfo = useSelector((state) => state.authStore.userInfo);
  const dispatch = useDispatch();

  const location = useLocation();
  const navigator = useNavigate();

  const handleOnClick = () => {
    dispatch.authStore.doSignOut();
    navigator('/');
  };

  const mode = useMemo(() => {
    if (location.pathname.includes('leaderboard')) {
      return 'leaderboard';
    }

    if (location.pathname.includes('new')) {
      return 'new';
    }

    if (location.pathname.includes('')) {
      return '';
    }

    return null;
  }, [location.pathname]);

  return (
    <HeaderAntd className="bg-inherit">
      <div className="flex justify-between ant-no-bottom-line">
        <Menu
          selectedKeys={mode}
          className="bg-inherit"
          mode="horizontal"
          items={items}
          onClick={({ key }) => navigator(key)}
        />
        <div className="flex justify-between items-center space-x-5">
          <div>
            <Avatar src={userInfo.avatarURL} size="large" />
            <Typography.Text>{userInfo.name}</Typography.Text>
          </div>
          <Button type="text" onClick={handleOnClick}>
            Logout
          </Button>
        </div>
      </div>
    </HeaderAntd>
  );
}

export default Header;
