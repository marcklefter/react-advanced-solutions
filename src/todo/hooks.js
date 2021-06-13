import {
  useState,
  useEffect,
  useMemo,
  useRef
} from 'react';

import _ from 'lodash';

import {
  mode
 } from "./mode";

// ...

export function useDocumentTitle(titleFn) {
  useEffect(() => {
    document.title = titleFn();
  }, [titleFn]);
}

// ...

export function useMode(stringArray) {
  const words = _.flatten(
    stringArray.reduce((words, word) => {
      return [...words, word.split(' ')];
    }, [])
  );

  return mode(words);
}

export function useMemoMode(stringArray) {
  return useMemo(
    () => {
      const words = _.flatten(
        stringArray.reduce((words, word) => {
          return [...words, word.split(' ')];
        }, [])
      );
    
      return mode(words);
    },
    [stringArray.length]
  );
}

export function useAsyncMode(stringArray) {
  const [mfw, setMfw] = useState(null);

  const ref = useRef();
  ref.current = stringArray;

  useEffect(() => {
    const words = _.flatten(
      ref.current.reduce((words, word) => {
        return [...words, word.split(' ')];
      }, [])
    );
  
    setMfw(mode(words));
  }, [stringArray.length]);

  return mfw;
}