import './new.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { useState } from 'react';

const New = ({ inputs, title }) => {
	const [video, setVideo] = useState(null);
	const [sub, setSub] = useState(null);
	const [img, setImg] = useState(null);
	const [imgTitle, setImgTitle] = useState(null);
	const [imgSm, setImgSm] = useState(null);
	const [trailer, setTrailer] = useState(null);
	const [media, setMedia] = useState(null);
	const [profilePhoto, setProfilePhoto] = useState(null);

	const handleChange = (e) => {
		const value = e.target.value;
		if (title === 'Add New Subscriber') {
			setSub({ ...sub, [e.target.name]: value });
		} else {
			setVideo({ ...video, [e.target.name]: value });
		}
	};

	return (
		<div className='new'>
			<Sidebar />
			<div className='canvas'>
				<Navbar />
				<div className='top'>
					<h2>{title}</h2>
				</div>
				<div className='bottom'>
					<div className={title === 'Add New Subscriber' ? 'left sub' : 'left'}>
						{title === 'Add New Video' ? (
							<>
								<div className='top'>
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
										src={trailer ? URL.createObjectURL(trailer) : null}
										controls
									/>
								</div>
								<div className='bottom'>
									<div className='form-input'>
										<label htmlFor='media' className={media ? 'loaded' : null}>
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
										src={media ? URL.createObjectURL(media) : null}
										controls
									/>
								</div>
							</>
						) : (
							<img
								src={
									profilePhoto
										? URL.createObjectURL(profilePhoto)
										: '/no-image-alt.jpg'
								}
								alt=''
							/>
						)}
					</div>
					<div className='right'>
						<form>
							{title === 'Add New Subscriber' ? (
								<div className='form-input'>
									<label htmlFor='profilePhoto'>
										Profile Photo:
										<DriveFolderUploadOutlinedIcon className='icon' />
									</label>
									<input
										type='file'
										id='profilePhoto'
										onChange={(e) => setProfilePhoto(e.target.files[0])}
										hidden
									/>
								</div>
							) : null}
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
							{title === 'Add New Video' ? (
								<>
									<div className='form-input'>
										<label htmlFor='isSeries'>isSeries</label>
										<select
											name='isSeries'
											id='isSeries'
											onChange={handleChange}
										>
											<option value='false'>No</option>
											<option value='true'>Yes</option>
										</select>
									</div>
									<div className='form-input'>
										<div className='file-input-wrapper'>
											<>
												<label htmlFor='img'>
													Image:
													<DriveFolderUploadOutlinedIcon className='icon' />
												</label>
												<input
													type='file'
													id='img'
													onChange={(e) => setImg(e.target.files[0])}
													hidden
												/>
											</>
											<div className='file-preview'>
												<img
													src={
														img ? URL.createObjectURL(img) : '/no-image-alt.jpg'
													}
													alt=''
												/>
											</div>
										</div>
									</div>
									<div className='form-input'>
										<div className='file-input-wrapper'>
											<>
												<label htmlFor='imgTitle'>
													Title Image:
													<DriveFolderUploadOutlinedIcon className='icon' />
												</label>
												<input
													type='file'
													id='imgTitle'
													onChange={(e) => setImgTitle(e.target.files[0])}
													hidden
												/>
											</>
											<div className='file-preview'>
												<img
													src={
														imgTitle
															? URL.createObjectURL(imgTitle)
															: '/no-image-alt.jpg'
													}
													alt=''
												/>
											</div>
										</div>
									</div>
									<div className='form-input'>
										<div className='file-input-wrapper'>
											<>
												<label htmlFor='imgSm'>
													Thumbnail:
													<DriveFolderUploadOutlinedIcon className='icon' />
												</label>
												<input
													type='file'
													id='imgSm'
													onChange={(e) => setImgSm(e.target.files[0])}
													hidden
												/>
											</>
											<div className='file-preview'>
												<img
													src={
														imgSm
															? URL.createObjectURL(imgSm)
															: '/no-image-alt.jpg'
													}
													alt=''
												/>
											</div>
										</div>
									</div>
								</>
							) : (
								<div className='form-input'>
									<label htmlFor='isSeries'>isAdmin</label>
									<select name='isAdmin' id='isAdmin' onChange={handleChange}>
										<option value='false'>No</option>
										<option value='true'>Yes</option>
									</select>
								</div>
							)}
							<button>Send</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default New;
