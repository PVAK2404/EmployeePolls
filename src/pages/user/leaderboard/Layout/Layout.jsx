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
    render: (_, { created }) => <Typography.Text>{created}</Typography.Text>,
  },
];

function Layout() {
  const dispatch = useDispatch();
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await dispatch.appStore.doGetLeaderboardInfo();

        setUsers(
          result.sort((a, b) => {
            return Object.values(a.answers).length <
              Object.values(b.answers).length
              ? 1
              : Object.values(a.answers).length >
                Object.values(b.answers).length
              ? -1
              : a.created < b.created
              ? 1
              : -1;
          }),
        );
      } catch (err) {
        console.err(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch.appStore]);

  return <Table columns={columns} dataSource={users} loading={loading} />;
}

export default Layout;
