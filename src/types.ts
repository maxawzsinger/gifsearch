export type GiphyResponse = {
  data: GiphyGIF[];
  pagination: GiphyPagination;
  meta: GiphyMeta;
};
export type GiphyPagination = {
  offset: number;
  total_count: number;
  count: number;
};

export type GiphyMeta = {
  msg: string;
  status: number;
  response_id: string;
};
export type GiphyGIF = {
  type: string;
  id: string;
  slug: string;
  url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  rating: string;
  content_url: string | null;
  user?: any; //won't be used for this project
  source_tld: string;
  source_post_url: string;
  update_datetime: string;
  create_datetime: string;
  import_datetime: string;
  trending_datetime: string;
  images: GiphyImage;
  title: string;
  alt_text: string;
};

type GiphyImage = {
  fixed_height: {
    url: string;
    width: string;
    height: string;
    size: string;
    mp4: string;
    mp4_size: string;
    webp: string;
    webp_size: string;
  };
  fixed_height_still: {
    url: string;
    width: string;
    height: string;
  };
  fixed_height_downsampled: {
    url: string;
    width: string;
    height: string;
    size: string;
    webp: string;
    webp_size: string;
  };
  fixed_width: {
    url: string;
    width: string;
    height: string;
    size: string;
    mp4: string;
    mp4_size: string;
    webp: string;
    webp_size: string;
  };
  fixed_width_still: {
    url: string;
    width: string;
    height: string;
  };
  fixed_width_downsampled: {
    url: string;
    width: string;
    height: string;
    size: string;
    webp: string;
    webp_size: string;
  };
  fixed_height_small: {
    url: string;
    width: string;
    height: string;
    size: string;
    mp4: string;
    mp4_size: string;
    webp: string;
    webp_size: string;
  };
  fixed_height_small_still: {
    url: string;
    width: string;
    height: string;
  };
  fixed_width_small: {
    url: string;
    width: string;
    height: string;
    size: string;
    mp4: string;
    mp4_size: string;
    webp: string;
    webp_size: string;
  };
  fixed_width_small_still: {
    url: string;
    width: string;
    height: string;
  };
  downsized: {
    url: string;
    width: string;
    height: string;
    size: string;
  };
  downsized_still: {
    url: string;
    width: string;
    height: string;
  };
  downsized_large: {
    url: string;
    width: string;
    height: string;
    size: string;
  };
  downsized_medium: {
    url: string;
    width: string;
    height: string;
    size: string;
  };
  downsized_small: {
    mp4: string;
    width: string;
    height: string;
    mp4_size: string;
  };
  original: {
    width: string;
    height: string;
    size: string;
    frames: string;
    mp4: string;
    mp4_size: string;
    webp: string;
    webp_size: string;
  };
  original_still: {
    url: string;
    width: string;
    height: string;
  };
  looping: {
    mp4: string;
  };
  preview: {
    mp4: string;
    mp4_size: string;
    width: string;
    height: string;
  };
  preview_gif: {
    url: string;
    width: string;
    height: string;
  };
};
