import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import "react-datepicker/dist/react-datepicker.css";
import "../Styles/SubForm.css";

function Editsubmission({ onSubmit, updateSubmission }) {

    const location = useLocation();
    const submission = location.state?.submission ?? {};
    const { SUbmission, id } = location.state;
    const [title, setTitle] = useState(submission.title ?? "");
    const [summary, setSummary] = useState(submission.summary ?? "");
    const [description, setDescription] = useState(submission.description ?? "");
    const [characterCount, setCharacterCount] = useState(0);
    const [img, setImg] = useState(submission.img ?? "");
    const [linklink, setLinkLink] = useState(submission.linklink ?? "");
    const [author, setAuthor] = useState(submission.author ?? "");
    const [year, setYear] = useState(submission.year ?? "");
    const [ISBN, setISBN] = useState(submission.ISBN ?? "");

    const navigate = useNavigate();

    function handleDescriptionChange(event) {
        setDescription(event.target.value);
        setCharacterCount(event.target.value.length);
    }

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const img = new Image();
            img.onload = () => {
                if (img.width >= 360 && img.height >= 360) {
                    setImg({
                        preview: URL.createObjectURL(file),
                        name: file.name,
                    });
                } else {
                    alert('Minimum resolution required is 360px X 360px.');
                }
            };
            img.src = URL.createObjectURL(file);
        }
    };

    function handleSubmit(event) {
        console.log("hi")
        event.preventDefault();
        const submission = { title, summary, description, img, linklink, author, ISBN, year };
        onSubmit && onSubmit(submission);
        setTitle("");
        setSummary("");
        setDescription("");
        setCharacterCount(0);
        setImg("");
        setLinkLink("");
        setAuthor("");
        setISBN("");
        setYear("");

        navigate("/")
    }

    return (
        <div className="sub-form-container" id={id}>
            <h2>Edit Book Submission</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        placeholder="Title of your Book"
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        required

                    />
                </div>

                <div className="form-group">
                    <label htmlFor="author">Author Name</label>
                    <input
                        placeholder="Author Name of Book"
                        type="text"
                        id="author"
                        name="author"
                        value={author}
                        onChange={(event) => setAuthor(event.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="year">Year Published</label>
                    <input
                        placeholder="Book in which Year Published"
                        type="text"
                        id="year"
                        name="year"
                        value={year}
                        onChange={(event) => setYear(event.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="isbn">ISBN NO</label>
                    <input
                        placeholder="ISBN No of Book"
                        type="text"
                        id="isbn"
                        name="isbn"
                        value={ISBN}
                        onChange={(event) => setISBN(event.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="summary">Summary</label>
                    <input
                        placeholder="A short summary of your book (this will be visible with your submission)"
                        type="text"
                        id="summary"
                        name="summary"
                        value={summary}
                        onChange={(event) => setSummary(event.target.value)}
                        required

                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        placeholder="Write a long description of your book."
                        id="description"
                        name="description"
                        value={description}
                        onChange={handleDescriptionChange}
                        required

                    />
                    <div className="char-count">{characterCount}/3,000 characters</div>
                </div>
                <div className="form-group">
                    <label htmlFor="cover-image">Cover Image</label>
                    <p>Minimum resolution: 360px X 360px</p>
                    <div >
                        {img ? (
                            <div className="upload-reupload">
                                <div className="img-name">
                                    <img src={img.preview} alt={img.name} style={{ width: '5rem' }} />
                                    <p>{img.name}</p>
                                </div>
                                <div className="re-upload">
                                    <p>Reupload</p>
                                    <label htmlFor="image-reupload">
                                        <CloudUploadIcon style={{ fontSize: '2.5rem', color: '#858585' }} />
                                    </label>
                                </div>
                            </div>
                        ) : (
                            <div style={{ border: 'dashed 2px #CCCCCC', borderRadius: '5px', background: '#F5F5F5', padding: '10px', textAlign: 'center' }}>
                                <label htmlFor="image-upload" style={{ display: 'flex', justifyContent: 'center' }}>
                                    <AddPhotoAlternateIcon style={{ fontSize: '3rem', color: '#CCCCCC' }} />
                                </label>
                            </div>
                        )}
                        <input type="file" id="image-upload" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
                        <input type="file" id="image-reupload" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
                    </div>
                </div>



                <div className="form-group">
                    <label htmlFor="other-links">Other Links</label>
                    <input placeholder="You can upload a video demo or URL of you book here." type="text" id="other-links" name="other-links" value={linklink} onChange={(event) => setLinkLink(event.target.value)} />
                </div>
                <button type="submit">Save Submission</button>
            </form>
        </div>
    );
}
export default Editsubmission;
