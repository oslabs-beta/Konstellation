import React, { useEffect, useState } from 'react'

const TraceTester = () => {
    const [traceData, setTraceData] = useState<TraceData>({data: ""});

    useEffect( () => {
        getTraceData();
    });

    async function getTraceData(): Promise<void> {
        if(traceData.data) return;

        const httpHeaders = {'content-type': 'application/json'}
        const requestHeaders: HeadersInit = new Headers(httpHeaders);

        const text:string = "hi";

        return (
        fetch('/api', {
            method: 'POST',
            body: text,
            headers: requestHeaders }) 
        .then((response) => response.json())
        .then(data => {
            console.log("I ran a fetch");
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