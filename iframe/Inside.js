import React, { useState, useEffect } from "react";

export default function Inside() {
  const [msg, setMsg] = useState('empty')
  const onMessageReceivedFromIframe = React.useCallback(
    event => {
      // if (event.origin !== "http://localhost")
      //   return;

      if (event && event.data && typeof event.data === 'string') {
        const data = JSON.parse(event.data)
        if (data.msg === 'init') {
          console.log('3. receive init from outside', data)
          setMsg(data.msg)
          console.log('4. send back ready from inside ')
          event.source.postMessage(JSON.stringify({
            msg: 'ready'
          }));
        }
      }
    },
    []
  );

  useEffect(() => {
    window.addEventListener("message", onMessageReceivedFromIframe)
    return () =>
      window.removeEventListener("message", onMessageReceivedFromIframe)
  }, [onMessageReceivedFromIframe])

  return (
    <div>
      <p>
        Inside
      </p>
      <p>
        MSG: {msg}
      </p>
    </div>
  )
}
