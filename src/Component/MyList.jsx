import React from 'react';
import Row from './Row';
import request from '../request';
import Nav from './Nav';
import Banner from './Banner';
function MyList(props) {
    return (<>
        <Nav />
        <div style={{marginTop: '8vh'}}>
        <h1 style={{color:'white'}}>
          Top Rated
      </h1>
      <Banner fetchurl= {request.fetchTopRated}/>
      <Row fetchUrl={request.fetchTopRated} isLargeRow/>
  </div>
  </>
    );
}

export default MyList;