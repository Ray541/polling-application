import { useParams } from 'react-router-dom';
import { supabase } from '../../supabase/supabaseClient';
import { useEffect, useState } from 'react';

const PollResult = () => {
  const { pollId } = useParams();

  const [pollData, setPollData] = useState({});

  useEffect(() => {
    const fetchPoll = async () => {
      const { data, error } = await supabase
        .from('polls')
        .select('*')
        .eq('poll_id', pollId);
        
        if(error)
        {
          console.log(error);
        } else {
          setPollData(data[0]);
        }
    };

    fetchPoll();
  }, [pollId]);

  return <div>Poll Result for Poll ID: {pollId}</div>;
};

export default PollResult;
