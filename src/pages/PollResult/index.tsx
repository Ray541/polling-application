import { useParams } from 'react-router-dom';
import { supabase } from '../../supabase/supabaseClient';
import { useEffect, useState } from 'react';
import {
  StyledPollResult,
  StyledPollDetails,
  StyledResultText,
  StyledResultDetails,
} from './PollResult.styled';
import { PostgrestBuilder } from '@supabase/supabase-js';

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

interface VoteCount {
  option_id: number;
  count: number;
}

const PollResult = () => {
  const { pollId } = useParams();

  const [pollData, setPollData] = useState<PollData | null>(null);
  const [voteCounts, setVoteCounts] = useState<VoteCount[] | null>(null);

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
        .from<PostgrestBuilder>('votes')
        .select('option_id, count(option_id)')
        .eq('poll_id', pollId)
        .group('option_id', { aggregate: 'count', by: 'option_id' });

      if (data) {
        console.log(data);
        setVoteCounts(data);
      } else {
        console.log(error);
      }
    };

    getPollResults(pollId);
  }, []);

  return (
    <>
      <StyledPollResult>
        <StyledPollDetails>
          <StyledResultText
            style={{ fontSize: 25, borderBottom: '1px solid silver' }}
          >
            Poll Information :
          </StyledResultText>
          <StyledResultText>
            Poll Result for Poll ID: {pollData?.poll_id}
          </StyledResultText>
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
        <StyledResultDetails>
          <StyledResultText
            style={{ fontSize: 25, borderBottom: '1px solid silver' }}
          >
            Poll Results:
          </StyledResultText>
          {voteCounts ? (
            voteCounts.map((voteCount) => (
              <StyledResultText key={voteCount.option_id}>
                Option {voteCount.option_id}: {voteCount.count} votes
              </StyledResultText>
            ))
          ) : (
            <StyledResultText>No votes yet</StyledResultText>
          )}
        </StyledResultDetails>
      </StyledPollResult>
    </>
  );
};

export default PollResult;
