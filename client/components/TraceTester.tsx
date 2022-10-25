import React, { useEffect, useState } from 'react'

const TraceTester = () => {
    const [traceData, setTraceData] = useState<TraceData>({data: ""});

    useEffect( () => {
        getTraceData();
    });

    async function getTraceData(): Promise<void> {
        console.log("test");
        if(traceData.data) return;

        const httpHeaders = {'ngrok-skip-browser-warning': 'true', 
        'path': 'https://d5b6-136-52-47-115.ngrok.io',
        'Access-Control-Allow-Origin': 'https://andrewdunne.com',
        'X-Trigger': 'CORS'}
        const requestHeaders: HeadersInit = new Headers(httpHeaders);

        return (
        fetch('https://829e-136-52-47-115.ngrok.io/', {headers: requestHeaders})
        .then((response) => response.json())
        .then(data => {
            console.log("hello");
            console.log(data);
            setTraceData(data)
        })
        .catch((err) => {"Unable to fetch Trace Data: " + err })
        );
    }

  return (
    <>
        <h1>Welcome to Konstellation TraceTester!</h1>
        <div>{Object.values(traceData as object)}</div>
    </>
  )
}

type TraceData = {
    data: string | void,
}

export default TraceTester