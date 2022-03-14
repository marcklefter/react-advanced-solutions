import {
  fetchResource,
  useImageFetch
} from './util';

import useSWR from 'swr';

// ...

export const UserProfile = ({ endpoint }) => {
  const { data } = useSWR(endpoint, fetchResource, { suspense: true });
  const {
    name,
    avatar_url
  } = data;

  const image = useImageFetch(avatar_url);

  return (
    <>
      <div>
        <img className="image" src={image} alt="" />
      </div>
      <h1>{name}</h1>
    </>
  );
}