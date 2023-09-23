import { Button, Card, Col, Typography } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Choose({ selectedQuestion, userInfo }) {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleOnClick = async (e) => {
    try {
      setLoading(true);
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

        navigator('/');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(true);
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
            loading={loading}
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
            loading={loading}
          >
            Click
          </Button>
        </Card>
      </Col>
    </>
  );
}

export default Choose;
