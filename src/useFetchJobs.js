import axios from 'axios';
import React, { useReducer, useState,useEffect } from 'react'
const url='https://cors-anywhere.herokuapp.comhttps://jobs.github.com/positions.json'
const ACTIONS={
MAKE_REQUEST:'make_request',
GET_DATA:'get_data',
ERROR:'error',
UPDATE_HAS_NEXT_PAGE:'update_has_nex_page'
}

const reducer =(state,action)=>{
   switch(action.type){
       case ACTIONS.MAKE_REQUEST:
           return {...state,loading:true,jobs:[]};
           break;
        case ACTIONS.GET_DATA:
            return {...state,loading:false,jobs:action.payload.jobs};
            break;
        case ACTIONS.ERROR:
            return {...state,error:action.payload.error,loading:false,jobs:[]};
            break; 
        case ACTIONS.UPDATE_HAS_NEXT_PAGE:
            return {...state,hasNextPage:action.payload.hasNextPage}    
         default:
             return {...state}
             break;    
   }
}
const defaultState={
    jobs:[],
    loading:false,
    error:false,
    
}

export default function useFetchJobs(params,page) {
   const [state,dispatch]=useReducer(reducer,defaultState)
   useEffect(()=>{
       const cancelToken1=axios.CancelToken.source()
    dispatch({type:ACTIONS.MAKE_REQUEST})
    axios.get(url,{
        cancelToken:cancelToken1.token,
        params:{markdown:true,page:page,...params}
    }).then(res=>{
        dispatch({type:ACTIONS.GET_DATA,payload:{jobs:res.data}})
    }).catch(e=>{
        if(axios.isCancel(e)) return
        dispatch({type:ACTIONS.ERROR,payload:{error:e}})
    })
    const cancelToken2=axios.CancelToken.source()
    axios.get(url,{
        cancelToken:cancelToken2.token,
        params:{markdown:true,page:page+1,...params}
    }).then(res=>{
        dispatch({type:ACTIONS.UPDATE_HAS_NEXT_PAGE,payload:{hasNextPage:res.data.length!==0}})
    }).catch(e=>{
        if(axios.isCancel(e)) return
        dispatch({type:ACTIONS.ERROR,payload:{error:e}})
    })
    return ()=>{
        cancelToken1.cancel()
        cancelToken2.cancel()
    }
   },[params,page])

    return state
}
