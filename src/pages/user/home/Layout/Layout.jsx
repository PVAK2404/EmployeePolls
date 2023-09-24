import { LoadingOutlined } from '@ant-design/icons';
import { Col, Row, Spin, Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useState } from 'react';
import { Card } from './components';

function Layout() {
  const userInfo = useSelector((state) => state.authStore.userInfo);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [newQuestions, setNewQuestions] = useState([]);

  const items = [
    {
      key: '1',
      label: 'Unanswered',
      children: (
        <Row gutter={[16, 24]} className="mx-auto">
          {newQuestions.length !== 0 &&
            newQuestions.map((question) => (
              <Col key={question.id} span={6}>
                <Card question={question} />
              </Col>
            ))}
        </Row>
      ),
    },
    {
      key: '2',
      label: 'Answered',
      children: (
        <Row gutter={[16, 24]} className="mx-auto">
          {questions.length !== 0 &&
            questions.map((question) => (
              <Col key={question.id} span={6}>
                <Card question={question} />
              </Col>
            ))}
        </Row>
      ),
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { answers } = await dispatch.appStore.doGetQuestionByUser(
          userInfo.id,
        );

        const { questions, newQuestions } =
          await dispatch.appStore.doGetQuestions(Object.keys(answers));

        setQuestions(
          questions.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1)),
        );
        setNewQuestions(
          newQuestions.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1)),
        );
      } catch (err) {
        console.err(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch.appStore, userInfo]);

  if (loading)
    return (
      <div className="flex h-full justify-center items-center">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 180 }} spin />} />
      </div>
    );

  return <Tabs defaultActiveKey="1" items={items} />;
}

export default Layout;
