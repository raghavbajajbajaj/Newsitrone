import {doc , setDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { database } from '../firebase/setup';


const Home = (props) => {

    const [news, setNews] = useState([])

    const getNews = () => {

        fetch(`https://newsapi.org/v2/everything?q=${props.menu ? props.menu : "All"}&sortBy=popularity&apiKey=56b2c1cd4e4b45049c854f790d27fbcf`)
            .then(res => res.json())
            .then(json => setNews(json.articles))
    }

    useEffect(() => {
        getNews()
    }, [news])

    const addNews=async(data)=>{
        const newDoc = doc(database , "News" , `${data.url.substr(-10,10)}`)
        try{
       await setDoc(newDoc , {
        title:data.title , description:data.description
       })
        }catch(e){
           console.log(e) ;
        }
    }



    return (

       // mt-12 p-5 grid grid-cols-3 items-center ml-14

        // try this grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4
        <div className=' mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>

            {
                news?.filter(data => data.title.includes(props.search)).map((data) => {
                    return <>
                        <Link onClick={()=> addNews(data)} to="/details" state={{data:data}}>
                            <div className="mb-7 max-w-sm rounded overflow-hidden shadow-lg">
                                <img className="w-full" src={data.urlToImage} alt="error to load image" />
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">{data.title}</div>
                                    <p className="text-gray-700 text-base">
                                        {data.content}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </>
                })
            }


        </div>
    )
}

export default Home