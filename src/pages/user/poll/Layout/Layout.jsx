import { LoadingOutlined } from '@ant-design/icons';
import { Avatar, Row, Spin, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Choose, Detail } from './components';

function Layout() {
  const userInfo = useSelector((state) => state.authStore.userInfo);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigator = useNavigate();

  const [loading, setLoading] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const id = location.pathname.split('/').pop();
        const question = await dispatch.appStore.doGetQuestion(id);

        setSelectedQuestion(question);
      } catch (err) {
        if (err.message === '404') {
          navigator('/404');
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch.appStore, location.pathname, navigator]);

  if (loading)
    return (
      <div className="flex h-full justify-center items-center">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 180 }} spin />} />
      </div>
    );

  return (
    selectedQuestion && (
      <div className="text-center">
        <Typography.Title level={2}>
          Poll by {selectedQuestion.author}
        </Typography.Title>
        <Avatar size={320} src={selectedQuestion.avatarURL} />
        <Typography.Title level={2} className="mt-3">
          Would You Rather
        </Typography.Title>
        <Row gutter={[16, 16]} className="w-3/5 mx-auto">
          {selectedQuestion.optionOne.votes.includes(userInfo.id) ||
          selectedQuestion.optionTwo.votes.includes(userInfo.id) ? (
            <Detail selectedQuestion={selectedQuestion} userInfo={userInfo} />
          ) : (
            <Choose selectedQuestion={selectedQuestion} userInfo={userInfo} />
          )}
        </Row>
      </div>
    )
  );
}

export default Layout;
