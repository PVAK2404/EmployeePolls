import { Alert, Button, Form, Input, Typography } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Layout() {
  const userInfo = useSelector((state) => state.authStore.userInfo);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFinish = async (payload) => {
    try {
      setLoading(true);
      const question = await dispatch.appStore.doAddQuestion({
        ...payload,
        author: userInfo.id,
      });
      navigator(`/questions/${question.id}`);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-3/5 mx-auto">
      <div className="text-center">
        <Typography.Title level={2} className="mt-3">
          Would You Rather
        </Typography.Title>
        <Typography.Text level={2}>Create Your Own Poll</Typography.Text>
      </div>
      <Form layout="vertical" onFinish={handleFinish}>
        {error && (
          <Alert
            type="error"
            message={error}
            showIcon
            closeIcon
            onClose={() => setError(null)}
            className="mb-5"
          />
        )}
        <Form.Item
          name="optionOneText"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="First Option" size="large" allowClear />
        </Form.Item>
        <Form.Item
          name="optionTwoText"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Second Option" size="large" allowClear />
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
  );
}

export default Layout;
