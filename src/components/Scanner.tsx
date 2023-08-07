import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { TicketDetail } from ".";

const Scanner = () => {
  const [scanResult, setScanResult] = useState<string>("");

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
      },
      undefined
    );

    scanner.render(
      (result) => {
        scanner.clear();
        setScanResult(result);
      },
      () => {}
    );
  }, []);

  return (
    <div>
      {scanResult ? <TicketDetail data={scanResult} /> : <div id="reader"></div>}
    </div>
  );
};

export default Scanner;
