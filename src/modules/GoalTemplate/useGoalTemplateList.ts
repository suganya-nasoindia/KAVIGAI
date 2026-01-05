import { useEffect, useState } from 'react';
import { GoalTemplate } from './GoalTemplateModel';
import { getAvailableGoalTemplate } from './GoalTemplateController';

export const useGoalTemplateList = (
  apiKey: string,
  accessToken: string,
  loginName: string
) => {
  const [goalTemplates, setGoalTemplates] = useState<GoalTemplate[]>([]);
  const [filtered, setFiltered] = useState<GoalTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const load = async () => {
      const data = await getAvailableGoalTemplate();
      setGoalTemplates(data);
      setFiltered(data);
      setLoading(false);
    };
    load();
  }, []);

  useEffect(() => {
    const q = query.toLowerCase();
    setFiltered(
      goalTemplates.filter(gt =>
        gt.category?.toLowerCase().includes(q) ||
        gt.popularity?.toLowerCase().includes(q) ||
        gt.authorFirstName?.toLowerCase().includes(q) ||
        gt.authorLastName?.toLowerCase().includes(q) ||

        gt.tags?.some(tag => tag.toLowerCase().includes(q))
      )
    );
  }, [query, goalTemplates]);

  return { filtered, loading, query, setQuery };
};
