import { useEffect, useState } from 'react';
import axios from 'axios';

import InfiniteScroll from 'react-infinite-scroll-component';

const categories = [
    "general",
    "health",
    "science",
    "sports",
    "technology"]

const NewsApp = () => {

    const [articles, setArticles] = useState([]);
    const [totalArticles, setTotalArticles] = useState(0);
    const [currentPage, setCurrentPage] = useState(undefined);
    const [selectedCategory, setSelectedCategory] = useState("general")

    const loadNews = (pageNo = 1) => {
        axios({
            url: "https://newsapi.org/v2/top-headlines",
            method: "GET",
            params: {
                country: "in",
                apiKey: "28a88773756147f8969a2831a726a2b3",
                page: pageNo,
                category: selectedCategory
            }
        }).then((res) => {
            if (res.status === 200) {
                //console.log(res);
                setArticles([...articles, ...res?.data?.articles])
                setTotalArticles(res.data.totalArticles)
                setCurrentPage(pageNo)
            }
        }).catch((err) => {
            //console.log(err);
            alert("Something Went Wrong")

        })

    }
    useEffect(() => {
        loadNews()
        // eslint-disable-next-line
    }, [selectedCategory])
    useEffect(() => {
        loadNews()
        // console.log("Intial");
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <h1>This is news Application</h1>
            <div>
                {
                    categories.map((category, index) => {
                        return (
                            <>
                            <button key={index} className='btn btn-primary' style={{ margin: 20 }} onClick={() => {
                                setArticles([])
                                setSelectedCategory(category)
                            }}>{category.toUpperCase()}</button>
                            
                            </>
                        )
                        
                    })
                }
                <p className=''>The below news is {selectedCategory} News</p>
            </div>
            {/* <button className="btn btn-primary">Click</button> */}
            <div >
                <InfiniteScroll style={{ display: 'flex', flexWrap: "wrap" }}
                    dataLength={articles.length} //This is important field to render the next data
                    next={() => {
                        //state value plus 1
                        loadNews(currentPage + 1)
                        //Api call logic
                    }}
                    hasMore={totalArticles !== articles}
                >
                    
                    {
                        articles.map((article, index) => {
                            
                            return (
                                <div key={index} className="card" style={{ width: 200, margin: 20 }}>
                                    <img className="card-img-top" src={article.urlToImage ? article.urlToImage : article.url} alt="Cardcap" style={{ width: "100%", height: 150 }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{article.title}</h5>
                                        <p className="card-text">{article.description ? article.description.slice(0, 40) : article.title}</p>
                                        <a href={article.url} target="blank" className="btn btn-primary" key={index}>Read More</a>
                                    </div>
                                </div>
                            )
                        })
                    }
                </InfiniteScroll>
            </div>
        </>

    )

}

export default NewsApp;