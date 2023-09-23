import { Card, Col, Typography } from 'antd';
import { useMemo } from 'react';

function Detail({ selectedQuestion, userInfo }) {
  const countAllVote = useMemo(() => {
    if (selectedQuestion) {
      return (
        selectedQuestion.optionOne.votes.length +
        selectedQuestion.optionTwo.votes.length
      );
    }
  }, [selectedQuestion]);

  return (
    <>
      <Col span={12}>
        <Card
          className={
            selectedQuestion.optionOne.votes.includes(userInfo.id) &&
            'bg-green-300'
          }
          title={
            <Typography.Text>{selectedQuestion.optionOne.text}</Typography.Text>
          }
        >
          <Typography.Text>
            Votes: {selectedQuestion.optionOne.votes.length} (
            {Math.round(
              (selectedQuestion.optionOne.votes.length / countAllVote) * 100,
            )}{' '}
            %)
          </Typography.Text>
        </Card>
      </Col>
      <Col span={12}>
        <Card
          className={
            selectedQuestion.optionTwo.votes.includes(userInfo.id) &&
            'bg-green-300'
          }
          title={
            <Typography.Text>{selectedQuestion.optionTwo.text}</Typography.Text>
          }
        >
          <Typography.Text>
            Votes: {selectedQuestion.optionTwo.votes.length} (
            {Math.round(
              (selectedQuestion.optionTwo.votes.length / countAllVote) * 100,
            )}{' '}
            %)
          </Typography.Text>
        </Card>
      </Col>
    </>
  );
}

export default Detail;
