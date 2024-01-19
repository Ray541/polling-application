import { useParams } from 'react-router-dom';
import { supabase } from '../../supabase/supabaseClient';
import { useEffect, useState } from 'react';

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

  const fetchUserId = async () => {
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();
    if (sessionError || !sessionData?.session?.user?.id) {
      return null;
    } else {
      return sessionData.session.user.id;
    }
  };
  fetchUserId();
  
  return (
    <>
      <section>
        <p>Poll Result for Poll ID: {pollData?.poll_id}</p>
        <p>Poll Question: {pollData?.question}</p>
        <p>
          Option:
          {pollData?.options?.map((option, index) => (
            <span key={index}> {option.option_text} </span>
          ))}
        </p>
        <p>Poll Created At: {pollData?.created_at}</p>
      </section>
    </>
  );
};

export default PollResult;
