import { useParams } from 'react-router-dom';
import { supabase } from '../../supabase/supabaseClient';
import { useEffect, useState } from 'react';
import {
  StyledPollResult,
  StyledPollResultTitle,
  StyledPollDetails,
  StyledResultText,
  StyledResultDetails,
  StyledPollTextDetails,
  StyledPollGraphTitle,
  StyledGraphHolder,
} from './PollResult.styled';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
);

const chartOptionsBar = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Poll Result Bar Chart',
    },
  },
};

const chartOptionsLine = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Poll Result Line Chart',
    },
  },
};

interface PollData {
  poll_id: string;
  question: string;
  options: {
    option_id: number;
    poll_id: number;
    option_text: string;
  }[];
  creator_id: string;
  created_at: string;
}

interface VoteCounts {
  [key: number]: number;
}

const PollResult = () => {
  const { pollId } = useParams();

  const [pollData, setPollData] = useState<PollData | null>(null);
  const [voteCounts, setVoteCounts] = useState<VoteCounts>({});

  useEffect(() => {
    const fetchPoll = async () => {
      const { data: pollData, error: pollDataError } = await supabase
        .from('polls')
        .select('*, options (*)')
        .eq('poll_id', pollId);

      if (pollDataError) {
        console.log(pollDataError);
      } else {
        setPollData(pollData[0]);
      }
    };

    fetchPoll();
  }, [pollId]);

  useEffect(() => {
    const getPollResults = async (pollId: any) => {
      const { data, error } = await supabase
        .from('votes')
        .select('option_id')
        .eq('poll_id', pollId);

      if (data) {
        let newVoteCounts: any = {};
        data.forEach((vote) => {
          if (newVoteCounts[vote.option_id]) {
            newVoteCounts[vote.option_id]++;
          } else {
            newVoteCounts[vote.option_id] = 1;
          }
        });
        setVoteCounts(newVoteCounts);
      } else {
        console.log(error);
      }
    };

    getPollResults(pollId);
  }, [pollId, voteCounts]);

  let labels: string[] = [];
  let data: number[] = [];

  if (pollData && pollData.options) {
    pollData.options.forEach((option) => {
      labels.push(option.option_text);
      data.push(voteCounts[option.option_id] || 0);
    });
  }

  const chartData = {
    labels: pollData?.options?.map((option) => option.option_text) || [],
    datasets: [
      {
        label: 'Vote Counts',
        data:
          pollData?.options?.map(
            (option) => voteCounts[option.option_id] || 0,
          ) || [],
        backgroundColor: ['rgba(75, 192, 192, 0.15)'],
        borderColor: ['rgba(75, 192, 192, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <StyledPollResult>
        <StyledPollResultTitle>Poll Result</StyledPollResultTitle>

        <StyledPollTextDetails>
          <StyledPollDetails>
            <StyledResultText>Poll Information :</StyledResultText>
            <StyledResultText>Poll ID: {pollData?.poll_id}</StyledResultText>
            <StyledResultText>
              Poll Question: {pollData?.question}
            </StyledResultText>
            <StyledResultText>
              Option:
              {pollData?.options?.map((option, index) => (
                <span key={index}> {option.option_text} </span>
              ))}
            </StyledResultText>
            <StyledResultText>
              Poll Created At: {pollData?.created_at}
            </StyledResultText>
          </StyledPollDetails>
          <StyledPollDetails>
            <StyledResultText>Poll Results:</StyledResultText>
            {pollData?.options?.map((option, index) => (
              <StyledResultText key={index}>
                {option.option_text}: {voteCounts[option.option_id]! || 0} votes
                <br />
              </StyledResultText>
            ))}
          </StyledPollDetails>
        </StyledPollTextDetails>

        <StyledGraphHolder>
          <StyledPollGraphTitle>Graphs:</StyledPollGraphTitle>
          <StyledResultDetails>
            <Bar options={chartOptionsBar} data={chartData} />
          </StyledResultDetails>
          <StyledResultDetails>
            <Line data={chartData} options={chartOptionsLine} />
          </StyledResultDetails>
        </StyledGraphHolder>
      </StyledPollResult>
    </>
  );
};

export default PollResult;
