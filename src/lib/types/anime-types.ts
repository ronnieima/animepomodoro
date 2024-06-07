export type AnimeListResponse = {
  data: Anime[];
  paging: {
    next: string;
  };
  error: string;
};

export type Anime = {
  node: {
    id: number;
    title: string;
    main_picture?: {
      medium: string;
      large: string;
    };
  };
  list_status: {
    status: string;
    score: number;
    num_episodes_watched: number;
    is_rewatching: boolean;
    updated_at: string;
  };
};
