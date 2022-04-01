import './new.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { useState } from 'react';

const New = ({ inputs, title }) => {
	const [file, setFile] = useState('');

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
							src={
								file
									? URL.createObjectURL(file)
									: 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
							}
							alt=''
						/>
					</div>
					<div className='right'>
						<form action=''>
							<div className='form-input'>
								<label htmlFor='file'>
									Image:
									<DriveFolderUploadOutlinedIcon className='icon' />
								</label>
								<input
									type='file'
									id='file'
									onChange={(e) => setFile(e.target.files[0])}
									hidden
								/>
							</div>
							{inputs.map((input) => (
								<div className='form-input' key={input.id}>
									<label htmlFor={input.label}>{input.label}</label>
									<input
										id={input.label}
										type={input.type}
										placeholder={input.placeholder}
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
