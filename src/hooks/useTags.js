/**
 * useTags Hook
 * Calls tag.service, manages tags list state, loading, error
 */

import { useState, useEffect, useCallback } from 'react';
import tagService from '@/services/tag.service';
import { TAG_MESSAGES } from '@/constants/messages';

const extractList = (response) => {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.data?.tags)) return response.data.tags;
  return [];
};

export const useTags = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTags = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await tagService.getTags();
      setTags(extractList(response));
    } catch (err) {
      setError(err.message || TAG_MESSAGES.FETCH_FAILED);
      setTags([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  const createTag = useCallback(async (payload) => {
    setError(null);
    try {
      await tagService.createTag(payload);
      await fetchTags();
    } catch (err) {
      setError(err.message || TAG_MESSAGES.CREATE_FAILED);
      throw err;
    }
  }, [fetchTags]);

  const updateTag = useCallback(async (id, payload) => {
    setError(null);
    try {
      await tagService.updateTag(id, payload);
      await fetchTags();
    } catch (err) {
      setError(err.message || TAG_MESSAGES.UPDATE_FAILED);
      throw err;
    }
  }, [fetchTags]);

  const deleteTag = useCallback(async (id) => {
    setError(null);
    try {
      await tagService.deleteTag(id);
      await fetchTags();
    } catch (err) {
      setError(err.message || TAG_MESSAGES.DELETE_FAILED);
      throw err;
    }
  }, [fetchTags]);

  return { tags, loading, error, fetchTags, createTag, updateTag, deleteTag };
};

export default useTags;
