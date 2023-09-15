import React, { useState, useEffect, useRef} from 'react';
import { API_URL } from '../constants';
import axios from "axios";

interface RecentArticlesProps {
    recents: {pk: number; user: string; article: number; url: string; last_viewed: string}[]
}

function RecentArticles(props: RecentArticlesProps) {
    const recents = props.recents

    return (
        <div className='create-chat-container'>
            <div className='create-form-container'>
                {recents.length > 0 ? (
                recents.map(obj => (
                    <div key={obj.pk} className='create-label'>
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