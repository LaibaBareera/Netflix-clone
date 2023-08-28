import React from 'react';
import Row from './Row';
import request from '../request';
import Nav from './Nav';
function MyList(props) {
    return (<>
        <Nav />
        <div style={{marginTop: '8vh'}}>
        <h1 style={{color:'white'}}>
          My List
      </h1>
      <Row fetchUrl={request.fetchTopRated} isLargeRow/>
  </div>
  </>
    );
}

export default MyList;