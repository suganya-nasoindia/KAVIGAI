import { useEffect, useState,useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Goal } from './GoalModel';
import { fetchGoals } from './GoalService';

export type FilterType =  'current' | 'skipped' | 'future';

export function useGoalController() {
  const { apiKey, accessToken, loginName } = useSelector(
    (state: any) => state.auth
  );

  const [goals, setGoals] = useState<Goal[]>([]);
  const [filteredGoals, setFilteredGoals] = useState<Goal[]>([]);
  const [filter, setFilter] = useState<FilterType>('current');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    loadGoals();
  }, []);

  const applyFilter = useCallback((type: FilterType) => {
   
    const map = {
      current: (t: Goal) => t.dateInterval === 0,
      skipped: (t: Goal) => t.dateInterval < 0,
      future:  (t: Goal) => t.dateInterval > 0,
    };
    setFilteredGoals(goals.filter(map[type]));
  }, [goals]);

  useEffect(() => {
    applyFilter(filter);
  }, [filter, applyFilter]);

  async function loadGoals() {
    try {
      setLoading(true);
      const data = await fetchGoals({ apiKey, accessToken, loginName });
      console.log('Goals fetched:', data);
      setGoals(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  // Removed duplicate applyFilter function

  return {
    loading,
    error,
    filter,
    setFilter,
    goals: filteredGoals,
    reload: loadGoals,
  };
}


