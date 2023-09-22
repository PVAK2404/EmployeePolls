import { Layout as LayoutAntd } from 'antd';
import { Outlet } from 'react-router-dom';
import { Header } from './components';

const { Content } = LayoutAntd;

function Layout() {
  return (
    <LayoutAntd className="h-screen">
      <Header />
      <Content className="container mx-auto pt-5">
        <Outlet />
      </Content>
    </LayoutAntd>
  );
}

export default Layout;
