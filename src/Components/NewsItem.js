
import React from 'react'

const  NewsItem =(props)=> {

    // let { title, desc, imageurl, newsurl, author, date, source } = this.props;
        let { title, desc, imageurl, newsurl, author, date, source } = props;
        return (
            <>
                <div className="my-3">
                    <div className="card" >
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            position: 'absolute',
                            right: '0'

                        }}>
                            <span className=" badge rounded-pill bg-danger"> {source}</span>
                        </div>
                        <img src={!imageurl ? 'https://images.news18.com/ibnlive/uploads/2022/04/oneplus-10r-5g-165113836416x9.jpg' : imageurl}
                            className="card-img-top" alt="image" />
                        <div className="card-body">
                            <h5 className="card-title"> {title}</h5>
                            <p className="card-text">{desc}</p>
                            <p className="card-text"><small className="text-muted">By {author ? author : 'unknown'} on {new Date(date).toGMTString()}</small></p>
                            <a rel='noreferrer' href={newsurl} target='_blank' className="btn  btn-sm btn-dark">Read more</a>
                        </div>
                    </div>
                </div>

            </>
        )  
}
export default NewsItem;
