import {
  Alert,
  Layout as AntLayout,
  Button,
  Form,
  Input,
  Typography,
} from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const { Content } = AntLayout;
const { Title } = Typography;

function Layout() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigator = useNavigate();
  const location = useLocation();

  const handleFinish = async (payload) => {
    try {
      setLoading(true);
      await dispatch.authStore.doSignUp(payload);
      navigator(location.pathname);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AntLayout className="h-screen">
      <Content className="container mx-auto w-1/4">
        <div className="relative top-1/4">
          <Title level={1} className="text-center">
            Login
          </Title>
          <Form layout="vertical" onFinish={handleFinish}>
            {error && (
              <Alert
                data-testid="alert"
                type="error"
                message={error}
                showIcon
                closeIcon
                onClose={() => setError(null)}
                className="mb-5"
              />
            )}
            <Form.Item
              name="user"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="User" size="large" allowClear />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Password" size="large" allowClear />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                loading={loading}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </AntLayout>
  );
}

export default Layout;
