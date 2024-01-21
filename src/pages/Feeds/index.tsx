import React, { useState, useEffect } from 'react';
import { StyledPollList } from './Feeds.styled';
import { supabase } from '../../supabase/supabaseClient';
import PollCard from '../../components/PollCard';

interface Poll {
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

const Feeds = () => {

  const [pollData, setPollData] = useState<Poll[]>([]);
  // const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const fetchPolls = async () => {
      const { data, error } = await supabase
        .from('polls')
        .select('*, options: options (option_text)');
      if (error) {
        console.log(error);
      } else {
        setPollData(data);
      }
      const { error: optionsError } = await supabase
        .from('options')
        .select('*');
      if (optionsError) {
        console.log(optionsError);
      }

      // setTrigger(!trigger);
    };

    fetchPolls();
  }, []);

  return (
    <>
      <header className="bg-white shadow-sm h-full">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Feeds
          </h1>
        </div>
      </header>
      <main className="mx-auto max-w-7xl py-6">
        <h1 className="w-full text-center text-2xl tracking-tight">
          Polls Others Created
        </h1>
        <StyledPollList className="mx-auto max-w-7xl py-6 px-1 sm:px-6 lg:px-8">
          {pollData.map((poll, index) => (
            <PollCard key={index} data={[poll]} />
          ))}
        </StyledPollList>
      </main>
    </>
  );
};

export default Feeds;
