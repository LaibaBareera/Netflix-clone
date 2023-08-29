import React from 'react';
import Row from './Row';
import request from '../request';
import Banner from './Banner';
import Nav from './Nav';
import Footer from './Footer';

function Trade(props) {
    return (
        <div>
        <Nav/>
        <Banner fetchurl={request.fetchTrending}/>
            <Row title='Netflix Originals' fetchUrl={request.fetchNetflixOriginals} isLargeRow TV/>
	<Row title='Trending Now' fetchUrl={request.fetchTrending}/>
	<Row title= 'Top Rated' fetchUrl={request.fetchTopRated}/>
	<Row title='Action Movies' fetchUrl={request.fetchActionMovies}/>
	<Row title='Comedy Movies' fetchUrl={request.fetchComedyMovies}/>
	<Row title= 'Horror Movies' fetchUrl={request.fetchHorrorMovies}/>
	<Row title='Romantic Movies' fetchUrl={request.fetchRomanceMovies}/>
	<Row title= "Documentaries" fetchUrl={request.fetchDocumentaries}/>
    <Footer/>
        </div>

    );
}

export default Trade;