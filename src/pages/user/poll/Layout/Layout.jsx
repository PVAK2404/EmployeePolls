import { Avatar, Button, Card, Col, Row, Typography } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

function Layout() {
  const userInfo = useSelector((state) => state.authStore.userInfo);
  const dispatch = useDispatch();
  const location = useLocation();

  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleOnClick = async (e) => {
    try {
      const authedUser = userInfo.id;
      const qid = selectedQuestion.id;
      const answer = e.target.value;

      const result = await dispatch.appStore.doSaveQuestionAnswer({
        authedUser,
        qid: selectedQuestion.id,
        answer: e.target.value,
      });

      if (result) {
        dispatch.authStore.setUserInfo({
          ...userInfo,
          answers: { ...userInfo.answers, [qid]: answer },
        });

        setSelectedQuestion((prev) => ({
          ...prev,
          [answer]: {
            ...prev[answer],
            votes: prev[answer].votes.concat([authedUser]),
          },
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const countAllVote = useMemo(() => {
    if (selectedQuestion) {
      return (
        selectedQuestion.optionOne.votes.length +
        selectedQuestion.optionTwo.votes.length
      );
    }
  }, [selectedQuestion]);

  useEffect(() => {
    (async () => {
      try {
        const id = location.pathname.split('/').pop();
        const question = await dispatch.appStore.doGetQuestion(id);

        setSelectedQuestion(question);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [dispatch.appStore, location.pathname]);

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
        {selectedQuestion.optionOne.votes.includes(userInfo.id) ||
        selectedQuestion.optionTwo.votes.includes(userInfo.id) ? (
          <Row gutter={[16, 16]} className="w-3/5 mx-auto">
            <Col span={12}>
              <Card
                title={
                  <Typography.Text>
                    {selectedQuestion.optionOne.text}
                  </Typography.Text>
                }
              >
                <Typography.Text>
                  Votes: {selectedQuestion.optionOne.votes.length} (
                  {Math.round(
                    (selectedQuestion.optionOne.votes.length / countAllVote) *
                      100,
                  )}{' '}
                  %)
                </Typography.Text>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                title={
                  <Typography.Text>
                    {selectedQuestion.optionTwo.text}
                  </Typography.Text>
                }
              >
                <Typography.Text>
                  Votes: {selectedQuestion.optionTwo.votes.length} (
                  {Math.round(
                    (selectedQuestion.optionTwo.votes.length / countAllVote) *
                      100,
                  )}{' '}
                  %)
                </Typography.Text>
              </Card>
            </Col>
          </Row>
        ) : (
          <Row gutter={[16, 16]} className="w-3/5 mx-auto">
            <Col span={12}>
              <Card
                title={
                  <Typography.Text>
                    {selectedQuestion.optionOne.text}
                  </Typography.Text>
                }
              >
                <Button
                  className="w-full"
                  type="primary"
                  onClick={handleOnClick}
                  value="optionOne"
                >
                  Click
                </Button>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                title={
                  <Typography.Text>
                    {selectedQuestion.optionTwo.text}
                  </Typography.Text>
                }
              >
                <Button
                  className="w-full"
                  type="primary"
                  onClick={handleOnClick}
                  value="optionTwo"
                >
                  Click
                </Button>
              </Card>
            </Col>
          </Row>
        )}
      </div>
    )
  );
}

export default Layout;
