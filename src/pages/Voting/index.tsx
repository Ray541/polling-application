import { useParams } from 'react-router-dom';
import { supabase } from '../../supabase/supabaseClient';
import { useEffect, useState } from 'react';

import {
  StyledVote,
  StyleVoteTitle,
  StyledVotingHolder,
  StyledVotePoster,
  StyledVoteText,
  StyledVotePanel,
  StyledVoteButtonHolder,
} from './Voting.styled';
import Button from '../../components/Button/Button';

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

const PollResult = () => {
  const { pollId } = useParams();

  const [pollData, setPollData] = useState<PollData | null>(null);

  /**Fetch the Poll details form the polls table from supabase */
  useEffect(() => {
    const fetchPoll = async () => {
      const { data, error } = await supabase
        .from('polls')
        .select('*, options (*)')
        .eq('poll_id', pollId);

      if (error) {
        console.log(error);
      } else {
        setPollData(data[0]);
      }
    };
    fetchPoll();
  }, [pollId]);

  const [hasVoted, setHasVoted] = useState(
    localStorage.getItem(`hasVoted-${pollId}`) === 'true',
  );

  const [chosenOption, setChosenOption] = useState('');
  const handleVote = (option: { option_id: number; option_text: string }) => {
    console.log(`Voted for ${option.option_text}`);

    const castVote = async (pollId: any, userId: any, optionId: any) => {
      const { data, error } = await supabase
        .from('votes')
        .insert([{ poll_id: pollId, voter_id: userId, option_id: optionId }]);
      return { data, error };
    };

    if (!hasVoted) {
      castVote(pollData?.poll_id, pollData?.creator_id, option.option_id);
      setHasVoted(true);
      setChosenOption(option.option_text)
      //to prevent Revote on page reload and handles the Voting for every other poll
      localStorage.setItem(`hasVoted-${pollId}`, 'true');
    }
  };

  return (
    <>
      <StyledVote>
        <StyleVoteTitle>Poll Voting</StyleVoteTitle>
        <StyledVotingHolder>
          <StyledVotePoster>
            <StyledVoteText>
              Poll Result for Poll ID: {pollData?.poll_id}
            </StyledVoteText>
            <StyledVoteText>Poll Question: {pollData?.question}</StyledVoteText>
            <StyledVoteText>
              Option:
              {pollData?.options?.map((option, index) => (
                <span key={index}> {option.option_text} </span>
              ))}
            </StyledVoteText>
            <StyledVoteText>
              Poll Created At: {pollData?.created_at}
            </StyledVoteText>
          </StyledVotePoster>
          <StyledVotePanel>
            <StyledVoteText>Poll Question: {pollData?.question}</StyledVoteText>
            <StyledVoteText>
              Rules:
              <br />
              Only one Option allowed to Vote.
              <br />
              Voting can be done only Onc
            </StyledVoteText>
            {hasVoted ? (
              <StyledVoteText>
                You have Already Voted for {chosenOption}.
              </StyledVoteText>
            ) : (
              pollData?.options?.map((option, index) => (
                <StyledVoteButtonHolder key={index}>
                  <Button
                    label={option.option_text}
                    onClick={() => handleVote(option)}
                  />
                </StyledVoteButtonHolder>
              ))
            )}
            <StyledVoteText></StyledVoteText>
          </StyledVotePanel>
        </StyledVotingHolder>
      </StyledVote>
    </>
  );
};

export default PollResult;
