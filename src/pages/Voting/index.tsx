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
import Cookies from 'js-cookie';
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

declare global {
  interface Window {
    logedUser: string;
  }
}

const Poll = () => {
  const { pollId } = useParams();

  const [pollData, setPollData] = useState<PollData | null>(null);

  const userVotingStatus = `hasVoted-${pollId}-${window.logedUser}`;
  const [finalVoted, setFinalVoted] = useState(Cookies.get(userVotingStatus));
  const [votedOption, setVotedOption] = useState('');
  const [hasVoted, setHasVoted] = useState(false);

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

  supabase.auth.onAuthStateChange((_event, session) => {
    if (session && session.user) {
      window.logedUser = session.user.id;
    }
  });

  const handleVote = (option: { option_id: number; option_text: string }) => {
    console.log(`Voted for ${option.option_text}`);
    const castVote = async (pollId: any, optionId: any) => {
      const { data, error } = await supabase
        .from('votes')
        .insert([
          { poll_id: pollId, voter_id: window.logedUser, option_id: optionId },
        ]);
      return { data, error };
    };
    castVote(pollData?.poll_id, option.option_id);
    setHasVoted(true);
    setVotedOption(option.option_text);
  };

  useEffect(() => {
    const fetchRecords = async () => {
      if (pollData) {
        try {
          const { data, error } = await supabase
            .from('votes')
            .select('voter_id, options (option_id, option_text)')
            .eq('voter_id', window.logedUser)
            .eq('poll_id', pollId);

          console.log(data);

          if (data != null && data.length != 0) {
            Cookies.set(userVotingStatus, 'true');
            setFinalVoted(`true`);
            setHasVoted(true);
            setVotedOption(data[0].options.option_text);
          } else {
            Cookies.set(userVotingStatus, 'false');
            setFinalVoted(`false`);
            setHasVoted(false);
          }

          if (error) {
            console.error('Error fetching records:', error);
          }
        } catch (error) {
          console.error('Error fetching records:', error);
        }
      }
    };

    fetchRecords();
  }, [pollData, pollId]);

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
              Voting can be done only Once
            </StyledVoteText>
            {hasVoted ? (
              <StyledVoteText>
                You have Already Voted for {votedOption}.
              </StyledVoteText>
            ) : (
              finalVoted === `false` &&
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

export default Poll;
