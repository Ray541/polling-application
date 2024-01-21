import React, { useState, useEffect } from 'react';
import Button from '../../components/Button/Button';
import CreatePoll from '../CreatePoll';
import PollCard from '../../components/PollCard';
import { supabase } from '../../supabase/supabaseClient';
import { StyledPollList } from './Dashboard.style';

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
  }, []);

  return (
    <>
      <header className="bg-white shadow h-full">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
          <Button label="Create Poll" onClick={openCreatePoll} />
          {showCreatePoll && (
            <CreatePoll
              question=""
              options={['', '']}
              onClose={closeCreatePoll}
            />
          )}
        </div>
      </header>
      <main className="mx-auto max-w-7xl py-6">
        <h1 className="w-full text-center text-2xl tracking-tight">
          Polls You Created
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

export default Dashboard;
