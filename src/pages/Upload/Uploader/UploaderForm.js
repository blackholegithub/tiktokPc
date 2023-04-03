import PreviewFrom from './PreviewForm'
import DefaultForm from './DefaultForm'
import { VideoUpload } from '../Upload';
import { useContext } from 'react';


function UploaderForm() {
    const videoState = useContext(VideoUpload)
    return ( 
        <div>

            {!videoState.isVideo ? <DefaultForm /> : <PreviewFrom />} 
        </div>
     )
}

export default UploaderForm;