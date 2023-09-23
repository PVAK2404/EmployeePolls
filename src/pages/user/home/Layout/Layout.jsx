import { LoadingOutlined } from '@ant-design/icons';
import { Card as CardAntd, Col, Row, Spin, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useState } from 'react';
import { Card } from './components';

function Layout() {
  const userInfo = useSelector((state) => state.authStore.userInfo);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [newQuestions, setNewQuestions] = useState([]);

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

  return (
    <>
      {newQuestions.length !== 0 && (
        <CardAntd
          title={
            <Typography className="text-center text-3xl">Unanswered</Typography>
          }
          bordered={false}
        >
          <Row gutter={[16, 24]} className="mx-auto">
            {newQuestions.map((question) => (
              <Col key={question.id} span={6}>
                <Card question={question} />
              </Col>
            ))}
          </Row>
        </CardAntd>
      )}

      {questions.length !== 0 && (
        <CardAntd
          className="mt-10"
          title={
            <Typography className="text-center text-3xl">Answered</Typography>
          }
          bordered={false}
        >
          <Row gutter={[16, 24]} className="mx-auto">
            {questions.map((question) => (
              <Col key={question.id} span={6}>
                <Card question={question} />
              </Col>
            ))}
          </Row>
        </CardAntd>
      )}
    </>
  );
}

export default Layout;
