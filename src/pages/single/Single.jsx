import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import storage from '../../firebase';

const SingleTest = ({
	dispatch,
	inputs,
	title,
	videoToUpdate,
	subToUpdate,
}) => {
	const [pageData, setPageData] = useState(null);
	const [editMode, setEditMode] = useState(false);
	const [video, setVideo] = useState(null);
	const [sub, setSub] = useState(null);
	const [img, setImg] = useState('');
	const [trailer, setTrailer] = useState('');
	const [media, setMedia] = useState('');
	const [profilePhoto, setProfilePhoto] = useState('');
	const [progress, setProgress] = useState(0);
	const [uploaded, setUploaded] = useState(0);

	const handleChange = (e) => {
		let value;
		if (e.target.value === 'true') {
			value = true;
		} else if (e.target.value === 'false') {
			value = false;
		} else {
			value = e.target.value;
		}

		if (title === 'Update Video') {
			setVideo({ ...video, [e.target.name]: value });
		} else {
			setSub({ ...sub, [e.target.name]: value });
		}
	};

	const upload = (items) => {
		items.forEach((item) => {
			const fileName = new Date().getTime() + item.label + item.file.name;
			const storageRef = ref(storage, `/items/${video?.title}/${fileName}`);
			const uploadTask = uploadBytesResumable(storageRef, item.file);
			uploadTask.on(
				'state_changed',
				(snapshot) => {
					setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
					console.log('Upload is ' + parseInt(progress) + '% done');
					switch (snapshot.state) {
						case 'paused':
							console.log('Upload paused');
							break;
						case 'running':
							console.log('Upload running');
							break;
						// no default
					}
				},
				(err) => {
					console.log(err);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((url) => {
						setVideo((prev) => {
							return { ...prev, [item.label]: url };
						});
						setUploaded((prev) => prev + 1);
					});
				}
			);
		});
	};

	const handleUpload = (e) => {
		e.preventDefault();
		upload([
			{ file: img, label: 'img' },
			{ file: trailer, label: 'trailer' },
			{ file: media, label: 'media' },
		]);
	};

	useEffect(() => {
		if (title === 'Update Video') {
			setPageData(videoToUpdate);
		} else if (title === 'Update Subscriber') {
			setPageData(subToUpdate);
		}
	}, [title, videoToUpdate, subToUpdate]);

	return (
		<div className='single-test'>
			<Sidebar />
			<div className='canvas'>
				<Navbar />
				<div className='top'>
					<h2>{title}</h2>
				</div>
				{pageData && (
					<div className='bottom'>
						<div className='left'>
							<div className='left-top'>
								<button
									className='edit-btn'
									onClick={() => setEditMode(!editMode)}
								>
									Edit
								</button>
								<h2 className='title'>Information</h2>
								<div className='item'>
									<img
										src={
											title === 'Update Video'
												? pageData?.img || '/no-image-alt.jpg'
												: title === 'Update Subscriber'
												? pageData?.profilePhoto || '/profile_avatar.jpg'
												: null
										}
										alt=''
										className='item-img'
									/>
									<div className='details'>
										<h2 className='item-title'>
											{pageData?.title || pageData?.username}
										</h2>
										<div
											className={
												title === 'Update Subscriber'
													? 'detail-item-wrapper sub'
													: 'detail-item-wrapper'
											}
										>
											<div className='detail-item'>
												<span className='item-key'>
													{title === 'Update Video' ? 'Rating' : 'Email'}:
												</span>
												<span className='item-value'>
													{pageData?.rating || pageData?.email}
												</span>
											</div>
											<div className='detail-item'>
												<span className='item-key'>
													{title === 'Update Video' ? 'Year' : 'isAdmin'}:
												</span>
												<span className='item-value'>
													{pageData?.year || pageData?.isAdmin.toString()}
												</span>
											</div>
										</div>
										{title === 'Update Video' && (
											<>
												<div
													className={
														title === 'Update Subscriber'
															? 'detail-item-wrapper sub'
															: 'detail-item-wrapper'
													}
												>
													<div className='detail-item'>
														<span className='item-key'>
															{title === 'Update Video' ? 'Genre' : 'Country'}:
														</span>
														<span className='item-value'>
															{pageData && pageData?.genre /*USA*/}
														</span>
													</div>
													<div className='detail-item'>
														<span className='item-key'>
															{title === 'Update Video'
																? 'Run Time'
																: 'Address'}
															:
														</span>
														<span className='item-value'>
															{
																pageData &&
																	pageData?.runTime /*123 Mockingbird Way San Diego, CA 92085*/
															}
														</span>
													</div>
												</div>
												<div className='detail-item'>
													<span className='item-key'>Plot:</span>
													<span className='item-value'>
														{pageData && pageData?.desc /*USA*/}
													</span>
												</div>
											</>
										)}
									</div>
								</div>
							</div>
							{title === 'Update Video' && (
								<div className='left-bottom'>
									<div className='lb-top'>
										<div className='form-input'>
											<label
												htmlFor='trailer'
												className={trailer ? 'loaded' : null}
											>
												Trailer:
												<DriveFolderUploadOutlinedIcon className='icon' />
											</label>
											<input
												type='file'
												id='trailer'
												onChange={(e) => setTrailer(e.target.files[0])}
												hidden
											/>
										</div>
										<video
											src={
												trailer
													? URL.createObjectURL(trailer)
													: videoToUpdate.trailer
											}
											controls
										/>
									</div>
									<div className='lb-bottom'>
										<div className='form-input'>
											<label
												htmlFor='media'
												className={media ? 'loaded' : null}
											>
												Media:
												<DriveFolderUploadOutlinedIcon className='icon' />
											</label>
											<input
												type='file'
												id='media'
												onChange={(e) => setMedia(e.target.files[0])}
												hidden
											/>
										</div>
										<video
											src={
												media ? URL.createObjectURL(media) : videoToUpdate.media
											}
											controls
										/>
									</div>
								</div>
							)}
						</div>
						{editMode && (
							<div className='right'>
								<form>
									<div className='form-input'>
										<div className='file-input-wrapper'>
											<>
												<label htmlFor='img'>
													{title === 'Update Video' ? 'Image' : 'Profile Photo'}
													:
													<DriveFolderUploadOutlinedIcon className='icon' />
												</label>
												<input
													type='file'
													id='img'
													onChange={
														title === 'Update Video'
															? (e) => setImg(e.target.files[0])
															: (e) => setProfilePhoto(e.target.files[0])
													}
													hidden
												/>
											</>
											<div className='file-preview'>
												<img
													src={
														img || profilePhoto
															? URL.createObjectURL(img || profilePhoto)
															: '/no-image-alt.jpg'
													}
													alt=''
												/>
											</div>
										</div>
									</div>
									{inputs.map((input) => (
										<div className='form-input' key={input.id}>
											<label htmlFor={input.label}>{input.label}</label>
											<input
												id={input.label}
												name={input.name}
												type={input.type}
												placeholder={input.placeholder}
												onChange={handleChange}
											/>
										</div>
									))}
									{title === 'Update Video' ? (
										<>
											<div className='form-input'>
												<label htmlFor='rating'>Rating</label>
												<select
													name='rating'
													id='rating'
													onChange={handleChange}
												>
													<option value=''>Choose...</option>
													<option value='G'>G</option>
													<option value='PG'>PG</option>
													<option value='PG-13'>PG-13</option>
													<option value='R'>R</option>
													<option value='NC-17'>NC-17</option>
													<option value='XXX'>XXX</option>
												</select>
											</div>
											<div className='form-input'>
												<label htmlFor='genre'>Genre</label>
												<select name='genre' id='genre' onChange={handleChange}>
													<option value=''>Choose...</option>
													<option value='Action'>Action</option>
													<option value='Adventure'>Adventure</option>
													<option value='Animated'>Animated</option>
													<option value='Comedy'>Comedy</option>
													<option value='Drama'>Drama</option>
													<option value='Fantasy'>Fantasy</option>
													<option value='Horror'>Horror</option>
													<option value='Sci-Fi'>Sci-Fi</option>
													<option value='Thriller'>Thriller</option>
												</select>
											</div>
											<div className='form-input'>
												<label htmlFor='isSeries'>isSeries</label>
												<select
													name='isSeries'
													id='isSeries'
													onChange={handleChange}
												>
													<option value=''>Choose...</option>
													<option value='false'>No</option>
													<option value='true'>Yes</option>
												</select>
											</div>
											{video?.isSeries && (
												<>
													<div className='form-input'>
														<label htmlFor='series-type'>Series Type</label>
														<select
															name='seriesType'
															id='series-type'
															onChange={handleChange}
														>
															<option value=''>Choose...</option>
															<option value='TV'>TV</option>
															<option value='Movie'>Movie</option>
														</select>
													</div>
													<div className='form-input'>
														<label htmlFor='series-title'>Series Title</label>
														<input
															type='text'
															id='series-title'
															name='seriesTitle'
															placeholder='Ally McBeal...'
															onChange={handleChange}
														/>
													</div>
													{video?.seriesType === 'TV' && (
														<>
															<div className='form-input'>
																<label htmlFor='season'>Season</label>
																<input
																	type='text'
																	id='season'
																	name='season'
																	placeholder='Season 1...'
																	onChange={handleChange}
																/>
															</div>
															<div className='form-input'>
																<label htmlFor='episode'>Episode</label>
																<input
																	type='text'
																	id='episode'
																	name='episode'
																	placeholder='Episode 5...'
																	onChange={handleChange}
																/>
															</div>
														</>
													)}
												</>
											)}
										</>
									) : (
										<div className='form-input'>
											<label htmlFor='isSeries'>isAdmin</label>
											<select
												name='isAdmin'
												id='isAdmin'
												onChange={handleChange}
											>
												<option value=''>Choose...</option>
												<option value='false'>No</option>
												<option value='true'>Yes</option>
											</select>
										</div>
									)}
									{uploaded === 3 ? (
										<button /*onClick={() => dispatch(createVideo(video))}*/>
											Create
										</button>
									) : (
										<button /*onClick={handleUpload}*/>Upload</button>
									)}
								</form>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

function mapStoreToProps(store) {
	return {
		videoToUpdate: store.video.video,
		subToUpdate: store.sub.sub,
	};
}

export default connect(mapStoreToProps)(SingleTest);
