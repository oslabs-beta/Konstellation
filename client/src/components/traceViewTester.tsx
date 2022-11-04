import React, { useEffect, useState } from 'react'

const TraceTester = () => {
    const [traceData, setTraceData] = useState<TraceData>({data: ""});

    useEffect( () => {
        getTraceData();
    });

    async function getTraceData(): Promise<void> {
        console.log("Weback conquered");
        if(traceData.data) return;

        const httpHeaders = {'ngrok-skip-browser-warning': 'true'}
        const requestHeaders: HeadersInit = new Headers(httpHeaders);

        return (
        fetch('https://e2de-136-52-47-115.ngrok.io') 
        .then((response) => response.json())
        .then(data => {
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