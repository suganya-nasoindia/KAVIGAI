import { useEffect, useState,useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Todo } from './TodoModel';
import { fetchTodos } from './TodoService';

export type FilterType =  'current' | 'skipped' | 'future';

export function useTodoController() {
  const { apiKey, accessToken, loginName } = useSelector(
    (state: any) => state.auth
  );

  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('current');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const applyFilter = useCallback((type: FilterType) => {
   
    const map = {
      current: (t: Todo) => t.dateInterval === 0,
      skipped: (t: Todo) => t.dateInterval < 0,
      future:  (t: Todo) => t.dateInterval > 0,
    };
    setFilteredTodos(todos.filter(map[type]));
  }, [todos]);

  useEffect(() => {
    applyFilter(filter);
  }, [filter, applyFilter]);

  async function loadTodos() {
    try {
      setLoading(true);
      const data = await fetchTodos({ apiKey, accessToken, loginName });
      console.log('Todos fetched:', data);
      setTodos(data);
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
    todos: filteredTodos,
    reload: loadTodos,
  };
}
