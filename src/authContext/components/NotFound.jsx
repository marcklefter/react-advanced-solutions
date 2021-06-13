import {
  useLocation
} from 'react-router-dom';

export function NotFound() {
  const location = useLocation();

  return `No page found for ${location.pathname}`;
}