import './new.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { useState } from 'react';

const New = ({ inputs, title }) => {
	const [video, setVideo] = useState(null);
	const [img, setImg] = useState(null);
	const [imgTitle, setImgTitle] = useState(null);
	const [imgSm, setImgSm] = useState(null);
	const [trailer, setTrailer] = useState(null);
	const [media, setMedia] = useState(null);

	const handleChange = (e) => {
		const value = e.target.value;
		setVideo({ ...video, [e.target.name]: value });
	};

	console.log(imgSm);

	return (
		<div className='new'>
			<Sidebar />
			<div className='canvas'>
				<Navbar />
				<div className='top'>
					<h2>{title}</h2>
				</div>
				<div className='bottom'>
					<div className='left'>
						<img
							src={img ? URL.createObjectURL(img) : '/no-image-alt.jpg'}
							alt=''
						/>
					</div>
					<div className='right'>
						<form>
							<div className='form-input'>
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
							</div>
							{title === 'Add New Video' ? (
								<div className='form-input'>
									<label htmlFor='isSeries'>isSeries</label>
									<select name='isSeries' id='isSeries'>
										<option value='false'>No</option>
										<option value='true'>Yes</option>
									</select>
								</div>
							) : null}
							{inputs.map((input) => (
								<div className='form-input' key={input.id}>
									<label htmlFor={input.label}>
										{input.type === 'file' ? (
											<>
												{input.label}:
												<DriveFolderUploadOutlinedIcon className='icon' />
											</>
										) : (
											input.label
										)}
									</label>
									<input
										id={input.label}
										name={input.name}
										type={input.type}
										placeholder={input.placeholder}
										hidden={input.type === 'file'}
										onChange={input.type === 'file' ? input.set : handleChange}
									/>
								</div>
							))}
							<button>Send</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default New;
