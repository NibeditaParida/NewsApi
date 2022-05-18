import React from 'react';
import { useEffect, useState } from 'react';
import Newsitem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';

import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    
    //    in class based we write in starting
    //     static defaultProps = {
    //         country: 'in',
    //         pageSize: 8,
    //         category: 'general',
    //     }

    //     static propTypes = {
    //         country: PropTypes.string,
    //         pageSize: PropTypes.number,
    //         category: PropTypes.string,
    //     }

    //       Capitalize = (string) => { class
    const Capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);

    }

    // constructor(props) {     in class component
    //     super(props);
    //     this.state = {
    //         // articles: this.articles,
    //         articles: [],
    //         loading: true,
    //         page: 1,
    //         totalResults: 0
    //     }

    // }
    // in class component => async updateNews (){}
    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ef22cbd6afdb4691920af99c60dea553&page=${page}&pageSize=${props.pageSize}`;
        // this.setState({ loading: true })
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json()
        props.setProgress(70);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        // this.setState({
        //     articles: parsedData.articles,
        //     totalResults: parsedData.totalResults,
        //     loading: false

        // })in class component
        props.setProgress(100);

    }
    //  async componentDidMount() {    in class component
    //     this.updateNews();
    // }
    useEffect(() => {
        document.title = `${Capitalize(props.category)} - NewsMonkey`;
        updateNews()

    }, [])




    const handleNext = async () => {
        // if ( !(this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize))) {
        //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ef22cbd6afdb4691920af99c60dea553&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
        //     this.setState({loading:true})
        //     let data = await fetch(url);
        //     let parsedData = await data.json()

        //     // console.log(parsedData);
        //     this.setState({
        //          page: this.state.page + 1,
        //         articles: parsedData.articles,
        //         loading:false
        //     })
        // }
        // this.setState({ page: this.state.page + 1 });
        // this.updateNews(); class
        setPage(page + 1)
        updateNews();


    }
    // handlePrev = async () => {   in class 

    const handlePrev = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ef22cbd6afdb4691920af99c60dea553&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
        // this.setState({loading:true})
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // // console.log(parsedData);
        // this.setState({
        //      page: this.state.page - 1,
        //     articles: parsedData.articles,
        //     loading:false
        // })
        setPage(page - 1)
        updateNews();
    }
    const fetchMoreData = async () => {
        // this.setState({ page: this.state.page + 1 })
       
        // const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ef22cbd6afdb4691920af99c60dea553&page=${this.state.page}&pageSize=${props.pageSize}`;
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ef22cbd6afdb4691920af99c60dea553&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1)
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    }


    return (
        <>

            <h2 className='text-center' style={{ margin: '35px 0',marginTop:'90px' }}>Newsmonkey Top {Capitalize(props.category)} Headlines  </h2>
            { loading && <Spinner/>}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">


                    <div className="row">
                        {/* !this.state.loading && this.state.articles.map((elem) => */}
                        {articles.map((elem) => {
                            return <div className="col-md-4 " key={elem.url}>

                                <Newsitem title={elem.title ? elem.title : ''} desc={elem.description ? elem.description : ''}
                                    imageurl={elem.urlToImage}
                                    newsurl={elem.url}
                                    author={elem.author}
                                    date={elem.publishedAt}
                                    source={elem.source.name}
                                />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
            {/* <div className="conainer d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrev}> &larr; Previous</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNext}> &rarr; Next</button>

                    </div> */}


        </>
    )

}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}
export default  News;