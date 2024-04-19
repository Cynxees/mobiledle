import { useState } from "react";

function CharacterCard({ src, alt, width, height }) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div>
            {!loaded && <div>Loading image...</div>}
            <img
                src={src}
                alt={alt}
                onLoad={() => setLoaded(true)}
                style={{ display: loaded ? 'block' : 'none', width: width, height: height}}
                
            />
        </div>
    );
}