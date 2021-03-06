import {
  ActionStory,
  StoriesState,
  StoryCategory,
} from '../../utils/types';
import { storiesActionTypes } from '../actions';

const initialState: StoriesState = {
  isFetching: false,
  error: null,
  stories: null,
  ids: null,
};

function categoryReducer(category: StoryCategory) {
  return (
    state: StoriesState = initialState,
    action: ActionStory,
  ): StoriesState => {
    if (action.category !== category) {
      return state;
    }
    switch (action.type) {
      case storiesActionTypes.FETCH_STORIES:
        return { ...state, isFetching: true };
      case storiesActionTypes.FETCH_STORIES_IDS_SUCCESS:
        return { ...state, isFetching: true, ids: action.payload };
      case storiesActionTypes.FETCH_STORIES_SUCCESS:
        return {
          ...state,
          isFetching: false,
          stories: state.stories ? [...state.stories, ...action.payload] : action.payload,
        };
      case storiesActionTypes.FETCH_STORIES_FAILURE:
        return { ...state, isFetching: false, error: action.payload };
      default:
        return state;
    }
  };
}

export const TopStoriesReducer = categoryReducer(StoryCategory.TOP_STORIES);
export const BestStoriesReducer = categoryReducer(StoryCategory.BEST_STORIES);
export const NewStoriesReducer = categoryReducer(StoryCategory.NEW_STORIES);
