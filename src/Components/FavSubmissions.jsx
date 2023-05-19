import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Submissions.css';

function FavSubmissions({ favsubmissions, searchQuery, sortBy }) {
    const navigate = useNavigate();
    const [selectedCardId, setSelectedCardId] = useState(null);

    const sortedSubmissions =
        sortBy === 'newest'
            ? [...favsubmissions].sort((a, b) => b.id - a.id)
            : [...favsubmissions].sort((a, b) => a.id - b.id);
    const filteredSubmissions = sortedSubmissions.filter((submission) =>
        submission.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleClick2 = (submission) => {
        setSelectedCardId(submission.id);
        navigate(`/FavDescription/${submission.id}`, {
            state: {
                submission: submission,
                id: submission.id,
                title: submission.title,
                summary: submission.summary,
                description: submission.description,
                img: submission.img,
                linklink: submission.linklink,
                author: submission.author,
                year: submission.year,
                ISBN: submission.ISBN
            },
        });
    };

    return (
        <div className='container'>
            <div className="card-list">
                {filteredSubmissions.map((submission) => (
                    <div key={submission.id} className="card" onClick={() => handleClick2(submission)}>
                        <div className="card-image">
                            <img src={submission.img.preview} alt={submission.title} />
                        </div>
                        <div className="card-content">
                            <div className="card-title">{submission.title}</div>
                            <div className="card-desc">{submission.summary}</div>
                        </div>
                        <div className='author-year'>
                            <div className='card-author'>{submission.author}</div>
                            <div className="card-year">{submission.year}</div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FavSubmissions;
