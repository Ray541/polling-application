import React, { useState, useEffect } from 'react';
import Button from '../../components/Button/Button';
import CreatePoll from '../CreatePoll';
import PollCard from '../../components/PollCard';
import { supabase } from '../../supabase/supabaseClient';
import { StyledPollList, Searchbar } from './Dashboard.style';

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

const Dashboard = () => {
  const [showCreatePoll, setShowCreatePoll] = useState(false);
  const [refetchTrigger, setRefetchTrigger] = useState(false);
  const [searchPoll, setSearchPoll] = useState('');

  const openCreatePoll = () => {
    setShowCreatePoll(true);
  };

  const closeCreatePoll = () => {
    setShowCreatePoll(false);
  };

  const [pollData, setPollData] = useState<Poll[]>([]);

  useEffect(() => {
    const fetchPolls = async () => {
      /**Fetch the username to get specific user's data on the basis of user_id */
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();
      if (sessionError || !sessionData?.session?.user?.id) return;

      const { data, error } = await supabase
        .from('polls')
        .select('*, options: options (option_text)')
        .eq('creator_id', sessionData.session.user.id);

      if (error) {
        console.log(error);
      } else {
        setPollData(data);
      }
    };

    fetchPolls();
  }, [refetchTrigger]);

  /**@returns Displayes Filtered Poll on the basis of Poll Question */
  const filteredPolls = pollData.filter((poll) =>
    poll.question.toLowerCase().includes(searchPoll.toLowerCase()),
  );

  return (
    <>
      <header className="bg-white shadow h-full">
        <div className="mx-auto max-w-7xl flex items-center justify-between m px-4 py-3.5 sm:px-6 lg:px-8 sm: flex-wrap">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
          <div className="flex" style={{ position: 'relative' }}>
            <Searchbar
              className="rounded-md"
              type="text"
              placeholder="Search Poll..."
              value={searchPoll}
              onChange={(e) => setSearchPoll(e.target.value)}
            />
            <svg
              style={{ position: 'absolute', top: 2, right: 5, zIndex: 555555, backgroundColor: "white" }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="0.5"
              stroke="currentColor"
              className="w-5 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
          <Button label="Create Poll" onClick={openCreatePoll} />
          {showCreatePoll && (
            <CreatePoll
              question=""
              options={['', '']}
              onClose={closeCreatePoll}
              onNewPoll={() => setRefetchTrigger((prev) => !prev)}
            />
          )}
        </div>
      </header>
      <main className="mx-auto max-w-5xl py-6">
        <h1 className="w-full text-center text-2xl tracking-tight">
          Polls You Created
        </h1>
        <StyledPollList className="mx-auto max-w-7xl py-6 px-1 sm:px-6 lg:px-8">
          {filteredPolls.map((poll, index) => (
            <PollCard key={index} data={[poll]} />
          ))}
        </StyledPollList>
      </main>
    </>
  );
};

export default Dashboard;
