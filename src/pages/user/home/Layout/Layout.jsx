import { Card as CardAntd, Col, Row, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useState } from 'react';
import { Card } from './components';

function Layout() {
  const userInfo = useSelector((state) => state.authStore.userInfo);
  const dispatch = useDispatch();

  const [questions, setQuestions] = useState(null);
  const [newQuestions, setNewQuestions] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { answers } = await dispatch.appStore.doGetQuestionByUser(
          userInfo.id,
        );

        const { questions, newQuestions } =
          await dispatch.appStore.doGetQuestions(Object.keys(answers));

        setQuestions(questions);
        setNewQuestions(newQuestions);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [dispatch.appStore, userInfo]);

  return (
    <>
      {newQuestions && (
        <CardAntd
          title={
            <Typography className="text-center text-3xl">
              New Question
            </Typography>
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

      {questions && (
        <CardAntd
          className="mt-10"
          title={<Typography className="text-center text-3xl">Done</Typography>}
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
