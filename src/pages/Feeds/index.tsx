import React, { useState, useEffect } from 'react';
import { StyledPollList } from './Feeds.styled';
import { supabase } from '../../supabase/supabaseClient';
import PollCard from '../../components/PollCard';
import SearchBar from '../../components/SearchInput/SearchInput';

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
  const [searchPoll, setSearchPoll] = useState('');
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

  /**@returns Displayes Filtered Poll on the basis of Poll Question */
  const filteredPolls = pollData.filter((poll) =>
    poll.question.toLowerCase().includes(searchPoll.toLowerCase()),
  );

  return (
    <>
      <header className="bg-white shadow-sm h-full">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Feeds
          </h1>
          <div className="flex" style={{ position: 'relative' }}>
            <SearchBar
              type={'text'}
              placeholder={'Search Poll...'}
              onChange={(e) => setSearchPoll(e.target.value)}
            />
            <svg
              style={{
                position: 'absolute',
                top: 2,
                right: 5,
                zIndex: 1,
                backgroundColor: 'white',
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="0.5"
              stroke="currentColor"
              className="w-5 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl py-6">
        <h1 className="w-full text-center text-2xl tracking-tight">
          Polls Others Created
        </h1>
        <StyledPollList className="mx-auto max-w-5xl py-6 px-1 sm:px-6 lg:px-8">
          {filteredPolls.map((poll, index) => (
            <PollCard key={index} data={[poll]} />
          ))}
        </StyledPollList>
      </main>
    </>
  );
};

export default Feeds;
