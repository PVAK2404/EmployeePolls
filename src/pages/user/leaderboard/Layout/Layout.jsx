import { Avatar, Col, Row, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const columns = [
  {
    title: 'Users',
    dataIndex: 'users',
    key: 'users',
    render: (_, { avatarURL, id, name }) => (
      <>
        <Row>
          <Col>
            <Avatar size={64} src={avatarURL} />
          </Col>
          <Col className="my-auto">
            <Typography.Text className="text-xl">{name}</Typography.Text>
            <div>
              <Typography.Text className="text-gray-400">{id}</Typography.Text>
            </div>
          </Col>
        </Row>
      </>
    ),
  },
  {
    title: 'Answered',
    dataIndex: 'answered',
    key: 'answered',
    render: (_, { answers }) => (
      <Typography.Text>{Object.values(answers).length}</Typography.Text>
    ),
  },
  {
    title: 'Created',
    dataIndex: 'created',
    key: 'created',
    render: (_, { questions }) => (
      <Typography.Text>{questions.length}</Typography.Text>
    ),
  },
];

function Layout() {
  const dispatch = useDispatch();
  const [users, setUsers] = useState(null);

  useEffect(() => {
    (async () => {
      const result = await dispatch.appStore.doGetLeaderboardInfo();

      setUsers(result);
    })();
  }, [dispatch.appStore]);

  return <Table columns={columns} dataSource={users} />;
}

export default Layout;
