import React, { useCallback, useContext, useEffect } from 'react';
import { ItemContext } from './ItemContext';
import { getLogger, httpGet, httpPost, httpDel, httpPut } from '../core';
import { AuthContext } from '../auth/AuthContext';
import {AsyncStorage} from 'react-native';

const log = getLogger('ItemStore');

const initialState = {
  isLoading: false,
  items: null,
  loadingError: null,
};

export const ItemStore = ({ children }) => {
  const [state, setState] = React.useState(initialState);
  const { isLoading, items, loadingError } = state;
  const { token } = useContext(AuthContext);

  useEffect(() => {
    console.log('effect');

    if (token && !items && !loadingError && !isLoading) {

      log('load items started');
      
      setState({ isLoading: true, loadingError: null });

      httpGet('api/book')
        .then(json => {
          try {
            AsyncStorage.setItem(items, json);
            log('load items succeeded');
          } catch (error) {
            log('load items error');
          }

          setState({ isLoading: false, items: json });
        })
        .catch(loadingError => {
          log('load books failed');
          try {
            const value = AsyncStorage.getItem('items');
            if (value !== null) {
              // We have data!!
              log(value);
              log("We have dataa from local");
            }
          } catch (error) {
            log('load books failed from async storage');
          }

          setState({ isLoading: false, items:value })
        });
    }
  }, [token]);

  const onSubmit = useCallback(async (author,gene,title,user) => {
    log('post item started');
    return httpPost('api/book', { author,gene,title, user})
      .then(httpGet('api/book')
        .then(json => {
            console.log('load books succeded');
            try {
              AsyncStorage.setItem(items, json);
              log("put items in async storage");
            } catch (error) {
              log("put items in async storage error");
            };
          log('load books succeeded');
          
          setState({ isLoading: false, items: json });
          return Promise.resolve(json);        
        })
      )
      .catch(error => {
        Alert.alert("Error on post item");
        log('post book failed');
        setState({ isLoading:false, loadingError:{message:"Post Book Failed due to wrong connection!"}});
        return Promise.reject(error);
      });
  });

  const getData = useCallback(() => {
    httpGet('api/book')
    .then(json => {
        console.log(json);
        console.log('load books succeded');
        try {
          AsyncStorage.setItem(items, json);
          log('load books succeeded');
        } catch (error) {
          log('load books failed');
        }
      
      setState({ isLoading: false, items: json });
    })
    .catch(loadingError => {
      log('load books failed');
      console.log('load books failed');
      try {
        const value = AsyncStorage.getItem('items');
        if (value !== null) {
          console.log(value);
          console.log("data from async storage");
        }
      } catch (error) {
        console.log("load date from async storage error");
      }
      setState({ isLoading: false, items:value })
    });
  });

  const onDelete = useCallback(async (_id) => {
    log('delete item started');
    return httpDel('api/book', { _id })
      .then(json => {
          console.log('delete works');
        log('load books succeeded');
        setState({ isLoading: false, items: json });
        return Promise.resolve(json);        
      })
      .catch(error => {
        Alert.alert("Delete error");
        log('delete book failed');
        setState({ isLoading:false, loadingError:{message:"Delete Book Failed due to wrong connection!"}});
        return Promise.reject(error);
      });
  });

  const onEdit = useCallback(async (author,gene,title,_id,user) => {
    log('put item started');
    return httpPut('api/book', { author,gene,title,_id,user })
    .then(
      httpGet('api/book')
      .then(json => {
          console.log('load books succeded');
          try {
            AsyncStorage.setItem(items, json);
            console.log("put data on async storage");
          } catch (error) {
            console.log("error on async storage");
          };
          console.log('edit succeeded');
        log('load books succeeded');
        setState({ isLoading: false, items: json });
        return Promise.resolve(json);        
      })
    )
      .catch(error => {
        log('put book failed');
        return Promise.reject(error);
      });
  });

  log('render', isLoading);
  const value = { ...state, onSubmit, onDelete, onEdit,getData};
  return (
    <ItemContext.Provider value={value}>
      {children}
    </ItemContext.Provider>
  );
};