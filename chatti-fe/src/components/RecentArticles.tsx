import React, { useState, useEffect, useRef} from 'react';
import { API_URL } from '../constants';
import axios from "axios";
import './RecentArticles.css';

interface RecentArticlesProps {
    recents: {id: number; user: string; article: number; url: string; last_viewed: string}[];
}

function RecentArticles(props: RecentArticlesProps) {
    const recents = props.recents

    return (
        <div className='recents-container'>
            <div className='recents-list'>
                {recents.length > 0 ? (
                recents.slice(0,25).map(obj => (
                    <div key={obj.id} className='recent' onClick={() => {window.open(obj.url, '_blank')}}>
                        {obj.url}
                    </div>
                ))
                ) : <div>
                        You have no recently viewed articles.
                    </div>
                }
            </div>
      </div>
    )
}

export default RecentArticles;