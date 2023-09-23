import { Button, Card, Col, Typography } from 'antd';
import { useDispatch } from 'react-redux';

function Choose({ selectedQuestion, userInfo, setSelectedQuestion }) {
  const dispatch = useDispatch();

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

  return (
    <>
      <Col span={12}>
        <Card
          title={
            <Typography.Text>{selectedQuestion.optionOne.text}</Typography.Text>
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
            <Typography.Text>{selectedQuestion.optionTwo.text}</Typography.Text>
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
    </>
  );
}

export default Choose;
