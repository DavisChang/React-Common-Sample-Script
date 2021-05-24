import React, { useRef, useState, useEffect } from "react"

export default function Outside() {
  const [ready, setReady] = useState(false)
  const refIframe = useRef(null);

  useEffect(() => {
    const iFrameElement = refIframe && refIframe.current
    if(iFrameElement && ready) {
      console.log('2. post message init to iframe form inside ')
      iFrameElement.contentWindow.postMessage(JSON.stringify({msg: 'init'}))
    }
  }, [refIframe, ready])

  const onMessageReceivedFromIframe = React.useCallback(
    event => {
      // if (event.origin !== "http://localhost")
      //   return;
      if (event && event.data && typeof event.data === 'string') {
        const data = JSON.parse(event.data)
        console.log('4. receive ready', data)
      }
    },
    []
  );

  useEffect(() => {
    window.addEventListener("message", onMessageReceivedFromIframe)
    return () =>
    window.removeEventListener("message", onMessageReceivedFromIframe)
  }, [onMessageReceivedFromIframe])

  const handleOnLoad = () => {
    console.log('1. onload inside url to iframe')
    setReady(true)
  }

  return (
    <div>
      Outside

      <div>
        <iframe
          src="http://localhost:3000/test/inside"
          onLoad={handleOnLoad}
          ref={refIframe}
        />
      </div>
    </div>
  )
}