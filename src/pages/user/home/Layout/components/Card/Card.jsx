import { Button, Card as CardAntd, Typography } from 'antd';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

function Card({ question }) {
  const navigator = useNavigate();

  const formattedTime = useMemo(() => {
    const date = new Date(question.timestamp);

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    const formattedTime = `${hours % 12}:${minutes
      .toString()
      .padStart(2, '0')} ${ampm}`;

    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const formattedDate = `${month.toString().padStart(2, '0')}/${day
      .toString()
      .padStart(2, '0')}/${year}`;

    return `${formattedTime} | ${formattedDate}`;
  }, [question]);

  return (
    <CardAntd
      title={
        <Typography className="text-center">
          <Typography>
            <Typography.Text className="text-xl">
              {question.author}
            </Typography.Text>
          </Typography>
          <Typography>
            <Typography.Text className="font-thin text-gray-400">
              {formattedTime}
            </Typography.Text>
          </Typography>
        </Typography>
      }
      bordered={false}
      type="inner"
    >
      <Button
        className="w-full"
        type="primary"
        onClick={() => navigator(`questions/${question.id}`)}
      >
        Show
      </Button>
    </CardAntd>
  );
}

export default Card;
