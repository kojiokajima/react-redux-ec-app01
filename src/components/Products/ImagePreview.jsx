import React from 'react'

const ImagePreview = (props) => {
    return (
        <div className="p-media__thumb" onClick={() => props.delete(props.id)}>
            <img src={props.path} alt="Preview Image"/>
        </div>
    )
}

export default ImagePreview