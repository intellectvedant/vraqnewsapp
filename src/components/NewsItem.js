import React from "react";

const NewsItem = (props) =>{
    let {title, description, imageurl,newsurl, author, date, source} = props;

    return (
      <div className="my-3">
        <div className="card">
          <img src={imageurl? imageurl: "https://freepngimg.com/thumb/newspaper/7-2-newspaper-free-download-png.png"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...<span className="position-absolute top-0 start-20 translate-middle badge rounded-pill bg-danger" style={{left: "15%", zIndex: 1}}>{source}</span></h5>
            <p className="card-text">
              {description}...
            </p>
            <p className="card-text"><small className="text-body-secondary">by: {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
            <a href={newsurl} target="_blank"className="btn btn-sm btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
}

export default NewsItem;
